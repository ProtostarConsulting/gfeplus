/*angular.module("prostudyApp").controller(
		"myProfileCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q,tableTestDataFactory,$state) {

			console.log("Inside myProfileCtr");
			$scope.isCancelMyProfile = false;
			$scope.iseditMyProfile = true;
		   
			
			$scope.loadStudentList = function() 
			{	
				$("#isCancelMyProfile").hide();
				console.log("loadStudentList");
				 
				tableTestDataFactory.getMyProfileList().then(
							function(data) {
								$scope.student = data;
								$scope.stud = $scope.student[0];
								$log.debug("inside ctr then $scope.student "+ $scope.stud.firstName);
							});//end of tableTestDataFactory

			
							$scope.modify = function(selectedStudent) 
								{
									$scope.edit = true;
										
									$scope.iseditMyProfile = true;
									$scope.isCancelMyProfile = false;
							
									$scope.editRecord= angular.copy($scope.student[0]);
									console.log("EditRecord"+  $scope.editRecord.firstName);
										
									$log.debug("Student" + $scope.student[0].firstName);  
									$scope.stud = selectedStudent;
										
									$log.debug("Stud" + $scope.stud.firstName); 
									
								
								};

									$scope.update = function()
									{
									$scope.edit  = false;
									
									};// end of update
									
									$scope.cancelButton = function()
									{
										$scope.edit  = false;
										$log.debug("inside cancelButton");	
										angular.copy($scope.editRecord,$scope.stud);
										$log.debug("editRecordStud cancelButton" + $scope.stud.firstName); 
										angular.copy($scope.stud,$scope.editRecord);
										$scope.iseditMyProfile = false;
										$scope.isCancelMyProfile = true;
									};//end of cancelButton
									
						};// end of loadStudentList
			
		$scope.loadStudentList();

		});// end of myprofile ctr

*/


angular.module("prostudyApp").controller(
		"myProfileCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q,tableTestDataFactory,appEndpointSF,$state) {
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('login Saved!')
						.position("top").hideDelay(3000));
			};
			
			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();
			

			$scope.tempUser = {
					userId : "",
					name : "",
					userName : "",
					email_id : "",
					address : "",
					contact : "",
					pwd : "",	
					role : ""
					
				};
			
			$scope.addUser = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.addUser($scope.tempUser).then(function(msgBean) {
					$log.debug("No6");
					$log.debug("Inside Ctr addLogin");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSavedToast();
					$scope.tempUser = {
							userId : "",
							name : "",
							userName : "",
							email_id : "",
							address : "",
							contact : "",
							pwd : "",
							role : ""
							
						};
				});
				$log.debug("No4");
			}

			$scope.getUser = function() {
				var UserService = appEndpointSF.getUserService();

				UserService.getUsers().then(function(userList) {
					$log.debug("Inside Ctr getLogin");
					$scope.users = userList;
				});
			}

			
		
			$scope.update = function() {
				var UserService = appEndpointSF.getUserService();
				
				UserService.updateProfile($scope.curUser).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr updateSyllabus");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
					});
				
			}
			
			$scope.getUser();

		});// end of myprofile ctr

