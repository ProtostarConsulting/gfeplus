angular
		.module("prostudyApp")
		.controller(
				"reportBySubjectClassCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF, $state,
						$filter) {

					$log.debug("Inside attendanceReportBySubjectClassCtr");
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.standards = [];
					$scope.divisions = [];
					$scope.subjects = [];
					$scope.newList = [];

					$scope.selectedStdID;
					$scope.stdList;
					$scope.divList;
					$scope.subList;

					$scope.selectedSubject;
					$scope.selectedStandard;
					$scope.selectedDivision;

					$scope.present;
					$scope.absent;
					var presentCount = 0;
					var absentCount = 0;
					var totalStudents;

					$scope.newPresentCount = 0;
					$scope.newAbsentCount = 0;

					$scope.newStudList = [];

					$scope.getStandardByInstitute = function() {

						var StudentService = appEndpointSF
								.getStudentService();
						StudentService
								.getStandardByInstitute(
										$scope.curUser.instituteID)
								.then(
										function(standardList) {
											for (var i = 0; i < standardList.length; i++) {
												$scope.standards
														.push(standardList[i].name);

											}
											$scope.stdList = standardList;

										});
					}

					$scope.getStandardByInstitute();

					$scope.getDivisionByStandard = function() {

						for (var i = 0; i < $scope.stdList.length; i++) {
							if ($scope.selectedStandard == $scope.stdList[i].name) {
								$scope.selectedStdID = $scope.stdList[i].id;
							}
						}
						var StudentService = appEndpointSF
								.getStudentService();
						StudentService
								.getDivisionByStandard($scope.selectedStdID)
								.then(
										function(divisionList) {
											for (var i = 0; i < divisionList.length; i++) {
												$scope.divisions
														.push(divisionList[i].name);
											}
											$scope.divList = divisionList;
										});
						$scope.divisions.splice(0, $scope.divisions.length);
					}

					$scope.getSubjectByDivision = function() {

						for (var i = 0; i < $scope.divList.length; i++) {
							if ($scope.selectedDivision == $scope.divList[i].name) {
								$scope.selectedDivID = $scope.divList[i].id;
							}
						}
						var StudentService = appEndpointSF.getStudentService();
						StudentService
								.getSubjectByDivision($scope.selectedDivID)
								.then(
										function(subjectList) {
											for (var i = 0; i < subjectList.length; i++) {
												$scope.subjects
														.push(subjectList[i].name);
											}

										});
						$scope.subjects.splice(0, $scope.subjects.length);
					}

					$scope.getAttendanceByClass = function() {

						var AttendanceService = appEndpointSF
								.getAttendanceService();
						AttendanceService
								.getAttendanceByClass(
										$scope.curUser.instituteID,
										$scope.selectedStandard,
										$scope.selectedDivision,
										$scope.selectedSubject)
								.then(
										function(students) {
											$scope.studentList = students;

											for (var i = 0; i < $scope.studentList.length; i++) {
												$scope.isDistinct = false;
												for (var j = 0; j < i; j++) {
													if ($scope.studentList[i].studID == $scope.studentList[j].studID) {
														$scope.isDistinct = true;
														break;
													}
												}
												if (!$scope.isDistinct) {
													$scope.newList
															.push($scope.studentList[i]);
												}
											}

											totalStudents = $scope.studentList.length;
											for (var i = 0; i < $scope.studentList.length; i++) {
												if ($scope.studentList[i].attendance == true) {
													$scope.present = $scope.studentList[i];
													presentCount++;

												} else {
													$scope.absent = $scope.studentList[i];
													absentCount++;

												}
											}

											$scope.newPresentCount = ((presentCount / totalStudents) * 100);
											$scope.newAbsentCount = ((absentCount / totalStudents) * 100);

										});

					}

					
					$scope.dataListFromServer = [
							[ 'Attendance', 'Percentage' ],
							[ 'Present students', 0 ],
							[ 'Absent students', 0 ],

					];

					$scope.getNewDataFromServer = function() {

						$scope.dataListFromServer = [
								[ 'Attendance', 'Percentage' ],
								[ 'Present students', $scope.newPresentCount ],
								[ 'Absent students', $scope.newAbsentCount ],

						];

						$scope.drawChart();
						$scope.attendanceReportClassForm.$setPristine();
						$scope.attendanceReportClassForm.$setValidity();
						$scope.attendanceReportClassForm.$setUntouched();
						$scope.clear();
					}

					$scope.drawChart = function() {

						var data = google.visualization
								.arrayToDataTable($scope.dataListFromServer);

						var options = {
							title : 'Attendance Report',
							is3D : true,
						};

						var chart = new google.visualization.PieChart(document
								.getElementById('piechart'));
						chart.draw(data, options);
					}

					$scope.clear = function() {

						$scope.selectedInstitute = "";
						$scope.selectedStandard = "";
						$scope.selectedDivision = "";
						$scope.selectedSubject = "";
						$scope.newList.length = 0;
						$scope.studentList.splice(0, $scope.studentList.length);
						$scope.newPresentCount = 0;
						$scope.newAbsentCount = 0;
						presentCount = 0;
						absentCount = 0;

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

					

				});