angular.module("prostudyApp").controller(
		"gfCourierModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside studentModuleCtr");

			$scope.studFlag = true;

			
			/* Setup menu */
			$scope.toggleRight = buildToggler('right');
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

			$scope.close = function() {
				$mdSidenav('right').close().then(function() {
					$log.debug("close RIGHT is done");
				});
			};
			
			
			$scope.back = function() {
				window.history.back();
				// $state.go("^", {});
			};

		});