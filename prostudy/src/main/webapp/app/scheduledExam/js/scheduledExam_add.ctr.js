angular
		.module("prostudyApp")
		.controller(
				"scheduledExamAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						boardList) {

					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'ScheduledExam Saved!').position("top").hideDelay(
								3000));
					};	
					$scope.model;
					$scope.selected=[];
					$scope.durations=["30","60","90","120","150","180","210"];
					$scope.tempScheduledExam = {
						examtitle : "",
						desc : "",
						startdatentime : "",
						enddatentime : "",
						duration : "",
						instituteID : $scope.curUser.instituteID,
						listOfQuestion : []
					};
					
					
					$scope.addScheduledExam = function() {
						
						
						$scope.tempScheduledExam.listOfQuestion=$scope.selected;
						
						var ScheduledExamService = appEndpointSF.getScheduledExamService();

						ScheduledExamService.addScheduledExam($scope.tempScheduledExam)
								.then(
										function(msgBean) {
											
										});	
						$scope.showSavedToast();
						$scope.tempScheduledExam = {};
						$state.go("scheduledExam", {});
						}
					
				
					$scope.getQuestionsByInstitute = function() {

						var ScheduledQuestionService = appEndpointSF.getScheduledQuestionService();
						ScheduledQuestionService.getQuestionsByInstitute($scope.curUser.instituteID).then(
								function(questionsList) {
									$scope.questions = questionsList;

								});
					}

					$scope.query = {
							order : 'name',
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
						$state.go("scheduledExam", {});
					}				

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getQuestionsByInstitute();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
				
				});

