angular.module("prostudyApp").controller(
		"studentScheduledExamListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$stateParams,
				$log, objectFactory, appEndpointSF) {			

			$scope.selectedStudId = $stateParams.selectedStudId;
			$scope.scheduledExams=[];
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			
			$log.debug("$scope.curUser.id"+$scope.curUser.email_id);
			
			$scope.getScheduledExamListByStudentId = function() {

				var ScheduledStudentExamService = appEndpointSF.getScheduledStudentExamService();
				ScheduledStudentExamService.getScheduledExamListByStudentId($scope.selectedStudId)
						.then(
								function(scheduledExams) {
									$scope.scheduledExams = scheduledExams.items;
									
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
					
				} else {
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}


			$scope.waitForServiceLoad();

		});