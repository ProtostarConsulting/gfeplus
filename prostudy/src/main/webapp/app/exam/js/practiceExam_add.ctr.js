angular
		.module("prostudyApp")
		.controller(
				"addPracticeExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,$sce, $filter,boardList, standardList) {
					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Practice Exam Saved!').position("top")
								.hideDelay(3000));
					};
					
					$scope.boards = [ {} ];
					$scope.boards = boardList;
			
					$scope.standards = standardList;
					$scope.divisions = []; 
					$scope.subjects = []; 
					$scope.selected = [];		

					$scope.selectedStdID;
					$scope.stdList;
					$scope.divList;
					$scope.subList;

					
					$scope.tempPracticeExam = {
					
						examtitle : "",
						board : "",
						standard : "",
						division : "",
						subject : "",
						category : "",
						instructions : "",
						questions : [],
						
					};
					$scope.questions = [];
					
					$scope.getStandardByInstitute = function() {

						var StudentService = appEndpointSF
								.getStudentService();
						StudentService.getStandardByInstitute($scope.curUser.instituteID).then(
								function(standardList) {
									for(var i=0; i< standardList.length; i++)
										{
											$scope.standards.push(standardList[i].name);
											
										}
									$scope.stdList = standardList;
									
								});
					}
					
				
					
					$scope.getDivisionByStandard = function() {
					
						for(var i=0;i< $scope.stdList.length;i++)
						{
							if($scope.tempPracticeExam.standard == $scope.stdList[i].name)
							{
								$scope.selectedStdID = $scope.stdList[i].id;
							}
						}
						var StudentService = appEndpointSF
								.getStudentService();
						StudentService.getDivisionByStandard($scope.selectedStdID).then(
								function(divisionList) {
									for(var i=0; i< divisionList.length; i++)
									{
										$scope.divisions.push(divisionList[i].name);
									}
									$scope.divList = divisionList;
								});
						
						$scope.divisions.splice(0,$scope.divisions.length);
					}
					
					$scope.getSubjectByDivision = function() {
						
						for(var i=0;i<$scope.divList.length;i++)
						{
							if($scope.tempPracticeExam.division == $scope.divList[i].name)
							{
								$scope.selectedDivID = $scope.divList[i].id;
							}
						}
						var StudentService = appEndpointSF.getStudentService();
						StudentService.getSubjectByDivision($scope.selectedDivID).then(
								function(subjectList) {
									for(var i=0; i< subjectList.length; i++)
									{
										$scope.subjects.push(subjectList[i].name);
									}

								});
						$scope.subjects.splice(0,$scope.subjects.length);
					}
					
					
					$scope.getQuesByClass = function() {

						var QuestionService = appEndpointSF.getQuestionService();
						QuestionService.getQuesByClass($scope.curUser.instituteID,$scope.tempPracticeExam.standard,
								$scope.tempPracticeExam.division, $scope.tempPracticeExam.subject)
								.then(function(questionsList) {
									$scope.questions = questionsList;
									
									

								});
					}
					
					$scope.addPracticeExam = function() {
						$scope.tempPracticeExam.instituteID = $scope.curUser.instituteID;
						$scope.tempPracticeExam.date = new Date();
						$scope.tempPracticeExam.likes = 0;
						$scope.tempPracticeExam.dislikes = 0;
						$scope.tempPracticeExam.questions = [];
						var practiceExamService = appEndpointSF.getPracticeExamService();
						for (var i = 0; i < $scope.selected.length; i++) {
							$scope.tempPracticeExam.questions.push($scope.selected[i]);
						}
						
						practiceExamService.addPracticeExam($scope.tempPracticeExam).then(function(msgBean) 
								{
											$scope.showSavedToast();
											$scope.practiceExamForm.$setPristine();
											$scope.practiceExamForm.$setValidity();
											$scope.practiceExamForm.$setUntouched();
											$scope.tempPracticeExam = {	};
											$scope.selected.splice(0,$scope.selected.length);
											$scope.divisions.splice(0,$scope.divisions.length);
								});
					
						
					}

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
					$scope.cancelButton = function() {
						$state.go("exam", {});
					}

					$scope.waitForServiceLoad = function() {
						  if (appEndpointSF.is_service_ready) {					  
								//$scope.getStandardByInstitute();	  
						  } 
						  else {
						   $log.debug("Services Not Loaded, watiting...");
						   $timeout($scope.waitForServiceLoad, 1000);
						  }
						 }
						  
						 $scope.waitForServiceLoad();

				});
