angular
		.module("prostudyApp")
		.controller(
				"gfCourierviewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory,$http, appEndpointSF,
						tableTestDataFactory, $state, $timeout, appEndpointSF,
						$stateParams) {
					$scope.loading = true;
					$scope.selectedGFCourierID = $stateParams.selectedGFCourierID;
					$scope.getGFCourierById = function() {

						var gfCourierService = appEndpointSF
								.getGFCourierService();
						gfCourierService
								.getGFCourierById($scope.selectedGFCourierID)
								.then(
										function(tempCourier) {

											$scope.tempCourier = tempCourier;
											$scope.tempCourier.courierDispatchDate = new Date(
													$scope.tempCourier.courierDispatchDate);
											$scope.tempCourier.schoolName = $scope.tempCourier.schoolName.schoolName;
										//	$scope.TotalFeesInWord = NumToWord($scope.tempCourier.totalFees);
											$scope.loading = false;
										});
					}

					$scope.getGFBookStockByInstituteId = function() {
						var gfBookStockService = appEndpointSF
								.getGFBookStockService();
						gfBookStockService.getGFBookByInstituteId(
								$scope.curUser.instituteID).then(
								function(tempBooks) {
									$scope.bookStocks = tempBooks;
									$scope.loading = false;
									});
					}
					$scope.bookStocks = [];
				
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							if ($scope.selectedGFCourierID != "") {
								$scope.getGFCourierById();
							}							
							$scope.getGFBookStockByInstituteId();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					
					
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
