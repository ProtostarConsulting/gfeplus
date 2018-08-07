angular.module("prostudyApp").controller(
		"partnerSchoolModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside chapterModuleCtr");

			$scope.testGAPICall = function() {
				console.log("in side testGAPICall");
				var cars = appEndpointSF.getQuestionService().getCars()
						.execute(function(resp) {
							$log.debug("debug resp:" + resp);
							$log.info("info resp:" + resp);
							$log.warn("warn resp:" + resp);
							//$log.error("error resp:" + resp);
							var items = resp.items;
							$log.debug("cars:" + resp.items);

						});

			};

			/* Setup page menu */
			$scope.toggleRight = buildToggler('right');
		
			function buildToggler(navID) {
				var debounceFn = $mdUtil.debounce(function() {
					$mdSidenav(navID).toggle().then(function() {
						$log.debug("toggle " + navID + " is done");
					});
				}, 200);
				return debounceFn;
			}

			$scope.back = function() {
				window.history.back();
				// $state.go("^", {});
			};
			$scope.close = function() {
				$mdSidenav('right').close().then(function() {
					$log.debug("close RIGHT is done");
				});
			};

		});