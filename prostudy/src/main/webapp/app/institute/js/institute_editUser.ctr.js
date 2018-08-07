angular
		.module("prostudyApp")
		.controller(
				"userEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF,
						tableTestDataFactory, $state, appEndpointSF,
						$stateParams) {

					$scope.selectedGFUserID = $stateParams.selectedGFUserID;
					console.log("$scope.selectedGFUserID"+$scope.selectedGFUserID);
					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.tempStudSub = {
						studID : "",
						subID : "",
						active : true
					};

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Student Updated!').position("top").hideDelay(
								3000));
					};
					$scope.currentInstID = $stateParams.currentInstID;
					$scope.selectedID = $stateParams.selectedID;
					
					$scope.selectedEmailID = $stateParams.selectedEmailID;				
					$log.debug("$scope.selectedEmailID"+$scope.selectedEmailID);

					
					$scope.flag1;
					$scope.role;
					
					
					$scope.getUser = function() {

						var UserService = appEndpointSF.getUserService();
						UserService.getUserByEmailID($scope.selectedEmailID).then(
								function(user) {
									$scope.user = user;
									
									$scope.role = $scope.user.role;
									if($scope.user.role=="Student")
									{																	
												$scope.getSubjectsByDivName();
												$scope.getSubjectsByStudentID();
												$scope.getSubByStudId();
												$scope.getAllSubByStudId();
											
									}
								});
					}

			
					$scope.updateUser = function() {
						
						if($scope.user.role=="Student")
						{
							$scope.checkForSubjectChange();
						}						
					
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.user).then(
								function(msgBean) {
									$scope.showSavedToast();
									$state.go("^", {});
								});

					}

					$scope.cancel = function() {
						$state.go("^", {});
					}

					$scope.changeRole = function() {

						if ($scope.curUser.role == $scope.role) {
							return $scope.flag1 = true;

						} else if ($scope.role == "Admin"
								&& $scope.curUser.role == "Teacher"
								|| $scope.curUser.role == "Student") {
							return $scope.flag1 = true;
						}

						else if ($scope.role == "Student"
								&& $scope.curUser.role == "Teacher"
								|| $scope.curUser.role == "Admin") {
							return $scope.flag1 = false;
						}

						else if ($scope.role == "Teacher"
								&& $scope.curUser.role == "Student") {
							return $scope.flag1 = true;
						}
					}
					$scope.subjectList = [];
					$scope.getSubjectsByDivName = function() {

						var DivisionService = appEndpointSF
								.getDivisionService();
						
						DivisionService
								.getSubjectsByDivName($scope.user.division)
								.then(
										function(subList) {
											$scope.subjectList = subList;
											for (var i = 0; i < $scope.subjectList.length; i++) {
												$scope.selectedSubjectsIndx
														.push(false);
											}
										});
					}

					$scope.getSubjectsByStudentID = function() {
						var StudentService = appEndpointSF.getStudentService();
						StudentService
								.getSubjectsByStudentID($scope.user.id)
								.then(
										function(subList) {
											$scope.selectedSubjectList = subList;

											for (var i = 0; i < $scope.subjectList.length; i++) {
												$scope.selectedSubjectsIndx[i] = appEndpointSF
														.getUtilityService()
														.objectArrayContains(
																$scope.selectedSubjectList,
																$scope.subjectList[i]);
											}
										});
					}
					$scope.selectedSubjectsIndx = [];

					$scope.toggleSelection = function toggleSelection(index) {
						$scope.selectedSubjectsIndx[index] = !$scope.selectedSubjectsIndx[index];
					};

					$scope.checkForSubjectChange = function() {
						var StudSubService = appEndpointSF.getStudSubService();
						$scope.tempStudSub.studID = $scope.user;

						for (var i = 0; i < $scope.selectedSubjectsIndx.length; i++) {

							/* If subject is selected now , which was not earlier and now Added.*/
							if ($scope.selectedSubjectsIndx[i]
									&& !appEndpointSF.getUtilityService()
											.objectArrayContains(
													$scope.selectedSubjectList,
													$scope.subjectList[i])) {
								$scope.tempStudSub.subID = $scope.subjectList[i];	
						
							if($scope.allStudSubListOfStudent.length > 0)
							{
									for (var k = 0; k < $scope.allStudSubListOfStudent.length; k++) {									
									
											$scope.isExist=false;									
									
										if ($scope.allStudSubListOfStudent[k].subID.id == $scope.tempStudSub.subID.id && $scope.allStudSubListOfStudent[k].studID.id == $scope.tempStudSub.studID.id) {
										
											$scope.isExist=true;
											var studSubToRemove = $scope.allStudSubListOfStudent[k];
											studSubToRemove.active=true;
											$scope.removeStudSubject(studSubToRemove);
											break;
										}						
									}		
									if($scope.isExist==false && k==$scope.allStudSubListOfStudent.length)	
									{
									StudSubService.addStudSubject($scope.tempStudSub).then(function(msgBean) {
											$scope.selectedSubjectList
													.push($scope.subjectList[i]);
										});		
							
									}														
									
							}else
								{  										
								StudSubService.addStudSubject($scope.tempStudSub).then(
										function(msgBean) {
											$scope.selectedSubjectList
													.push($scope.subjectList[i]);
										});		
							
							}
			
							}

						/* If subject was selected earlier and now removed.*/
							if (!$scope.selectedSubjectsIndx[i]
									&& appEndpointSF.getUtilityService()
											.objectArrayContains(
													$scope.selectedSubjectList,
													$scope.subjectList[i])) {
								
								for (var j = 0; j < $scope.selectedStudSubList.length; j++) {
									if ($scope.selectedStudSubList[j].subID.id == $scope.subjectList[i].id) {
										var studSubToRemove = $scope.selectedStudSubList[j];
										studSubToRemove.active = false;
										$scope.removeStudSubject(studSubToRemove);
										break;
									}
								}
							}
						}
					}

				
					/* Function for If subject was selected earlier and now removed.*/

					$scope.removeStudSubject = function(studSubToRemove) {	

						
						var StudSubService = appEndpointSF.getStudSubService();
						StudSubService
								.addStudSubject(studSubToRemove)
								.then(
										function(msgBean) {
											
										});
					}

					$scope.selectedStudSubList = [];
					$scope.getSubByStudId = function() {

						var StudSubService = appEndpointSF.getStudSubService();
						StudSubService
								.getSubByStudId($scope.user.id)
								.then(
										function(studsub) {
											$scope.selectedStudSubList = studsub;											
										});
					}
		
					
					$scope.getAllSubByStudId = function() {

						var StudSubService = appEndpointSF.getStudSubService();
						StudSubService.getAllSubByStudId($scope.user.id)
								.then(		function(studsub) {
											$scope.allStudSubListOfStudent = studsub;	
											
										});
					}
					
				
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getUser();							
							
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});


