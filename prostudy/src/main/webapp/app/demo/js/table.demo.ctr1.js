angular.module('nutritionApp', [ 'ngMaterial', 'md.data.table', 'ngResource' ])

.controller(
		'nutritionController',
		[ '$q', '$scope', '$log', '$timeout', '$http', '$resource',
				function($q, $scope, $log, $timeout, $http, $resource) {

					$scope.dessertsAll = [];
					// $scope.desserts = [];
					$scope.init = function() {
						$log.debug("Init Called");
						/*
						 * $http.get("table_demo_data1.json").success(function(data) {
						 * $scope.desserts = data.items;
						 * //$log.debug("#$scope.desserts:" + $scope.desserts);
						 * });
						 */

						$resource("table_demo_data1.json").get(function(data) {
							// $scope.dessertsAll = data.items;
							$scope.desserts = data;
							$log.debug("$scope.desserts:" + $scope.desserts);
						});
					};

					// $log.debug("$scope.desserts:" + $scope.desserts);

					/*
					 * $scope.desserts = { "count" : 9, "data" : [ { "name" :
					 * "Frozen yogurt", "type" : "Ice cream", "calories2" : {
					 * "value" : 159.0 },
					 * 
					 * "fat" : { "value" : 6.0 },
					 * 
					 * "carbs" : { "value" : 24.0 },
					 * 
					 * "protein" : { "value" : 4.0 },
					 * 
					 * "sodium" : { "value" : 87.0 },
					 * 
					 * "calcium" : { "value" : 14.0 },
					 * 
					 * "iron" : { "value" : 1.0 } } ] };
					 */

					$scope.selected = [];

					$scope.query = {
						order : 'name',
						limit : 5,
						page : 1
					};

					$scope.types = [ 'Candy', 'Ice cream', 'Other', 'Pastry' ];

					$scope.getTypes = function() {
						return $scope.types;
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
					// initialize data
					$scope.init();
				} ]);