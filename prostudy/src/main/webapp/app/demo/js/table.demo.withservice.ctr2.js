angular.module('prostudyApp').controller(
		'nutritionController',
		[
				'$q',
				'$scope',
				'$log',
				'$timeout',
				'tableTestDataFactory',

				function($q, $scope, $log, $timeout, tableTestDataFactory) {

					$log.debug("inside ctr before service get $scope.items:"
							+ $scope.items);
					// $scope.items =
					// tableTestDataFactory.getDessertList();
					$scope.items = tableTestDataFactory.getDessertList().then(
							function(data) {
								$scope.items = data;
								$log.debug("inside ctr then $scope.items:"
										+ $scope.items);
							});

					$log.debug("inside ctr after service get $scope.items:"
							+ $scope.items);

					$scope.selected = [];

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

				} ]);