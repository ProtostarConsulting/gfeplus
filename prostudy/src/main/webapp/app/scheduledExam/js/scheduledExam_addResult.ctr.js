angular
		.module("prostudyApp")
		.controller(
				"addScheduledExamResultCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						boardList) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'ScheduledExam Result Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.studentList = [];
					$scope.tempScheduledExamResult = {
						examTitle : "",
						userId : "",
						email_id : "",
						firstName : "",
						lastName : "",
						startTime : "",
						endTime : "",
						score : "",
						testID : "",
						userAns : [],
						test : []

					};
					$scope.getScheduledExamByInstitute = function() {

						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						ScheduledExamService.getScheduledExamByInstitute(
								$scope.curUser.instituteID).then(
								function(scheduledExamList) {
									$scope.scheduledExams = scheduledExamList;

								});
					}

					$scope.getStudentListByScheduledExamId = function() {

						for (var i = 0; i < $scope.scheduledExams.length; i++) {

							if ($scope.scheduledExams[i].examtitle == $scope.tempScheduledExamResult.examTitle) {
								$scope.selectedExamId = $scope.scheduledExams[i].id;
								$scope.tempScheduledExamResult.testID = $scope.scheduledExams[i].id;
							}
						}
						
						var ScheduledStudentExamService = appEndpointSF
								.getScheduledStudentExamService();
						ScheduledStudentExamService
								.getStudentListByScheduledExamId(
										$scope.selectedExamId)
								.then(function(studentList) {
									$scope.studentList = studentList.items;

								});

					}
					$scope.getStudentData = function() {
						for (var i = 0; i < $scope.studentList.length; i++) {
						
							if ($scope.studentList[i].email_id == $scope.tempScheduledExamResult.email_id) {
								$scope.tempScheduledExamResult.userId = $scope.studentList[i].id;
								$scope.tempScheduledExamResult.firstName = $scope.studentList[i].firstName;
								$scope.tempScheduledExamResult.lastName = $scope.studentList[i].lastName;
							}
						}

					}

					$scope.addScheduledExamResult = function() {

						var ScheduledExamResultService = appEndpointSF
								.getScheduledExamResultService();

						ScheduledExamResultService.addScheduledExamResult(
								$scope.tempScheduledExamResult).then(
								function(msgBean) {

									$scope.showSavedToast();
									$scope.tempScheduledExamResult = {};
									$scope.scheduledExamResultForm.$setPristine();							
									$scope.scheduledExamResultForm.$setUntouched();
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
							$scope.getScheduledExamByInstitute();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});
