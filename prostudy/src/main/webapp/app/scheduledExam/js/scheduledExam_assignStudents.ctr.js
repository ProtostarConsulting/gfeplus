angular
		.module("prostudyApp")
		.controller(
				"scheduledExamAssignStudentsCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $mdDialog, $mdMedia,
						tableTestDataFactory, appEndpointSF) {
					console.log("Inside scheduledExamAssignStudentsCtr");

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Assigned to Student!')
								.position("top").hideDelay(3000));
					};
					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$scope.students = [];
					$scope.selectedstud = [];
					$scope.selectedScheduledExam = [];

					$scope.tempScheduledExamStudent = {

						assigned : "",
						stud : "",
						scheduledExam : "",

					};

					$scope.getStudentsByInstitute = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByInstitute($scope.curUser.instituteID)
								.then(
										function(studentList) {
											$scope.newStudents = studentList;

											for (var i = 0; i < $scope.newStudents.length; i++) {
												if ($scope.newStudents[i].role == "Student") {
													$scope.students
															.push($scope.newStudents[i]);
												}
											}

										});
					}

					$scope.getScheduledExamByInstitute = function() {

						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						ScheduledExamService
								.getScheduledExamByInstitute(
										$scope.curUser.instituteID)
								.then(
										function(scheduledExamList) {
											$scope.scheduledExams = scheduledExamList;											
										});
					}

				

					$scope.assignScheduledExamToStudent = function() {

						for (var i = 0; i < $scope.selectedstud.length; i++) {
							for (var j = 0; j < $scope.selectedScheduledExam.length; j++) {

								$scope.tempScheduledExamStudent.stud = $scope.selectedstud[i];
								$scope.tempScheduledExamStudent.scheduledExam = $scope.selectedScheduledExam[j];
								$scope.tempScheduledExamStudent.assigned = true;
								
								var ScheduledStudentExamService = appEndpointSF
										.getScheduledStudentExamService();
								ScheduledStudentExamService
										.assignScheduledExamToStudent(
												$scope.tempScheduledExamStudent)
										.then(function(msgBean) {

										});
								$scope.tempScheduledExamStudent = {};

							}
						}

						$scope.showSavedToast();

					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getStudentsByInstitute();
							$scope.getScheduledExamByInstitute();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});