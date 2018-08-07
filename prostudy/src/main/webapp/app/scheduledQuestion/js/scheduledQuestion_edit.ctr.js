angular
		.module("prostudyApp")
		.controller(
				"scheduledQuestionEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Question Updated!').position("top").hideDelay(
								3000));
					};
					$scope.sourceSate = $stateParams.sourceSate;
					$log.debug("$scope.sourceSate"+$scope.sourceSate);
					
					$scope.question = $stateParams.selectedQuestion;
					$scope.selectedQuestionId = $stateParams.selectedQuestionId;

					$scope.getQuestionByID = function() {
						var ScheduledQuestionService = appEndpointSF
								.getScheduledQuestionService();
						ScheduledQuestionService.getQuestionByID(
								$scope.selectedQuestionId).then(
								function(Question) {
									$scope.question = Question;
								});
					}

					$scope.updateQuestion = function() {

						var ScheduledQuestionService = appEndpointSF.getScheduledQuestionService();
						ScheduledQuestionService.updateQuestion($scope.question).then(
										function(updatedQ) {
											$scope.showSavedToast();
											if ($scope.sourceSate == null) {
												$state.go("scheduledExam.questionList",{});
											} else if ($scope.sourceSate) {
												$state.go($scope.sourceSate,
																{
																	updatedQ : updatedQ,
																	selectedExamId : $stateParams.selectedExamId,
																	selectedQuestionId : $scope.selectedQuestionId,
																	editFlag : true
																});
											}
										});

					};
					$scope.cancelButton = function() {
						$state.go("scheduledExam.questionList", {});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							if (!$stateParams.selectedQuestion) {
								$scope.getQuestionByID();
							}

						} else {
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});// end of scheduledQuestionEditCtr
