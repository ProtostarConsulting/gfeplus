app = angular.module("stockApp");
app
		.controller(
				"salesOrderAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, $q, $mdMedia, $mdDialog,
						objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.salesOrder = {
						customer : {},
						customerRefId : '',
						quotationDate : '',
						salesOrderDate : new Date(),
						to : '',
						shipTo : '',
						salesPerson : '',
						shippedVia : '',
						shippingTerms : '',
						deliveryDate : '',
						paymentTerms : '',
						dueDate : '',
						sOLineItemList : [],
						subTotal : '',
						taxCodeName : '',
						taxPercenatge : '',
						taxTotal : 0,
						finalTotal : 0,
						createdDate : new Date(),
						modifiedDate : new Date(),
						modifiedBy : '',
						business : ""
					};

					$scope.addSalesOrder = function() {
						if ($scope.salesOrder.sOLineItemList.length == 0
								|| $scope.salesOrder.sOLineItemList.itemName == "") {
							console.log("Please select atleast one item");
							$scope.errorMsg = "Please select atleast one item.";
						} else {
							var salesOrderService = appEndpointSF
									.getSalesOrderService();
							$scope.salesOrder.business = $scope.curUser.business;

							salesOrderService.addSalesOrder($scope.salesOrder)
									.then(function(msgBean) {
										$scope.showSimpleToast(msgBean.msg);
									});

							$scope.salesOrder = {};
						}
					}
					$scope.addItem = function() {
						var item = {
							srNo : $scope.salesOrder.sOLineItemList.length + 1,
							itemName : "",
							qty : 1,
							price : "",
							subTotal : ""
						};

						$scope.salesOrder.sOLineItemList.push(item);
					};

					$scope.removeItem = function(index) {
						$scope.salesOrder.sOLineItemList.splice(index, 1);
						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.salesOrder.subTotal = 0;

						for (var i = 0; i < $scope.salesOrder.sOLineItemList.length; i++) {
							var line = $scope.salesOrder.sOLineItemList[i];
							$scope.salesOrder.subTotal += (line.qty * line.price);
						}

						$scope.salesOrder.subTotal = parseFloat(
								Math.round(($scope.salesOrder.subTotal) * 100) / 100)
								.toFixed(2);

						return $scope.salesOrder.subTotal;
					}

					$scope.calfinalTotal = function() {
						$log.debug("##Came to calfinalTotal...");

						$scope.salesOrder.finalTotal = parseFloat($scope.salesOrder.subTotal)
								+ parseFloat($scope.salesOrder.taxTotal);

						$scope.salesOrder.finalTotal = parseFloat(
								($scope.salesOrder.finalTotal)).toFixed(2);

					}

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.salesOrder.sOLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.subTotal = stockItem.subTotal;

						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.CustomerddlChange = function(index, customer) {
						$log.debug("##Came to CustomerddlChange...");
					};

					$scope.lineItemTaxChange = function(index, selectedTaxItem) {
						$log.debug("##Came to lineItemTaxChange...");

						$scope.salesOrder.taxCodeName = $scope.salesOrder.selectedTaxItem.taxCodeName;
						$scope.salesOrder.taxPercenatge = $scope.salesOrder.selectedTaxItem.taxPercenatge;

						$scope.salesOrder.taxTotal = ($scope.salesOrder.selectedTaxItem.taxPercenatge / 100)
								* ($scope.salesOrder.subTotal)

						$scope.salesOrder.taxTotal = parseFloat(
								Math.round($scope.salesOrder.taxTotal * 100) / 100)
								.toFixed(2);
						$scope.calfinalTotal();
					};

					/* Setup menu */
					$scope.toggleRight = buildToggler('right');
					/**
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
					 */
					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};

					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Customer Data Saved!').position("top")
								.hideDelay(3000));
					}

					$scope.getAllStock = function() {
						$log.debug("Inside Ctr $scope.getAllStock");
						var stockService = appEndpointSF.getStockService();

						stockService
								.getAllStock($scope.curUser.business.id)
								.then(
										function(stockList) {
											$log
													.debug("Inside Ctr getAllStock");
											$scope.stockforPO = stockList;
											$log
													.debug("@@@ $scope.stockforPO==="
															+ $scope.stockforPO);
										});
					}

					$scope.getAllTaxes = function() {
						$log.debug("Inside Ctr $scope.getAllTaxes");
						var taxService = appEndpointSF.getTaxService();

						taxService.getTaxesByVisibility(
								$scope.curUser.business.id).then(
								function(taxList) {
									$log.debug("Inside Ctr getAllTaxes");
									$scope.taxforPO = taxList;
									$log.debug("@@@ $scope.taxforPO==="
											+ $scope.taxforPO);
								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							loadAllCustomers();
							$scope.getAllTaxes();
							$scope.getAllStock();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.taxData = [];
					$scope.waitForServiceLoad();

					// list of `state` value/display objects
					$scope.customersforinvoice = [];

					$scope.salesOrder.customer = null;
					$scope.searchTextInput = null;

					$scope.querySearch = function(query) {
						var results = query ? $scope.customersforinvoice
								.filter(createFilterFor(query))
								: $scope.customersforinvoice;
						var deferred = $q.defer();
						$timeout(function() {
							deferred.resolve(results);
						}, Math.random() * 1000, false);
						return deferred.promise;
					}

					function loadAllCustomers() {
						var customerService = appEndpointSF
								.getCustomerService();
						customerService
								.getAllCustomersByBusiness(
										$scope.curUser.business.id)
								.then(
										function(custList) {
											$scope.customersforinvoice = custList.items;
										});
					}

					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(cus) {
							return (angular.lowercase(cus.firstName).indexOf(
									lowercaseQuery) === 0);
						};
					}

					$scope.addCustomer = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogController,
									templateUrl : '/app/crm/customer_add.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen,
									locals : {
										curBusi : $scope.curUser.business,
										customer : $scope.customer
									}
								})
								.then(
										function(answer) {
											$scope.status = 'You said the information was "'
													+ answer + '".';
										},
										function() {
											$scope.status = 'You cancelled the dialog.';
										});
						
					};

					function DialogController($scope, $mdDialog, curBusi,
							customer) {

						$scope.addCustomer = function() {
							 $scope.customer.business = curBusi;
							var customerService = appEndpointSF.getCustomerService();

							customerService.addCustomer($scope.customer).then(
									function(msgBean) {

									});
						}
					}
				});
