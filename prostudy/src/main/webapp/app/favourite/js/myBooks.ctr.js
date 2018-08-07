angular.module("prostudyApp").controller(
		"myBooksCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
			
		
			$scope.getMyBookList = function() {

				var UserService = appEndpointSF.getUserService();
			
				UserService.getMyBookList($scope.curUser.email_id).then(
						function(bookList) {

							$scope.books = bookList;

						});
			}

			$scope.books = [];
			$scope.getMyBookList();

			
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