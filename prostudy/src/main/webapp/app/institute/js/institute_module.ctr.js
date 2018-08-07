angular.module("prostudyApp").controller(
		"instituteModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {
		
		     
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("Inside instituteModuleCtr");
			
			$scope.check = function()
			{
				 var str = $scope.curUser.email_id;
				 var val1 = str.search("protostarcs.com");
				 var val2 = str.search("protostar.co.in");
				 if(val1 > 0 || val2 > 0)
					{
					 	return true;
					}
				 else
					 {
					 	return false;
					 }
				
			}
		

			$scope.testGAPICall = function() {
				console.log("in side testGAPICall");
				var cars = appEndpointSF.getQuestionService().getCars()
						.execute(function(resp) {
							$log.debug("debug resp:" + resp);
							$log.info("info resp:" + resp);
							$log.warn("warn resp:" + resp);
							// $log.error("error resp:" + resp);
							var items = resp.items;
							$log.debug("cars:" + resp.items);

						});

			};
			
	
			/* Setup page menu */
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