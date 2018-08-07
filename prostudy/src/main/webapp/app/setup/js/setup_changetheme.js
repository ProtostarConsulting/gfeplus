angular.module("prostudyApp").controller(
		"changeThemeCtr1",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, $mdDialog, $mdMedia, $state,
				appEndpointSF) {

			$log.debug("Inside setup.changetheme Ctr...");
			
			
			
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			
			$scope.Institute = $scope.curUser.instituteObj;
			

			$scope.checkTheme = function(themeName) {
					$scope.changeTheme(themeName);
				}
			
			
			$scope.updateTheme = function(themeName) {
			//	var change = confirm("Are you sure to change theme ?");
				
					$scope.Institute.theme=themeName;
					var InstituteService = appEndpointSF.getInstituteService();
					InstituteService.updateInstitute($scope.Institute).then(
							function(msgBean) {
								$scope.showUpdateToast();
							});
					$scope.changeTheme(themeName);					
			
			}			
		});
