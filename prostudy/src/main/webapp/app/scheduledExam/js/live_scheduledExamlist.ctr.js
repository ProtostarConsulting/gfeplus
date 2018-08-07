angular
		.module("prostudyApp")
		.controller(
				"liveScheduledExamListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
									
					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
					$scope.selected = [];
					$scope.liveScheduledExams=[];
					
					$scope.getScheduledExamListByStudentId = function() {

						var ScheduledStudentExamService = appEndpointSF.getScheduledStudentExamService();
						ScheduledStudentExamService.getScheduledExamListByStudentId($scope.curUser.id)
								.then(
										function(scheduledExams) {
											$scope.scheduledExams = scheduledExams.items;
											
											for(var i=0;i< $scope.scheduledExams.length;i++)
											{
												
											if (new Date($scope.scheduledExams[i].enddatentime) >= new Date() && new Date($scope.scheduledExams[i].startdatentime) <= new Date())
											{										
												$scope.liveScheduledExams.push($scope.scheduledExams[i]);
												
											}	
												}
											
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
					$scope.waitForServiceLoad = function() {
						  if (appEndpointSF.is_service_ready) {					  
							  $scope.getScheduledExamListByStudentId();  
						  } 
						  else {				 
						   $timeout($scope.waitForServiceLoad, 1000);
						  }
						 }
						  
						 $scope.waitForServiceLoad();
					
				
				});