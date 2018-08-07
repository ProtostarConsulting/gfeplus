angular
		.module("prostudyApp")
		.controller(
				"scheduledQuestionNewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Question Saved!').position("top").hideDelay(
								3000));
					};
					$scope.sourceSate = $stateParams.sourceSate;
					$scope.selectedInstituteId = $stateParams.selectedInstituteId;
				
					$scope.flag = $stateParams.flag;
					
					
					if($scope.selectedInstituteId!=undefined)
						{$scope.curUser.instituteID= $scope.selectedInstituteId;}
					
					$scope.tempQuestion = {
						instituteID : $scope.curUser.instituteID,
						description : "",						
						category : "",
						option1 : "",
						option2 : "",
						option3 : "",
						option4 : "",
						correctAns : ""

					};			

					$scope.addQuestion = function() {
						
						$scope.tempQuestion.instituteID = $scope.curUser.instituteID;
						var ScheduledQuestionService = appEndpointSF.getScheduledQuestionService();
						ScheduledQuestionService.addQuestion($scope.tempQuestion)
								.then(
										function(addedQ) {

											$scope.showSavedToast();
											$scope.questionForm.$setPristine();
											$scope.questionForm.$setValidity();
											$scope.questionForm.$setUntouched();
											$scope.tempQuestion = {};											

											if ($scope.sourceSate == null) {
												
											} else if ($scope.sourceSate) {

											$state.go($scope.sourceSate,
																{
																	addedQ : addedQ,
																	selectedExamId : $stateParams.selectedExamId,
																	addFlag : true
																});
											}

										});

					}
				

					$scope.cancelButton = function() {
						$state.go("scheduledExam", {});
					}

					$scope.toggleSelection = function toggleSelection(id,
							optionId) {
						var idx = $scope.selection.indexOf(id, optionId);
						$scope.userAnsList.push({
							qID : id,
							userOption : optionId
						});
						if (idx > -1) {
							$scope.selection.splice(idx, 1);
						} else {
							$scope.selection.push(optionId);
						}

					};

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});
