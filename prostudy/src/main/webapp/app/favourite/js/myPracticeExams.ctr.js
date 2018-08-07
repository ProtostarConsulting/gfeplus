angular.module("prostudyApp").controller(
		"myPracticeExamsCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.exams = [];
			$scope.selected = [];
			$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
					
			$scope.getMyExamList = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getMyExamList($scope.curUser.email_id).then(
						function(examList) {
							$scope.exams = examList;
						});
			}		
			$scope.getMyExamList();
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