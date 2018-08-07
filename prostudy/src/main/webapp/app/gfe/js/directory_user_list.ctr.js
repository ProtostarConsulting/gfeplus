angular
		.module("prostudyApp")
		.controller(
				"directoryUserListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,Upload, $mdDialog, $mdMedia,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
							
				$scope.loading = true;
				
				$scope.curUser = appEndpointSF.getLocalUserService()
				.getLoggedinUser();

				$scope.currentUserDomain = $scope.curUser.email_id
				.split("@")[1];
		
				$scope.directoryUserList=[];
				$scope.selected = [];
				$scope.query = {
					order : 'name',
					limit : 50,
					page : 1
				};
				
							
				
				$scope.onpagechange = function(page, limit) {
					var deferred = $q.defer();

					$timeout(function() {
						deferred.resolve();
					}, 2000);

					return deferred.promise;
				};			
				
				$scope.onorderchange = function(order) {
					var deferred = $q.defer();

					$timeout(function() {
						deferred.resolve();
					}, 2000);

					return deferred.promise;
				};
				
				$scope.createNewUserAccount = function(user) {	
					
					$log.debug(angular.toJson(user));
					$scope.creating = true;	
									
					var request = gapi.client.directory.users.insert(user);				
					request.execute(function(resp) {						
						$scope.showNewUserAccountAddedToast();
						
					});
				
				}
				
				$scope.showNewUserAccountAddedToast = function() {
					$mdToast.show($mdToast.simple().content(
							'New User Account Added Successfully!').position("top")
							.hideDelay(3000));
				};
				$scope.UplodeExcel = function(ev) {
					var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
							&& $scope.customFullscreen;
					$mdDialog
							.show(
									{
										controller : DialogController,
										templateUrl : '/app/gfe/directory_uploaduserlist.html',
										parent : angular.element(document.body),
										targetEvent : ev,
										clickOutsideToClose : true,
										fullscreen : useFullScreen,
										locals : {
											createUserRef: $scope.createNewUserAccount											
										}										
										
									})
							.then(
									function(answer) {
										$scope.status = 'You said the information was "'
												+ answer + '".';
									},
									function() {
										$scope.status = 'You cancelled the dialog.';
									});

				};

				function DialogController($scope, $mdDialog,createUserRef) {

					$scope.csvFile;
					$scope.uploadProgressMsg = null;
					
					$scope.uploadUserListCSV = function() {
						var csvFile = $scope.csvFile;
						Upload
								.upload(
										{
											url : 'UploadDirectoryUserListServlet',
											data : {
												file : csvFile,
											}
										})
								.then(
										function(resp) {
											$log.debug('Successfully uploaded '
															+ resp.config.data.file.name
															+ '.'
															+ angular
																	.toJson(resp.data));
											$scope.uploadProgressMsg = 'Successfully uploaded '
													+ resp.config.data.file.name
													+ '.';
											$mdToast.show($mdToast.simple()
															.content('User List Uploaded Sucessfully. The uploaded courses will be listed here after sometime. Please refresh the list.')
															.position("top")
															.hideDelay(3000));
											$scope.userList=resp.data;
						                   						                  			                    
						                    
						                    for(var i=0; i< $scope.userList.length;i++)
						                    	{		
							                    	var request = gapi.client.directory.users.insert($scope.userList[i]);				
							    					request.execute(function(resp) {						
							    						$log.debug('Added user:  ' + resp);						    						
							    					});						                    	   
						                    	}
						                    $mdDialog.hide();			                    
											$scope.csvFile = null;				
											
										},
										function(resp) {
											$log.debug('Error Ouccured, Error status: '
															+ resp.status);
											$scope.uploadProgressMsg = 'Error: '
													+ resp.status;
										},
										function(evt) {
											var progressPercentage = parseInt(100.0
													* evt.loaded
													/ evt.total);
											$log.debug('Upload progress: '
															+ progressPercentage
															+ '% '
															+ evt.config.data.file.name);
											$scope.uploadProgressMsg = 'Upload progress: '
													+ progressPercentage
													+ '% '
													+ evt.config.data.file.name;
											+'...'
										});
					};

				}
				
				$scope.deleteUser = function(primaryEmail) {					
					$scope.deleting = true;					
					$scope.loading = true;
					var request = gapi.client.directory.users.delete({userKey:primaryEmail});

					request.execute(function(resp) {						
						$scope.showUserDeletedToast();
						$scope.selected = [];
						$scope.getDirectoryUserList();						
					});
				}
				$scope.getDirectoryUserList= function() {	
					$scope.loading = true;
					var request = gapi.client.directory.users.list({domain:$scope.$parent.currentUserDomain,maxResults:'500'});				
					request.execute(function(resp) {
						if (resp.users.length > 0) {
							$scope.directoryUserList = resp.users; 
							$scope.$parent.directoryUserListBackup = $scope.directoryUserList;	
						} else {
							$log.debug('No users found.');
						}						
						// $scope.loading = false;
						$scope.$apply(function(){
							$scope.loading = false;
						});	
					});				
				}
				$scope.fitlerCompFn = function(actual, expected) {					
					return actual.indexOf(expected) > -1
				};
				$scope.showUserDeletedToast = function() {
					$mdToast.show($mdToast.simple().content(
							'Selected User Deleted Successfully!').position("top")
							.hideDelay(3000));
				};
				
				$scope.cancelButton = function() {
					$state.go("^", {});
				}
				
				if($scope.$parent.directoryUserListBackup === null){
					$scope.getDirectoryUserList();
				}
				else{
					$log.debug('Using Cached List of Dir Users ...');
					$scope.directoryUserList = $scope.$parent.directoryUserListBackup;
					$scope.loading = false;		
				}
			
				});