angular.module("prostudyApp").controller(
		"userViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF, tableTestDataFactory,$state,
				appEndpointSF,$stateParams) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Student Data Saved!')
						.position("top").hideDelay(3000));
			};
		  
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();			
			$scope.selectedInstituteID=$scope.curUser.instituteID;
			
			if($stateParams.selectedInstituteID)
			{
				$scope.selectedInstituteID = $stateParams.selectedInstituteID;
			}
			
			$log.debug("$scope.selectedInstituteID :"+$scope.selectedInstituteID)
			$scope.selectedID = $stateParams.selectedID;
			$scope.user = [];
			
			$scope.getUsers = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByInstitute($scope.selectedInstituteID)
						.then(
								function(userList) {
									$scope.users = userList;
									for(i=0;i<$scope.users.length;i++)
										{
											if($scope.selectedID == $scope.users[i].id)
												{
													$scope.user.push($scope.users[i]);
													if($scope.user.role="Student")
													{$scope.getSubjectsByStudentID();}
												}
										}
									
								});
			}
			
			$scope.subjects=[];
			$scope.getSubjectsByStudentID = function() {
				var StudentService = appEndpointSF.getStudentService();
				StudentService.getSubjectsByStudentID($scope.selectedID).then(
						function(subList) {
							$scope.subjects = subList;							
						});
			}
			
			
			$scope.cancel = function() {
				$state.go("^", {});
			}
			$scope.waitForServiceLoad = function() {
				  if (appEndpointSF.is_service_ready) {					  
					  $scope.getUsers();	  
				  } 
				  else {
				   $log.debug("Services Not Loaded, watiting...");
				   $timeout($scope.waitForServiceLoad, 1000);
				  }
				 }				  
				 $scope.waitForServiceLoad();
			

			
		});
