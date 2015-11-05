angular.module("stockApp").controller(
		"indexCtr",
		function($scope, $window, $log, $q, $timeout, $mdToast, $mdBottomSheet,$state, $http, $stateParams,
				appEndpointSF) {

			console.log("Inside indexCtr");

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Saved!')
						.position("top").hideDelay(3000));
			};

			// $window.initGAPI = function() {}
			$scope.initGAPI = function() {
				$log.debug("Came to initGAPI");
				// This will load all server side end points
				// $scope.loadAppGoogleServices();
				$timeout(
						function() {
							appEndpointSF
									.loadAppGoogleServices($q.defer())
									.then(
											function() {
												$log
														.debug("##########Loaded All Google Endpoint Services....#########");
											});
						}, 2000);

			};

			$scope.openBottomSheet = function() {
				$mdBottomSheet
						.show({
							template : '<md-bottom-sheet>Hello!</md-bottom-sheet>'
						});
			};

			// initialize local objects
			/*
			 * $scope.customer = $scope.newCustomer();
			 * $scope.customerList = {};
			 */
			$scope.initGAPI();

		}).controller('AppCtrl',
		function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
			$scope.toggleLeft = buildToggler('left');
			// $scope.toggleRight = buildToggler('right');
			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
			 */
			function buildToggler(navID) {
				var debounceFn = $mdUtil.debounce(function() {
					$mdSidenav(navID).toggle().then(function() {
						$log.debug("toggle " + navID + " is done");
					});
				}, 200);
				return debounceFn;
			}
		}).controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
	$scope.close = function() {
		$mdSidenav('left').close().then(function() {
			$log.debug("close LEFT is done");
		});
	};
});