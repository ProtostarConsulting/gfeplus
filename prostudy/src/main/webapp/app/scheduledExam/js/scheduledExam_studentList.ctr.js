angular.module("prostudyApp").controller(
		"scheduledExamStudentListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$stateParams,
				$log, objectFactory, appEndpointSF) {			

			$scope.selectedExamId = $stateParams.selectedExamId;
			$scope.selectedExamTitle= $stateParams.selectedExamTitle;
			
			$scope.studentList=[];
			$scope.getStudentListByScheduledExamId = function() {

				var ScheduledStudentExamService = appEndpointSF.getScheduledStudentExamService();
				ScheduledStudentExamService.getStudentListByScheduledExamId($scope.selectedExamId)
						.then(
								function(studentList) {
									$scope.studentList = studentList.items;
									
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

					$scope.getStudentListByScheduledExamId();
					
				} else {
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}


			$scope.waitForServiceLoad();

		});