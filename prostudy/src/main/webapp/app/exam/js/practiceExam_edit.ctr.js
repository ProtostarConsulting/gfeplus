angular
		.module("prostudyApp")
		.controller(
				"editPracticeExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams, boardList) {
					$scope.checked = "false";
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Practice Exam Updated!').position("top")
								.hideDelay(3000));
					};

					$scope.boards = [ {} ];
					$scope.boards = boardList;

					$scope.standards = [];
					$scope.divisions = [];
					$scope.subjects = [];

					$scope.selectedStdID;
					$scope.selectedDivID;
					$scope.selectedSubID;

					$scope.stdList;
					$scope.divList;
					$scope.subList;
					
					$scope.flag = true;

					$scope.selectedExamId = $stateParams.selectedExamId;

					$scope.showselectedExam = function() {
						var PracticeExamService = appEndpointSF.getPracticeExamService();

						PracticeExamService.getPracticeExamById($scope.selectedExamId).then(
										function(practiceTest) {
											$scope.Test = practiceTest;

											if ($stateParams.addFlag) {
												if ($stateParams.addedQ !== undefined) {

													if (typeof $scope.Test.questions === 'undefined')
														$scope.Test.questions = [];

													$scope.Test.questions.push($stateParams.addedQ);
													$scope.updateExam();
												}
											}

											if ($stateParams.editFlag) {

												if ($stateParams.updatedQ !== undefined) {

													for (var i = 0; i < $scope.Test.questions.length; i++) {

														if ($stateParams.selectedQuestionId == $scope.Test.questions[i].id) {
															$scope.Test.questions[i] = $stateParams.updatedQ;
															$scope.updateExam();
															break;
														}

													}
												}
											}

										});

					}

					$scope.questions = [];

					$scope.getQuestion = function() {

						var QuestionService = appEndpointSF
								.getQuestionService();
						QuestionService.getQuestion().then(
								function(questionList) {
									$scope.questions = questionList;
								});
					}

					

					$scope.Test = [];

					$scope.selectedQ = [];

					$scope.updateExam = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService.updatePracticeExam($scope.Test)
								.then(function(msgBean) {
									$scope.showSavedToast();
								});
						if ($stateParams.editFlag || $stateParams.addFlag) {
						} else {
							$state.go("exam.listpracticeexam");
						}
					}

					
					$scope.addQuestion = function() {

						$state.go('exam.addnewquestion', {
							sourceSate : "exam.editpracticeexam",
							selectedExamId : $stateParams.selectedExamId,
							selectedStd : $scope.Test.standard,
							selectedDiv : $scope.Test.division,
							selectedSub : $scope.Test.subject,
							selectedBoard : $scope.Test.board,
							flag : true
						});

					}
					
					$scope.editQuestion = function() {

						$state.go('exam.editquestion', {
							sourceSate : "exam.editpracticeexam",
							selectedExamId : $stateParams.selectedExamId,
							selectedQuestion : $scope.selectedQ[0],
							selectedQuestionId : $scope.selectedQ[0].id
						});
					};

					$scope.remove = function($index) {

						var actualIndex = -1;

						for (var i = 0; i < $scope.Test.questions.length; i++) {
							if ($scope.selectedQ[0].id == $scope.Test.questions[i].id) {
								actualIndex = i;
								break;
							}
						}
						if (actualIndex > -1) {
							$scope.Test.questions.splice(actualIndex, 1);
							actualIndex = -1;
							$scope.selectedQ = [];
						}
					};

					$scope.cancel = function() {
						$state.go('^');
					};

					$scope.getStandardByInstitute = function() {

						var StudentService = appEndpointSF
								.getStudentService();
						StudentService
								.getStandardByInstitute(
										$scope.curUser.instituteID)
								.then(
										function(standardList) {
											$scope.stdList = standardList;
											for (var i = 0; i < $scope.stdList.length; i++) {
												if ($scope.stdList[i].name == $scope.Test.standard) {
													$scope.selectedStdID = $scope.stdList[i].id;
												}

											}
										});
					}

					

					$scope.getDivisionByStandard = function() {

						var StudentService = appEndpointSF
								.getStudentService();
						StudentService
								.getDivisionByStandard($scope.selectedStdID)
								.then(
										function(divisionList) {
											$scope.divList = divisionList;
											for (var i = 0; i < $scope.divList.length; i++) {
												if ($scope.divList[i].name == $scope.Test.division) {
													$scope.selectedDivID = $scope.divList[i].id;
												}
											}
										});
					}

					$scope.getSubjectByDivision = function() {

						var StudentService = appEndpointSF.getStudentService();
						StudentService
								.getSubjectByDivision($scope.selectedDivID)
								.then(
										function(subjectList) {

											$scope.subList = subjectList;

											for (var i = 0; i < $scope.subList.length; i++) {

												if ($scope.subList[i].name == $scope.Test.subject) {
													$scope.selectedSubID = $scope.divList[i].id;
												}
											}
										});
					}

					$scope.query = {
						order : 'description',
						limit : 80,
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
							  $scope.getQuestion();
							  $scope.showselectedExam();
							  //$scope.getStandardByInstitute(); 		  
						  } 
						  else {
						   $log.debug("Services Not Loaded, watiting...");
						   $timeout($scope.waitForServiceLoad, 1000);
						  }
						 }
						  
						 $scope.waitForServiceLoad();	

				});// end of editPracticeExamCtr
