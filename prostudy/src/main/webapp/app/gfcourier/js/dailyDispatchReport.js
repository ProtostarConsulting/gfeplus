angular
		.module("prostudyApp")
		.controller(
				"courierDailyDispatchReportCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $mdDialog, $mdMedia, $state,
						appEndpointSF) {
					console.log("Inside courierDailyDispatchReportCtr");

					$scope.dateChanged = true;
					$scope.courierDispatchDate = null;
					
					$scope.couriertFilteredList = [];

					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

					$scope.printDiv = function(bookDetailDiv) {

						/*
						 * document.getElementById('hidetr').style.display =
						 * 'block';
						 */
						window.frames["print_frame"].document.body.innerHTML = printDivCSS
								+ document.getElementById(bookDetailDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						/*
						 * document.getElementById('hidetr').style.display =
						 * 'none';
						 */
						window.frames["print_frame"].window.print();

					}

					$scope.getGFCourierByInstitute = function(refresh) {
						$scope.loading = true;
						var gfCourierService = appEndpointSF
								.getGFCourierService();
						gfCourierService.getGFCourierByInstitute(
								$scope.curUser.instituteID).then(
								function(gfCouriertList) {
									$scope.gfCouriertList = gfCouriertList;
									$scope.loading = false;
								});
					}

					$scope.getCuriertFilteredList = function() {
						$scope.loading = true;
						$scope.couriertFilteredList = [];
						
						var gfCourierService = appEndpointSF
								.getGFCourierService();
						gfCourierService
								.getCourierByDispatchDate(
										$scope.courierDispatchDate.getTime())
								.then(
										function(gfCouriertList) {
											$scope.couriertFilteredList = gfCouriertList;
											$scope.loading = false;
											$scope.dateChanged = false;
										});

					}

					$scope.downloadCourierDispatchReport = function() {

						document.location.href = "DownloadCourierDispatchReport?courierDispatchReportByInstituteID="
								+ $scope.curUser.instituteID
								+ "&dispatchDate="
								+ $scope.courierDispatchDate.getTime();
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							//$scope.getGFCourierByInstitute();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.refresh = function() {
						$state.reload();
					}
				});