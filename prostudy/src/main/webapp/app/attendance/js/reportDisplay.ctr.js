angular
		.module("prostudyApp")
		.controller(
				"reportDisplayCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF,$stateParams) {

					$log.debug("reportDisplayCtr");
					
					$log.debug("$stateParams.newPresentCount:",$stateParams.newPresentCount); 
					$log.debug("$stateParams.newAbsentCount:",$stateParams.newAbsentCount);
					var count1 = $stateParams.newPresentCount;
					var count2 = $stateParams.newAbsentCount;

					
					
					$scope.loadChart = function() {
						google.charts.load('43', {packages: ['corechart']});
						google.charts.setOnLoadCallback(drawChart);						
					} 
					
					$scope.dataListFromServer = [
									          ['Attendance', 'Percentage'],
									          ['Present students',  count1],
									          ['Absent students',   count2],
									          
									        ];
					
					
					$scope.getNewDataFromServer = function() {
						//get data from server as per new selection/filter
						$scope.dataListFromServer = [
											          ['Attendance', 'Percentage'],
											          ['Present students',  40.0],
											          ['Absent students',   60.0],
											          
											        ];
						
						drawChart();
					}
					  
					  /*google.charts.load('current', {'packages':['corechart']});
				      google.charts.setOnLoadCallback(drawChart);*/
				      function drawChart() {

				        var data = google.visualization.arrayToDataTable($scope.dataListFromServer);

				        var options = {
				          title: 'Attendance Report',
				          is3D: true,
				        };

				        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

				        chart.draw(data, options);
				      }
				

				      $scope.loadChart();


				});