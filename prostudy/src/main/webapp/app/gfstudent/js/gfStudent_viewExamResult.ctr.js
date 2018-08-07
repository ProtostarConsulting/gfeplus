angular
		.module("prostudyApp")
		.controller(
				"gfStudentViewExamResult",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {

					$scope.selectedGFStudID = $stateParams.selectedGFStudID;
					
					$scope.curuser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.examResults = [];
					
					$scope.getStudResultByUId = function() {
						$scope.loading = true;
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService
								.getResultByUId($scope.selectedGFStudID)
								.then(
										function(studResult) {
											$scope.examResults = studResult;
											$scope.loading = false;
										});
					}

					
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getStudResultByUId();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});