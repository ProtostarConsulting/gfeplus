angular
		.module("prostudyApp")
		.controller(
				"reportByStudentCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF, $state, $filter, standardList, subjectList) {

					$log.debug("Inside reportByStudentCtr");
				
					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
				    
					$scope.standards = [ {} ];
					$scope.standards = standardList;
					$scope.subjects = [ {} ];
					$scope.subjects = subjectList;
					
					$scope.selectedSubject;
					$scope.selectedStandard;
					$scope.selectedStudent = [];
					$scope.newSelectedStudent = [];
					$scope.selected;
					$scope.present;
					$scope.absent;
					var presentCount = 0;
					var absentCount = 0;
					var totalCount;
					$scope.newPresentCount = 0;
					$scope.newAbsentCount = 0;
					$scope.newStudList = [];
					
					$scope.allDates = [];
					$scope.attendanceRecord = [];
					var array = [];
					
					$scope.fromDate = new Date();
					$scope.toDate = new Date();
					
					$scope.showDateValue = function() {
						console.log("in side showDateValue");
						
					}
					
					$scope.getAllDates = function()
					{
						
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

						var dateArray = getDates($scope.fromDate,$scope.toDate);
						for(i=0;i<dateArray.length;i++)
							{
								$scope.allDates.push(dateArray[i]);
							}
						
						array.push(dateArray);
					    $log.debug("dateArray :" + dateArray);
					    $log.debug("dateArray :" + array.length);
					    $log.debug("$scope.allDates :" + angular.toJson($scope.allDates));
					    $log.debug("$scope.allDates :"+$scope.allDates.length);
					}
					

					$scope.getSelectedStudents = function() {

						var AttendanceService = appEndpointSF
								.getAttendanceService();
						AttendanceService
								.getAttendanceByInstitute($scope.curUser.instituteID)
								.then(
										function(students) {
											$scope.studentList = students;
											$log.debug("$scope.studentList :"+$scope.studentList.length);
											for(var i=0;i<$scope.studentList.length;i++)
											{
												if($scope.selectedStandard == $scope.studentList[i].standard)
												{
													if($scope.selectedSubject == $scope.studentList[i].subject)
													{
														$scope.newStudList.push($scope.studentList[i])
													}
												}
											}
										
											
										});
						$scope.getAllDates();
					}
					
					$scope.getStudent = function()
					{
						for(var j=0;j<$scope.newStudList.length;j++)
							{
								if($scope.selectedStudent.studID == $scope.newStudList[j].studID)
								{
									$scope.newSelectedStudent.push($scope.newStudList[j]);
								
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
					
					$scope.getReport = function()
					{
						for(var i=0;i<$scope.allDates.length;i++)
						{
							for(var j=0;j<$scope.newSelectedStudent.length;j++)
							{
								if($scope.allDates[i] == $scope.newSelectedStudent[j].date)
									{
											$log.debug("true....:");
											//$scope.attendanceRecord.push($scope.newStudList[j]);
											//$log.debug("$scope.attendanceRecord :"+angular.toJson($scope.attendanceRecord));
									}
							}
						}
					}
					
					$scope.loadChart = function() {
						google.charts.load('43', {packages: ['corechart']});
						google.charts.setOnLoadCallback(drawChart);						
					} 
					
					$scope.dataListFromServer = [
									          ['Attendance', 'Percentage'],
									          ['Present students',  0],
									          ['Absent students',   0],
									          
									        ];
					
					
					$scope.getNewDataFromServer = function() {
						
						$scope.dataListFromServer = [
											          ['Attendance', 'Percentage'],
											          ['Present students', $scope.newPresentCount],
											          ['Absent students', $scope.newAbsentCount],
											          
											        ];
						
						drawChart();
						$scope.clear();
					}
					 
				      function drawChart() {

				        var data = google.visualization.arrayToDataTable($scope.dataListFromServer);

				        var options = {
				          title: 'Attendance Report',
				          is3D: true,
				        };

				        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
				        chart.draw(data, options);
				      }
				      
				  	
						$scope.clear = function() {
							
							$scope.selectedStudent = "";
							$scope.selectedStandard = "";
							$scope.selectedSubject = "";
							$scope.newSelectedStudent.splice(0,$scope.newSelectedStudent.length);
							$scope.newPresentCount = 0;
							$scope.newAbsentCount = 0;
							presentCount = 0;
							absentCount = 0;
						
						}
				

				      $scope.loadChart();

				});