angular.module("prostudyApp").controller(
		"examDemoModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};
			
			$log.debug("Inside examDemoModuleCtr");
			$scope.tempInternet = {
					internet_name:"",
					data_plan : "",
					cost:""				
				};
			$scope.addInternet = function() {
				
				var internetService = appEndpointSF.getInternetService();
				
				internetService.addInternet($scope.tempInternet).then(
						function(msgBean) {
						
							$log.debug("Inside Ctr examDemoModuleCtr");
							$scope.showSavedToast();
							$scope.tempInternet = {
									internet_name:"",
									data_plan : "",
									cost:""				
								};
				
						});
							}
			$scope.getInternet = function() {

				var internetService = appEndpointSF.getInternetService();
				internetService.getInternet().then(function(internetList) {
					$log.debug("Inside Ctr getInternetService");
					$scope.internet = internetList;
				});
			}
		
				$scope.fetchNewInternet = function() {

				var internetService = appEndpointSF.getInternetService();
				internetService.fetchNewInternet().then(function(internetList) {
					
					$scope.Internetdetails = internetList;
				});
			}
			
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

		});