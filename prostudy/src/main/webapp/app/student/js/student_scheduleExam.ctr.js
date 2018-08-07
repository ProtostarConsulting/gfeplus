angular
		.module("prostudyApp")
		.controller(
				"studentscheduleExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,
						$state, $stateParams, installmentList) {
					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

	
				
					$scope.cancelButton = function() {
						$state.go("^", {});
					}

				});
