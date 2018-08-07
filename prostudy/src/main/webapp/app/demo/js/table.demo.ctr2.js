angular.module('nutritionApp', [ 'ngMaterial', 'md.data.table', 'ngResource' ])

.controller(
		'nutritionController',
		[
				'$q',
				'$scope',
				'$log',
				'$timeout',
				'$http',
				'$resource',
				function($q, $scope, $log, $timeout, $http, $resource) {

					$scope.init = function() {
						$log.debug("Inside Init");

						$http.get("table_demo_data2.json").success(
								function(data) {
									$scope.items = data.items;
									$log.debug("$scope.items:" + $scope.items);
									$log.debug("$scope.items.length:" + $scope.items.length);
								});

						/*
						 * $resource("table_demo_data2.json").get(function(data) { //
						 * $scope.dessertsAll = data.items; $scope.items =
						 * data.items; $log.debug("$scope.desserts:" +
						 * $scope.desserts); });
						 */
					};

					$scope.selected = [];

					$scope.query = {
						order : 'name',
						limit : 5,
						page : 1
					};

					/*$scope.types = [ 'Candy', 'Ice cream', 'Other', 'Pastry' ];

					$scope.getTypes = function() {
						return $scope.types;
					};*/

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
					// initialize data
					$scope.init();
				} ]);