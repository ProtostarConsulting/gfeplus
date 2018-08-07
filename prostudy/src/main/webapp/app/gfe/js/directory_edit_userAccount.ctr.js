angular
		.module("prostudyApp")
		.controller(
				"directoryEditUserAccountCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					
					
					$scope.loading = false;	
					$scope.checkConfirmPassword = appEndpointSF.getUtilityService().checkConfirmPassword;					
					$scope.selectedUser = $stateParams.selectedUser;					
					
					$scope.cancelButton = function() {
						$state.go("gfe.directoryUserList", {});
					}
					
				$scope.updateUser = function() {
					
					$scope.updating = true;
					$scope.loading = true;	
					
					var request = gapi.client.directory.users.update({userKey:$scope.selectedUser.primaryEmail},$scope.selectedUser);

					request.execute(function(resp) {
						$scope.updating = false;
						
						$scope.showUserUpdatedToast();
						$state.go("gfe.directoryUserList", {});
					});
				}
				$scope.showUserUpdatedToast = function() {
					$mdToast.show($mdToast.simple().content(
							'Selected User Updated Successfully!').position("top")
							.hideDelay(3000));
				};
			
				});