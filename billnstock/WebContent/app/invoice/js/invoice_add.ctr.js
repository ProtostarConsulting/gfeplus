app = angular.module("stockApp");
app
		.controller(
				"invoiceAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
					
					$scope.invoiceObj = {
						salesOrderId : '',
						customer : '',
						invoiceDate : $filter("date")(Date.now(), 'dd-MM-yyyy'),
						invoiceDueDate :'',
						invoiceLineItemList : [],
						subTotal : '',
						taxCodeName : '',
						taxPercenatge : '',
						taxTotal : 0,
						finalTotal : '',
						note:''	,
						account:"",
						loggedInUser:""
					};

					$scope.addInvoice = function() {
						$log.debug("No1");
						var InvoiceService = appEndpointSF.getInvoiceService();
						$scope.invoiceObj.loggedInUser =$scope.curUser;

						InvoiceService.addInvoice($scope.invoiceObj).then(
								function(msgBean) {
									$log.debug("No6");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast();

								});
						$log.debug("No4");

						$scope.invoiceObj = {};
					}

					$scope.addItem = function() {
						var item = {
							srNo : $scope.invoiceObj.invoiceLineItemList.length + 1,
							itemName : "",
							qty : 1,
							price : "",
							subTotal : ""
						};

						$scope.invoiceObj.invoiceLineItemList.push(item);
					};

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.invoiceObj.invoiceLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.subTotal = stockItem.subTotal;

						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.invoiceObj.subTotal = 0;

						for (var i = 0; i < $scope.invoiceObj.invoiceLineItemList.length; i++) {
							var line = $scope.invoiceObj.invoiceLineItemList[i];
							$scope.invoiceObj.subTotal += (line.qty * line.price);

							$log.debug("subTotal :"
									+ $scope.invoiceObj.subTotal);
						}
						$log.debug("$scope.invoiceObj 1 :"
								+ $scope.invoiceObj.subTotal);
						return $scope.invoiceObj.subTotal;
					}

					$scope.calfinalTotal = function() {
						$log.debug("##Came to calSubTotal...");

						$scope.invoiceObj.finalTotal = $scope.invoiceObj.subTotal
								+ $scope.invoiceObj.taxTotal;
					}

					$scope.lineItemTaxChange = function(index, selectedTaxItem) {
						$log.debug("##Came to lineItemTaxChange...");

						$scope.invoiceObj.taxTotal = ($scope.invoiceObj.selectedTaxItem.taxPercenatge / 100)
								* ($scope.invoiceObj.subTotal)

						$scope.calfinalTotal();
					};

					$scope.CustomerddlChange = function(index,
							customer) {
						$log.debug("##Came to CustomerddlChange...");
					//	$scope.SelectedCustomerAddress = $scope.invoiceObj.customerName.customerAddress;
					//	$log.debug("##SelectedCustomerAddress##"+SelectedCustomerAddress);
					//	lineSelectedItem.price = stockItem.price;

					};

					$scope.SOddlChange = function(index, selectedSOId) {
						$log.debug("##Came to SOddlChange...");

					};

					$scope.AccountNameddlChange = function(index, selectedAccount) {
						$log.debug("##Came to AcountNameddlChange...");

					};


					$scope.removeItem = function(index) {
						$scope.invoiceObj.invoiceLineItemList.splice(index, 1);
						$scope.calSubTotal();
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

					$scope.getAllCustomersByCurrUser = function() {
						$log.debug("Inside Ctr $scope.getAllCustomers");
						var customerService = appEndpointSF.getCustomerService();

						customerService.getAllCustomersByCurrUser($scope.curUser.businessAccount.id).then(
								function(custList) {
									$log.debug("Inside Ctr getAllCustomers");
									$scope.customersforinvoice = custList;
									$log.debug("Inside Ctr $scope.customers:"
											+ angular.toJson($scope.customersforinvoice));
								});
					}

					$scope.customersforinvoice = [];
					$scope.getAllCustomersByCurrUser();

					$scope.getAllStock = function() {
						$log.debug("Inside Ctr $scope.getAllStock");
						var stockService = appEndpointSF.getStockService();

						stockService.getAllStock($scope.curUser.businessAccount.id).then(function(stockList) {
							$log.debug("Inside Ctr getAllStock");
							$scope.stockforinvoice = stockList;
						});
					}

					// $scope.stockData = [];
					$scope.getAllStock();

					$scope.getTaxesByVisibility = function() {
						$log.debug("Inside Ctr $scope.getAllTaxes");
						var taxService = appEndpointSF.getTaxService();

						taxService.getTaxesByVisibility($scope.curUser.businessAccount.id).then(function(taxList) {
							$log.debug("Inside Ctr getAllTaxes");
							$scope.taxforinvoice = taxList;
						});
					}
					// $scope.taxData = [];
					$scope.getTaxesByVisibility();

					$scope.getAllSalesOrder = function() {
						$log.debug("Inside Ctr $scope.getAllSalesOrder");
						var salesService = appEndpointSF.getSalesOrderService();

						salesService
								.getAllSalesOrder($scope.curUser.businessAccount.id)
								.then(
										function(salesOrderList) {
											$log
													.debug("Inside Ctr getAllSalesOrder");
											$scope.SOforinvoice = salesOrderList;
											$log
													.debug("@@@@@@@getAllSalesOrder"
															+ angular
																	.toJson($scope.SOforinvoice));

										});
					}

					// $scope.SOforinvoice = [];
					$scope.getAllSalesOrder();

					
					$scope.getAllAccountsByBusiness = function() {
						var accountService = appEndpointSF.getAccountService();

						accountService.getAllAccountsByBusiness($scope.curUser.businessAccount.id).then(
								function(accountList) {
									$log.debug("Inside Ctr getAllAccountsByBusiness");
									$scope.accountforinvoice = accountList;							
									$log.debug("Inside Ctr $scope.accounts:"
											+ angular.toJson($scope.account));
								});
					}
					$scope.accountforinvoice = [];
					$scope.getAllAccountsByBusiness();
					
					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')
					$scope.printDiv = function(divId) {
						// window.frames["print_frame"].document.body.innerHTML
						// = printDivCSS
						// + document.getElementById(divId).innerHTML;
						window.frames["print_frame"].document.body.innerHTML = document
								.getElementById(divId).innerHTML;
						window.frames["print_frame"].window.focus();
						window.frames["print_frame"].window.print();
					}
				});
