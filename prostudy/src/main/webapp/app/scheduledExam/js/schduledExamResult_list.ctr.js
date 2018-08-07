angular
		.module("prostudyApp")
		.controller(
				"scheduledExamResultListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
									
					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
					$scope.selected = [];					
					
					$scope.selectedExamId= $stateParams.selectedExamId;
					$scope.selectedExamTitle= $stateParams.selectedExamTitle;
					
				
					
					$scope.getScheduledExamResultListByExamId = function() {

						var ScheduledExamResultService = appEndpointSF
								.getScheduledExamResultService();
						ScheduledExamResultService.getScheduledExamResultListByExamId($scope.selectedExamId).then(
								function(scheduledExamResultList) {
									$scope.scheduledExamResultList = scheduledExamResultList;
									
								});
					}	
					
					$scope.downloadResultList=function(){
						
						document.location.href="DownloadScheduledExamResult?selectedExamId="+$scope.selectedExamId;						
						
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
							  $scope.getScheduledExamResultListByExamId();  
						  } 
						  else {				 
						   $timeout($scope.waitForServiceLoad, 1000);
						  }
						 }
						  
						 $scope.waitForServiceLoad();
					
				
				});