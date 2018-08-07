angular
		.module("prostudyApp")
		.controller(
				"gfBookStockviewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF,
						tableTestDataFactory, $state, $timeout, appEndpointSF,
						$stateParams) {

					$scope.courierTypelist = [ "Book", "Certificate",
							"Error Certificate", "Error books",
							"Prize Certificate" ];
					$scope.logisticsList = [ "By Post", "By Hand", "ST Postal",
							"Tej Courier" ];
					$scope.registrationIDList = [ "MH100001", "MH100002",
							"MH100003", "MH100004", "KA100001", "KA100002" ];

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
										});
					}

					$scope.getPartnerByInstitute = function() {

						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						PartnerSchoolService.getPartnerByInstitute(
								$scope.curUser.instituteID).then(function(pSchoolList) {
							$scope.pSchoolList = pSchoolList;

						});
					}
					
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							if ($scope.selectedGFCourierID != "") {
								$scope.getGFCourierById();
							}
							$scope.getPartnerByInstitute();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});
