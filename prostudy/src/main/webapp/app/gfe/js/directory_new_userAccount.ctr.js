angular
		.module("prostudyApp")
		.controller(
				"directoryNewUserAccountCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					
					
					$scope.checkConfirmPassword = appEndpointSF
					.getUtilityService().checkConfirmPassword;					
					
					$scope.currentUserDomain = $stateParams.currentUserDomain;
			
					
				$scope.tempUser={
					'id':"",
					'name': {
					 'givenName': "",
					 'familyName': ""
					},
					'primaryEmail': "",					
					'password': ""	,
					'includeInGlobalAddressList': true			
					}			
		
				$scope.cancelButton = function() {
					$state.go("gfe.directoryUserList", {});
				}
								
				$scope.showNewUserAccountAddedToast = function() {
					$mdToast.show($mdToast.simple().content(
							'New User Account Added Successfully!').position("top")
							.hideDelay(3000));
				};
				$scope.createNewUserAccount = function(user) {	
					
					$log.debug(angular.toJson(user));
					$scope.creating = true;						
					user.primaryEmail=user.primaryEmail+"@"+$scope.currentUserDomain;
						
					var request = gapi.client.directory.users.insert(user);				
					request.execute(function(resp) {	
						$scope.creating = false;	
						
						$scope.tempUser={};
						$scope.showNewUserAccountAddedToast();
						$state.go("gfe.directoryUserList", {});
					});
				
				}	
			
				});