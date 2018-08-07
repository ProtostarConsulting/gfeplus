angular
		.module("prostudyApp")
		.controller(
				"userQuesAnsViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Result Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.selectedResultId = Number($stateParams.selectedResultId);
					//$scope.selectedExamId = Number($stateParams.selectedExamId);

					$scope.curuser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.totalLength;
					$scope.answeredLength = 0;

					$scope.examResultObj = null;					
					
				
					$scope.viewSelectedExamResult = function() {
						$scope.loading = true;
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						
						PracticeExamService
								.getPracticeExamResultbyID(
										$scope.selectedResultId)
								.then(
										function(practiceExamResult) {
											$scope.examResultObj = practiceExamResult;											
											$scope.totalLength = $scope.examResultObj.test.length;
											$scope.answeredLength = 0;
											
											for (var i = 0; i < $scope.examResultObj.test.length; i++) {
												$scope.examResultObj.test[i].description = $sce
												.trustAsHtml($scope.examResultObj.test[i].description);
												if($scope.examResultObj.userAns.length > i && $scope.examResultObj.userAns[i].userOption)
													$scope.answeredLength++;
											}
											
											$scope.loading = false;

										});
					}

					$scope.viewSelectedExamResult();
					//appEndpointSF.getLocalUserService().saveLoggedInUser(null);
				});
