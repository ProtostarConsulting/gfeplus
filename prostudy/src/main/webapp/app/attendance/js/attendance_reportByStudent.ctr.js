angular
		.module("prostudyApp")
		.controller(
				"reportByStudentCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF, $state,
						$filter) {

					$log.debug("Inside reportByStudentCtr");

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
					$scope.selectedStud;
					$scope.newSelectedStudent = [];
					$scope.selected;
					$scope.present;
					$scope.absent;
					var presentCount = 0;
					var absentCount = 0;
					var totalCount;
					$scope.newPresentCount = 0;
					$scope.newAbsentCount = 0;

					$scope.allDates = [];
					$scope.attendanceRecord = [];
					var array = [];

					$scope.fromDate = new Date();
					$scope.toDate = new Date();

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

					$scope.showDateValue = function() {
						console.log("in side showDateValue");

					}

					$scope.getAllDates = function() {

						Date.prototype.addDays = function(days) {
							var dat = new Date(this.valueOf())
							dat.setDate(dat.getDate() + days);
							return dat;
						}

						function getDates(startDate, stopDate) {
							var dateArray = new Array();
							var currentDate = startDate;
							while (currentDate <= stopDate) {
								dateArray.push(currentDate)
								currentDate = currentDate.addDays(1);
							}
							return dateArray;
						}

						var dateArray = getDates($scope.fromDate, $scope.toDate);
						for (i = 0; i < dateArray.length; i++) {
							$scope.allDates.push(dateArray[i]);
						}

						array.push(dateArray);
						/*
						 * $log.debug("dateArray :" + dateArray);
						 * $log.debug("dateArray :" + array.length);
						 * $log.debug("$scope.allDates :" +
						 * angular.toJson($scope.allDates));
						 * $log.debug("$scope.allDates
						 * :"+$scope.allDates.length);
						 */
					}

					$scope.getSelectedStudents = function() {

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

										});
						$scope.getAllDates();
					}

					$scope.getStudent = function() {
						for (var j = 0; j < $scope.studentList.length; j++) {
							if ($scope.selectedStud.studID == $scope.studentList[j].studID) {
								$scope.newSelectedStudent
										.push($scope.studentList[j]);

							}
						}

						totalCount = $scope.newSelectedStudent.length;
						for (var i = 0; i < $scope.newSelectedStudent.length; i++) {
							if ($scope.newSelectedStudent[i].attendance == true) {
								$scope.present = $scope.newSelectedStudent[i];
								presentCount++;

							} else {
								$scope.absent = $scope.newSelectedStudent[i];
								absentCount++;

							}
						}

						$scope.newPresentCount = ((presentCount / totalCount) * 100);
						$scope.newAbsentCount = ((absentCount / totalCount) * 100);
					}

					$scope.getReport = function() {
						for (var i = 0; i < $scope.allDates.length; i++) {
							for (var j = 0; j < $scope.newSelectedStudent.length; j++) {
								if ($scope.allDates[i] == $scope.newSelectedStudent[j].date) {
									$log.debug("true....:");
									// $scope.attendanceRecord.push($scope.newStudList[j]);
									// $log.debug("$scope.attendanceRecord
									// :"+angular.toJson($scope.attendanceRecord));
								}
							}
						}
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
						$scope.attendanceReportStudentForm.$setPristine();
						$scope.attendanceReportStudentForm.$setValidity();
						$scope.attendanceReportStudentForm.$setUntouched();
						$scope.clear();
					}

					$scope.drawChart = function(){

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

						$scope.selectedStud = "";
						$scope.selectedStandard = "";
						$scope.selectedDivision = "";
						$scope.selectedSubject = "";
						$scope.newList.length = 0;
						$scope.newSelectedStudent.splice(0,
								$scope.newSelectedStudent.length);
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