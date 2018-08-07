angular
		.module("prostudyApp")
		.controller(
				"editScheduledExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {
					$scope.checked = "false";
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Updated!').position("top")
								.hideDelay(3000));
					};

				
					$scope.durations=["30","60","90","120","150","180","210"];
					$scope.flag = true;

					$scope.selectedExamId = $stateParams.selectedExamId;

					$scope.showselectedExam = function() {
						var ScheduledExamService = appEndpointSF.getScheduledExamService();

						ScheduledExamService.getScheduledExamById($scope.selectedExamId).then(
										function(ScheduledTest) {
											$scope.Test = ScheduledTest;

											$scope.Test.startdatentime=new Date($scope.Test.startdatentime);
											$scope.Test.enddatentime=new Date($scope.Test.enddatentime);
											
											if ($stateParams.addFlag) {
												if ($stateParams.addedQ !== undefined) {

													if (typeof $scope.Test.listOfQuestion === 'undefined')
														$scope.Test.listOfQuestion = [];

													$scope.Test.listOfQuestion.push($stateParams.addedQ);
													$scope.updateScheduledExam();
												}
											}

											if ($stateParams.editFlag) {

												if ($stateParams.updatedQ !== undefined) {

													for (var i = 0; i < $scope.Test.listOfQuestion.length; i++) {

														if ($stateParams.selectedQuestionId == $scope.Test.listOfQuestion[i].id) {
															$scope.Test.listOfQuestion[i] = $stateParams.updatedQ;
															$scope.updateScheduledExam();
															break;
														}

													}
												}
											}

										});

					}

					$scope.questions = [];

					$scope.getQuestions = function() {

						var ScheduledQuestionService = appEndpointSF
								.getScheduledQuestionService();
						ScheduledQuestionService.getQuestions().then(
								function(questionList) {
									$scope.questions = questionList;
								});
					}

					

					$scope.Test = [];

					$scope.selectedQ = [];

					$scope.updateScheduledExam = function() {
						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						
						ScheduledExamService.updateScheduledExam($scope.Test)
								.then(function(msgBean) {
									
									$scope.showSavedToast();
								});
						if ($stateParams.editFlag || $stateParams.addFlag) {
						} else {
							$state.go("scheduledExam.list");
						}
					}

					
					$scope.addQuestion = function() {
						
						
						$state.go('scheduledExam.addQuestion', {
							sourceSate : "scheduledExam.edit",
							selectedExamId : $stateParams.selectedExamId,
							selectedInstituteId:$scope.Test.instituteID,
							flag : true
						});

					}
					
					$scope.editQuestion = function() {

						$state.go('scheduledExam.questionEdit', {
							sourceSate : "scheduledExam.edit",
							selectedExamId : $stateParams.selectedExamId,
							selectedQuestion : $scope.selectedQ[0],
							selectedQuestionId : $scope.selectedQ[0].id
						});
					};

					$scope.remove = function($index) {

						var actualIndex = -1;

						for (var i = 0; i < $scope.Test.listOfQuestion.length; i++) {
							if ($scope.selectedQ[0].id == $scope.Test.listOfQuestion[i].id) {
								actualIndex = i;
								break;
							}
						}
						if (actualIndex > -1) {
							$scope.Test.listOfQuestion.splice(actualIndex, 1);
							actualIndex = -1;
							$scope.selectedQ = [];
						}
					};

					$scope.cancel = function() {
						$state.go('^');
					};

			
					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};

					$scope.onpagechange = function(page, limit) {
						var deferred = $q.defer();

						$timeout(function() {
							deferred.resolve();
						}, 2000);

						return deferred.promise;
					};

					$scope.onorderchange = function(order) {
						var deferred = $q.defer();

						$timeout(function() {
							deferred.resolve();
						}, 2000);

						return deferred.promise;
					};
					$scope.waitForServiceLoad = function() {
						  if (appEndpointSF.is_service_ready) {	
							  $scope.getQuestions();
							  $scope.showselectedExam();
								  						  } 
						  else {
						   $log.debug("Services Not Loaded, watiting...");
						   $timeout($scope.waitForServiceLoad, 1000);
						  }
						 }
						  
						 $scope.waitForServiceLoad();	

				});// end of editScheduledExamCtr
