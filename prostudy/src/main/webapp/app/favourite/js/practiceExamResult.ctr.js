angular.module("prostudyApp").controller(
		"practiceExamResultCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$filter,$stateParams) {

			$scope.curuser=appEndpointSF.getLocalUserService().getLoggedinUser();
			$scope.results = [];
			
			$scope.selectedStudEmail = $stateParams.selectedStudEmail; 

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};

			
			$scope.getPracticeExamResultbyEmail = function() {

				var PracticeExamService = appEndpointSF
						.getPracticeExamService();

				PracticeExamService.getPracticeExamResultbyEmail($scope.selectedStudEmail)
						.then(
								function(practiceExamResultList) {

									$scope.results = practiceExamResultList;
									
							});
			}
			
			$scope.waitForServiceLoad = function() {
				  if (appEndpointSF.is_service_ready) {					  
					  $scope.getPracticeExamResultbyEmail(); 
				  } 
				  else {				 
				   $timeout($scope.waitForServiceLoad, 1000);
				  }
				 }
				  
				 $scope.waitForServiceLoad();

			$scope.getPracticeExamResultbyEmail();
			
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
