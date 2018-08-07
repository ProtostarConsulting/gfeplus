angular
		.module("prostudyApp")
		.controller(
				"practiceExamTestCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams, $mdDialog, $mdMedia) {

					$log.debug("###Inside practiceExamTestCtr###");
					$scope.loading = true;
					var gfStudentService = appEndpointSF.getGFStudentService();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Result Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$scope.selectedExamId = $stateParams.selectedExamId;
					$scope.foundSchool = $stateParams.foundSchool;

					// Code for timer
					var date = new Date();

					$scope.Math = Math;

					$scope.counter = 60 * 60; // 60 minutes in seconds
					$scope.startTime = null;
					$scope.endTime = null;
					$scope.examResults;
					$scope.selectedID;

					$scope.currentQuestionIndex = 0;
					$scope.totalQuestions = 0;

					$scope.isDisabledPrevious = false;
					$scope.isDisabledNext = false;

					$scope.practiceTestObj = null;
					$scope.tempPracticeExamResult = {

						ID : "",
						examTitle : "",
						userId : $scope.curUser.id,
						email_id : $scope.curUser.email_id,
						firstName : $scope.curUser.firstName,
						lastName : $scope.curUser.lastName,
						startTime : "",
						endTime : "",
						score : 0,
						userAns : null,
						testID : "",
						test : null

					}

					var mytimeout = null;

					$scope.onTimeout = function() {
						if ($scope.counter === 0) {
							$scope.$broadcast('timer-stopped', 0);
							$timeout.cancel(mytimeout);
							$scope.checkAnswer();
							return;
						}
						$scope.counter--;

						mytimeout = $timeout($scope.onTimeout, 1000);
					};

					$scope.startTimer = function() {
						mytimeout = $timeout($scope.onTimeout, 1000);
						$scope.tempPracticeExamResult.startTime = $filter(
								'date')(new Date(), 'hh:mm:ss a');

					};

					$scope.stopTimer = function() {
						var date = new Date();
						$scope.$broadcast('timer-stopped', $scope.counter);
						$timeout.cancel(mytimeout);
						$scope.tempPracticeExamResult.endTime = $filter('date')
								(new Date(), 'hh:mm:ss a');
					};

					$scope.$on('timer-stopped', function(event, remaining) {
						if (remaining === 0) {
							console.log('your time ran out!');

						}
					});// End of timer

					$scope.userAnsList = []; // {qID, userOption}

					$scope.toggleSelection = function toggleSelection(
							selectedOption) {
						$scope.userAnsList[$scope.currentQuestionIndex].userOption = selectedOption;
						$scope
								.safeApply($scope.userAnsList[$scope.currentQuestionIndex]);
					};

					$scope.checkAnswer = function() {
						for (var i = 0; i < $scope.userAnsList.length; i++) {
							if ($scope.userAnsList[i].userOption == $scope.practiceTestObj.questions[i].correctAns) {
								$scope.tempPracticeExamResult.score++;
							}
						}
						$scope.stopTimer();
						$scope.addPracticeExamResult();

					}

					$scope.getCorrectAnsByQID = function(qID) {

						for (var i = 0; i < $scope.practiceTestObj.questions.length; i++) {

							if ($scope.practiceTestObj.questions[i].id == qID) {
								return $scope.practiceTestObj.questions[i].correctAns;

							}
						}
						return -1;
					}

					$scope.selected = [];

					$scope.onNext = function() {
						$scope.currentQuestionIndex++;

						if ($scope.currentQuestionIndex == $scope.totalQuestions - 1) {
							$scope.isDisabledNext = true;
						} else {
							$scope.isDisabledNext = false;
						}
						$scope.isDisabledPrevious = false;

					}// end of onNext

					$scope.currentSetOfQuestionsStart = 0;
					$scope.currentSetOfQuestionsEnd = 0;
					$scope.currentSetOfQuestionsSize = $mdMedia('xs')?5:25;
					$scope.currentSetOfQuestions = [];

					$scope.nextSetOfQuestions = function() {
						if ($scope.currentSetOfQuestionsEnd == $scope.practiceTestObj.questions.length)
							return;
						$scope.currentSetOfQuestionsStart = $scope.currentSetOfQuestionsEnd;
						$scope.currentSetOfQuestionsEnd = $scope.currentSetOfQuestionsStart
								+ $scope.currentSetOfQuestionsSize;
						if ($scope.currentSetOfQuestionsEnd >= $scope.practiceTestObj.questions.length) {
							$scope.currentSetOfQuestions = $scope.practiceTestObj.questions
									.slice($scope.currentSetOfQuestionsStart);
							$scope.currentSetOfQuestionsEnd = $scope.practiceTestObj.questions.length;
						} else {
							$scope.currentSetOfQuestions = $scope.practiceTestObj.questions
									.slice($scope.currentSetOfQuestionsStart,
											$scope.currentSetOfQuestionsEnd);
						}
					}

					$scope.previousSetOfQuestions = function() {
						if ($scope.currentSetOfQuestionsStart == 0)
							return;
						$scope.currentSetOfQuestionsStart = $scope.currentSetOfQuestionsStart
								- $scope.currentSetOfQuestionsSize;
						$scope.currentSetOfQuestionsEnd = $scope.currentSetOfQuestionsStart
								+ $scope.currentSetOfQuestionsSize;
						if ($scope.currentSetOfQuestionsStart <= 0) {
							$scope.currentSetOfQuestions = $scope.practiceTestObj.questions
									.slice(0, $scope.currentSetOfQuestionsEnd);
							$scope.currentSetOfQuestionsStart = 0;
						} else {
							$scope.currentSetOfQuestions = $scope.practiceTestObj.questions
									.slice($scope.currentSetOfQuestionsStart,
											$scope.currentSetOfQuestionsEnd);
						}
					}

					$scope.onButtonClick = function(index) {

						$scope.currentQuestionIndex = index;

						if ($scope.currentQuestionIndex == 0) {
							$scope.isDisabledPrevious = true;
						} else {
							$scope.isDisabledPrevious = false;
						}

						if ($scope.currentQuestionIndex == $scope.totalQuestions - 1) {
							$scope.isDisabledNext = true;
						} else {
							$scope.isDisabledNext = false;
						}

					};// end of onPage

					$scope.onPrevious = function() {
						$scope.currentQuestionIndex--;

						if ($scope.currentQuestionIndex == 0) {
							$scope.isDisabledPrevious = true;
						} else {
							$scope.isDisabledPrevious = false;
						}
						$scope.isDisabledNext = false;

					}// end of onPrevious

					$scope.getPracticeExamByInstitute = function() {
						$log
								.debug("###Inside practiceExamTestCtr###getPracticeExamByInstitute");
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService.getPracticeExamByInstitute(
								$scope.curUser.instituteID).then(
								function(practiceExamList) {
									$scope.practiceTest = practiceExamList;

								});
					}

					$scope.showselectedExam = function() {
						$log
								.debug("###Inside practiceExamTestCtr###showselectedExam");
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService
								.getPracticeExamById($scope.selectedExamId)
								.then(
										function(practiceTest) {
											$scope.practiceTestObj = practiceTest;
											$scope.totalQuestions = $scope.practiceTestObj.questions.length

											for (var i = 0; i < $scope.practiceTestObj.questions.length; i++) {
												$scope.userAnsList
														.push({
															qID : $scope.practiceTestObj.questions[i].id,
															userOption : ''
														});
											}

											$scope.tempPracticeExamResult.examTitle = $scope.practiceTestObj.examtitle;
											// $scope.tempPracticeExamResult.test
											// =
											// $scope.practiceTestObj.questions;

											$scope.nextSetOfQuestions();
											$scope.isDisabledPrevious = true;
											$scope.loading = false;
										});

					}// End of showselectedExam

					$scope.getPracticeExamResultbyEmail = function() {
						$log
								.debug("###Inside practiceExamTestCtr###getPracticeExamResultbyEmail");
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService
								.getPracticeExamResultbyEmail(
										$scope.curUser.email_id)
								.then(
										function(practiceExamResultList) {

											$scope.examResults = practiceExamResultList;

										});
					}

					$scope.addPracticeExamResult = function() {

						$scope.tempPracticeExamResult.testID = $scope.selectedExamId;

						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						$scope.tempPracticeExamResult.test = $scope.practiceTestObj.questions;
						$scope.tempPracticeExamResult.userAns = $scope.userAnsList;

						PracticeExamService
								.addPracticeExamResult(
										$scope.tempPracticeExamResult)
								.then(
										function(examResultObj) {
											$scope.selectedID = examResultObj.id;
											$log.debug("$scope.selectedID :"
													+ $scope.selectedID);
											$log
													.debug("$scope.practiceTestObj.id :"
															+ $scope.practiceTestObj.id);

											$scope.examResultList
													.push($scope
															.getEmptyExamResult(
																	$scope.foundSchool,
																	$scope.practiceTestObj.standard,
																	examResultObj));
											$scope
													.addExamResultList($scope.examResultList);

											$scope.showSavedToast();
											$state
													.go(
															'userQuesAnsView',
															{
																selectedExamId : $scope.practiceTestObj.id,
																selectedResultId : $scope.selectedID
															});

										});

					}

					$scope.getEmptyExamResult = function(school, standard,
							examResult) {
						var date1 = new Date();
						var year1 = date1.getFullYear(2016, 11, 11);
						year1 = year1.toString().substr(2, 2);
						year1 = date1.getFullYear() + "-" + (Number(year1) + 1);
						return {
							standard : standard,
							studName : $scope.curUser.firstName,
							mediumOfAnswer : '',
							marks : $scope.tempPracticeExamResult.score,
							createdDate : new Date(),
							modifiedBy : $scope.curUser ? $scope.curUser.email_id
									: 'guest',
							school : school,
							institute : school?school.institute:null,
							examYear : year1,
							grfReviewed : false,
							examResult : examResult
						};
					}
					$scope.examResultList = [];

					$scope.addExamResultList = function() {
						$scope.loading = true;
						gfStudentService.addExamResults($scope.examResultList)
								.then(function(resp) {
									$scope.loading = false;
								});
					}

					$scope.showConfirm = function(ev) {
						var confirm = $mdDialog.confirm().title(
								'Are you sure you want to submit test now?')
								.targetEvent(ev).ok('YES').cancel('NO');
						$mdDialog.show(confirm).then(function() {
							$log.debug("User clicked Okay");
							$scope.checkAnswer();
						}, function() {
							// do nothing to stay on page.
							$log.debug("User clicked No");
						});
					};

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							// $scope.getPracticeExamByInstitute();
							// $scope.getPracticeExamResultbyEmail();
							$scope.showselectedExam();

						} else {
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});
