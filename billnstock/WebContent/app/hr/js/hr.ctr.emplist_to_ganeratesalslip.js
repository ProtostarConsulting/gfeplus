angular
		.module("stockApp")
		.controller(
				"hrCtr.emplist_to_ganeratesalslip",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,$state,
						appEndpointSF) {

					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};

					$scope.printempidsalslip = $stateParams.printempidsalslip;
					$scope.ganeratedsalslip = $stateParams.ganeratedsalslip;
								
					$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
					$scope.emp = {
						empid : "",
						empName : "",
						email : "",
						compemail : "",
						empAddress : "",
						designation : ""
					};

					$scope.salstruct = {
						empAccount : "",
						grosssal : "",
						monthly : "",
						byearly : "",
						bmonthly : "",
						hrayearly : "",
						hramonthly : "",
						ccayearly : "",
						ccamonthly : "",
						ec12Byearly : "",
						convyearly : "",
						convmonthly : "",
						sayearly : "",
						grandtotal : "",
						samonthly : "",
						bgrandtotal : "",
						ptaxyearly : "",
						pf1 : 0,
						pf2 : 0,
						ptaxgrandtotal : "",
						netsalgrandtotalmonthly : "",
						netsalgrandtotal : "",
						addprobonus : "",
						ctc : "",
						mctc : "",
						ldother1dis : "",
						ldother2dis : "",
						ldother1amt : "",
						ldother2amt : ""
					};

					$scope.salslip = {
						ganeratedcode : 100,
						salslip_id : "",
						salarystruct : "",
						month : "-",
						generateddate : "-",
						bank_name : "-",
						acno : "-",
						year : ""

					};

					var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May",
							"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

					var date = new Date();
								
					$scope.getAllempsSalStruct = function() {
						$log.debug("Inside Ctr $scope.getAllempsSalStruct");
						var hrService = appEndpointSF.gethrService();

						hrService.getAllempsSalStruct($scope.curUser.businessAccount.id).then(
								function(empSalstructList) {
									$log.debug("Inside Ctr getAllemps");
									$scope.empSalStruct = empSalstructList.items;

								});
					}
					$scope.empSalStruct = [];
					$scope.getAllempsSalStruct();
					

					$scope.getlastmonth = function() {
						var date = new Date();
						for (var i = 0; i < 3; i++) {
							$scope.months.push(monthNames[date.getMonth()]
									+ ' ' + date.getFullYear());
							// Subtract a month each time
							date.setMonth(date.getMonth() - 1);
						}
					}
				
					$scope.months = [];
					$scope.getlastmonth();

					$scope.ganeratesalslip = function() {
						//$scope.printganeratesalslip();
						var hrService = appEndpointSF.gethrService();
						for (i = 0; i < $scope.selected.length; i++) {

							var empid = $scope.selected[i].id;
							
							hrService.getstructByID(empid)
									.then(function(structlist) {
												$scope.selectedSalSlip = structlist.result;
												$scope.salslip.salarystruct = $scope.selectedSalSlip;
												$scope.salslip.salslip_id = Number($scope.salslip.salslip_id) + 1;
												$scope.salslip.month = $scope.selectmonth;
												hrService
														.addgsalslip($scope.salslip)
														.then(
																function(gsalslip) {
																	$scope.ganeratedsalslip.push(gsalslip.result);
																	$scope.showSimpleToast("salslip ganareted");
																	$log.debug("********%%%%%***********" + angular
																			.toJson($scope.ganeratedsalslip));
																});
											});

						}
						
			
							
						       $state.go('hr.printgeneratesalslip',{sourceSate : "hr.generatesalslip",ganeratedsalslip : $scope.ganeratedsalslip});
						  
					}

					$scope.selectedSalSlip = [];
					$scope.ganeratedsalslip = [];

					$scope.printganeratesalslip = function() { 
						var date = new Date();
						var hrService = appEndpointSF.gethrService();
						hrService
								.countOfRecordsiInganeratedslip()
								.then(
										function(printSalSelectedSlipList) {
											$scope.printGSalStruct = printSalSelectedSlipList.items;
											$scope.salslip.salslip_id=$scope.printGSalStruct.length+1;
											//$scope.salslip.month = monthNames[date.getMonth()]+ ' ' + date.getFullYear();
											$scope.salslip.year = "Year"+ ' ' + date.getFullYear();
										});
					}
					$scope.printGSalStruct = [];
					$scope.gcode = [];
					$scope.printganeratesalslip();

					$scope.displyOnlySelected = function(abc) {

						var date = new Date();
						var hrService = appEndpointSF.gethrService();
						$scope.currmonth = "" + monthNames[date.getMonth()]
								+ ' ' + date.getFullYear();

						$log.debug("*******************" + $scope.currmonth);
						if (typeof abc != 'undefined') {
							$scope.currmonth = abc;
							$log.debug("*******************" + abc);
						}

						hrService
								.displyOnlySelected($scope.currmonth,$scope.curUser.businessAccount.id)
								.then(
										function(getDisplyOnlySelected) {
											$scope.displyselected = getDisplyOnlySelected.items;

											$log
													.debug("$scope.displyselected=========="
															+ angular
																	.toJson($scope.displyselected));
										});
					}
					$scope.displyselected = [];

					$scope.displyOnlySelected();

					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

					$scope.printSalSlipDiv = function(salSlipDiv) {
						document.getElementById('hidetr').style.display = 'block';
						window.frames["print_frame"].document.body.innerHTML = printDivCSS
								+ document.getElementById(salSlipDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						document.getElementById('hidetr').style.display = 'none';
						window.frames["print_frame"].window.print();

					}

					$scope.printslip = function() {
						var hrService = appEndpointSF.gethrService();
						if (typeof $scope.printempidsalslip != "undefined") {
						hrService
								.printslip($scope.printempidsalslip)
								.then(
										function(getslip) {
											$scope.printslectedslip.push(getslip.result);
											$log
													.debug("$scope.printslectedslip=========="
															+ angular.toJson($scope.printslectedslip));
										});
					}
					}
					$scope.printslectedslip = [];
					$scope.printslip();

					$scope.toggleRight = buildToggler('right');

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
				});
