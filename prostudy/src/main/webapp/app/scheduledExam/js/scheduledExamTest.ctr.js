angular
		.module("prostudyApp")
		.controller(
				"scheduledExamTestCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams, $mdDialog) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Result Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					// Code for timer
					var date = new Date();
					
					

					$scope.counter;
					$scope.startTime = null;
					$scope.endTime = null;
					$scope.examResults;
				

					$scope.currentPage = 0;
					$scope.totalPages = 0;
					$scope.itemsPerPage = 1;
					$scope.count = 0;
					$scope.isDisabledPrevious = false;
					$scope.isDisabledNext = false;
					$scope.score = 0;

					$scope.userAnsList = null; // {qID, userOption}
					$scope.correctAns = [];
					$scope.selected = [];

					$scope.questions = [];
					$scope.scheduledTest = [];
					$scope.Test = [];
					$scope.selection = [];
					
	
					$scope.tempScheduledExamResult = {

						
						examTitle : "",
						userId : $scope.curUser.id,
						email_id : $scope.curUser.email_id,
						firstName : $scope.curUser.firstName,
						lastName : $scope.curUser.lastName,
						startTime : "",
						endTime : "",
						score : $scope.score,
						userAns : $scope.userAnsList,
						testID : "",
						test : ""

					}
					
					
					var mytimeout = null;

					$scope.onTimeout = function() {
						if ($scope.counter === 0) {
							$scope.$broadcast('timer-stopped', 0);
							$timeout.cancel(mytimeout);
							$scope.checkAnswer();
							
							$scope.getScheduledExamResultbyEmail();
							return;

						}
						$scope.counter--;

						mytimeout = $timeout($scope.onTimeout, 1000);
					};

					$scope.startTimer = function() {
						mytimeout = $timeout($scope.onTimeout, 1000);
						$scope.tempScheduledExamResult.startTime = new Date();
						//$scope.tempScheduledExamResult.startTime = $filter('date')(new Date(), 'hh:mm:ss a');
						
					};

					$scope.stopTimer = function() {
						var date = new Date();
						$scope.$broadcast('timer-stopped', $scope.counter);
						$timeout.cancel(mytimeout);
						$scope.tempScheduledExamResult.endTime = new Date();
						//$scope.tempScheduledExamResult.endTime = $filter('date')(new Date(), 'hh:mm:ss a');
						
							
					};

					$scope.$on('timer-stopped', function(event, remaining) {
						if (remaining === 0) {
							
							console.log('your time ran out!');

						}
					});// End of timer


					
					$scope.toggleSelection = function toggleSelection(id, optionId) {
						
						var idx = $scope.selection.indexOf(id+''+optionId);
						
						if (idx > -1) {
							$scope.selection.splice(idx, 1);
						} else {
							$scope.selection.push(id+''+optionId);
							for(var i = 0; i<$scope.Test.listOfQuestion.length; i++){
								if(id== $scope.Test.listOfQuestion[i].id){
									$scope.userAnsList[i].userOption = 'option'+ optionId;
								}
							}
						}
						

					};				
					
				
					$scope.checkAnswer = function() {

						for (var i = 0; i < $scope.userAnsList.length; i++) {
								
							if ($scope.userAnsList[i].userOption === $scope.Test.listOfQuestion[i].correctAns) {
								$scope.tempScheduledExamResult.score++;
							}
						}
						$scope.stopTimer();													

					}

					$scope.getCorrectAnsByQID = function(qID) {

						for (var i = 0; i < $scope.Test.listOfQuestion.length; i++) {

							if ($scope.Test.listOfQuestion[i].id == qID) {
								return $scope.Test.listOfQuestion[i].correctAns;

							}
						}
						return -1;
					}

				

					$scope.onNext = function() {
						$scope.currentPage++;
						$scope.count = $scope.currentPage;

						$scope.array = $scope.Test.listOfQuestion.slice(
								($scope.currentPage * $scope.itemsPerPage)
										- $scope.itemsPerPage,
								($scope.currentPage * $scope.itemsPerPage));
						console.log("slice =" + $scope.array);

						if ($scope.currentPage == $scope.totalPages) {
							$scope.isDisabledNext = true;

						} else {
							$scope.isDisabledPrevious = false;
						}

					}// end of onNext

					$scope.onButtonClick = function(index) {

						$scope.currentPage = index;
						$scope.count = $scope.currentPage;

						$scope.array = $scope.Test.listOfQuestion.slice(
								($scope.currentPage * $scope.itemsPerPage)
										- $scope.itemsPerPage,
								($scope.currentPage * $scope.itemsPerPage));

						if ($scope.currentPage == $scope.totalPages) {
							$scope.isDisabledNext = true;

						} else {
							$scope.isDisabledNext = false;
						}
						if ($scope.currentPage == 1) {
							$scope.isDisabledPrevious = true;

						} else {
							$scope.isDisabledPrevious = false;
						}

					};// end of onPage

					$scope.onPrevious = function() {
						$scope.currentPage--;

						$scope.array = $scope.Test.listOfQuestion.slice(
								($scope.currentPage * $scope.itemsPerPage)
										- $scope.itemsPerPage,
								($scope.currentPage * $scope.itemsPerPage));

						if ($scope.currentPage <= 1) {
							$scope.isDisabledPrevious = true;

						} else {
							$scope.isDisabledNext = false;
						}

					}// end of onPrevious

					$scope.score = 0;

					$scope.getScheduledExamByInstitute = function() {

						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						ScheduledExamService.getScheduledExamByInstitute(
								$scope.curUser.instituteID).then(
								function(scheduledExamList) {
									$scope.scheduledTest = scheduledExamList;

								});
					}

					$scope.selectedExamId = $stateParams.selectedExamId;

					$scope.showselectedExam = function() {
						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();

						ScheduledExamService.getScheduledExamById($scope.selectedExamId)
								.then(
										function(scheduledTest) {								
											
											
											$scope.Test = scheduledTest;
											$scope.counter=$scope.Test.duration*60;
											
											$scope.buttonLimit = function(count) {
												$scope.totalPages = Math
														.ceil($scope.Test.listOfQuestion.length / 1);

												return Array.apply(0,
														Array(+count)).map(
														function(value, index) {
															return index;
														});

											}// end of buttonlimit
									
											$scope.newQues = $scope.Test.listOfQuestion;

											$scope.newQues[0].qId = 1;
											for (var i = 1; i < $scope.newQues.length; i++) {

												$scope.newQues[i].qId = $scope.newQues[i - 1].qId + 1;

											}

											$scope.tempScheduledExamResult.examTitle = $scope.Test.examtitle;

											$scope.tempScheduledExamResult.test = $scope.Test.listOfQuestion;
											
											$scope.userAnsList = [];
											for(var i = 0; i<$scope.Test.listOfQuestion.length; i++){
												$scope.userAnsList.push({
													qID : $scope.Test.listOfQuestion[i].id,
													userOption : ''
												});
											}
											
											
											
											$scope.onNext();
											$scope.isDisabledPrevious = true;
										});

					}// End of showselectedExam

					
	
					$scope.addScheduledExamResult = function() {

						$scope.tempScheduledExamResult.testID = $scope.selectedExamId;
						$scope.tempScheduledExamResult.userAns = $scope.userAnsList;
						
						var ScheduledExamResultService = appEndpointSF.getScheduledExamResultService();
						

						ScheduledExamResultService.addScheduledExamResult(
								$scope.tempScheduledExamResult).then(
								function(msgBean) {
									
								$scope.showSavedToast();
								$state.go('scheduledExam.userQuesAnsView', {selectedExamId : $scope.Test.id,selectedEmailId: $scope.curUser.email_id,selectedResultId:msgBean.id});
									

								});
						}
					
					
					
					 $scope.showConfirm = function(ev) {
						  
						 	$scope.checkAnswer();
						    var confirm = $mdDialog.confirm()
						          .title('Are you sure you want to submit exam now ?')
						          .targetEvent(ev)
						          .ok('YES')
						          .cancel('NO');
						    $mdDialog.show(confirm).then(function() {					    	
						    	//check User already attempted the test
						    	
						    	$scope.getScheduledExamResultbyEmail();					    	
						    					    	
						    			
						    }, function() {
						      
						    });
						  };
					
							$scope.updateScheduledExamResult = function(selectedResult) {
															
								selectedResult.userAns=$scope.userAnsList;
								selectedResult.startTime=$scope.tempScheduledExamResult.startTime ;
								selectedResult.endTime=$scope.tempScheduledExamResult.endTime ;
								selectedResult.score = $scope.tempScheduledExamResult.score;
									
								
								var ScheduledExamResultService = appEndpointSF.getScheduledExamResultService();						
								ScheduledExamResultService.updateScheduledExamResult(selectedResult).then(
										function(msgBean) {
											
										$scope.showSavedToast();
										$state.go('scheduledExam.userQuesAnsView', {selectedExamId : $scope.Test.id,selectedEmailId: $scope.curUser.email_id,selectedResultId:msgBean.id});
											

										});
								}
						  
						  
						  $scope.list=[];
							$scope.getScheduledExamResultbyEmail = function() {

								var ScheduledExamResultService = appEndpointSF
										.getScheduledExamResultService();
								ScheduledExamResultService.getScheduledExamResultbyEmail($scope.curUser.email_id).then(
										function(resultList) {
											$scope.list = resultList;											
											
											for(var i=0;i<$scope.list.length ;i++)
											{
												/*	If already  attempted*/
											if($scope.list[i].testID==$scope.Test.id)
											{
												$scope.selectedResult=$scope.list[i];									
												
												$scope.updateScheduledExamResult($scope.selectedResult);
												break;
											}
											}
										/*	For First attempt*/
											if($scope.list.length==0)
												{																								
												$scope.addScheduledExamResult();
												}
											
										});
							}
						  
						  					  
						  
						  

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getScheduledExamByInstitute();						
							$scope.showselectedExam();
							
						} else {
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}


					$scope.waitForServiceLoad();

				});
