angular
		.module("prostudyApp")
		.controller(
				"updateMyProfileCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,
						$state, $mdDialog, $mdMedia, $stateParams) {

					$scope.flag = $stateParams.flag;
					$log.debug("$scope.flag :" + $scope.flag);

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Profile Updated!').position("top").hideDelay(
								3000));
					};
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.getUser = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByEmailID($scope.curUser.email_id)
								.then(
										function(user) {
											$scope.user = user;

											if ($scope.user.id != undefined) {

												$scope.tempUser = {
													id : $scope.user.id,
													instituteID : $scope.user.instituteID,
													prn : $scope.user.prn,
													isGoogleUser : $scope.user.isGoogleUser,
													firstName : $scope.user.firstName,
													lastName : $scope.user.lastName,
													email_id : $scope.user.email_id,
													address : $scope.user.address,
													contact : $scope.user.contact,
													role : $scope.user.role,
													password : $scope.user.password,
													authority : $scope.user.authority
												};
											} else {

												$scope.tempUser = {
													id : $scope.curUser.id,
													instituteID : $scope.curUser.instituteID,
													prn : $scope.curUser.prn,
													firstName : $scope.curUser.firstName,
													lastName : $scope.curUser.lastName,
													email_id : $scope.curUser.email_id,
													address : $scope.curUser.address,
													contact : $scope.curUser.contact,
													role : $scope.curUser.role,
													password : $scope.curUser.password,
													authority : [],
													myExams : [],
													myBooks : [],

												};
											}
										});
					}

					$scope.updateUser = function() {
						if ($scope.user.role == "Student") {
							$scope.tempUser.myExams = $scope.user.myExams;
							$scope.tempUser.myBooks = $scope.user.myBooks;
							$scope.tempUser.standard = $scope.user.standard;
							$scope.tempUser.division = $scope.user.division;
						}
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.tempUser).then(
								function(msgBean) {
									$scope.showSavedToast();
									$scope.tempUser = {};
									$state.go("home");
								});

					}

					$scope.skip = function() {
						$state.go("home");
					}

					$scope.showAdvanced = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/institute/changePwd.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {
												curUser : $scope.user
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
						$scope
								.$watch(
										function() {
											return $mdMedia('xs')
													|| $mdMedia('sm');
										},
										function(wantsFullScreen) {
											$scope.customFullscreen = (wantsFullScreen === true);
										});
					};

					function DialogController($scope, $mdDialog, curUser) {

						$scope.hide = function() {
							$mdDialog.hide();
						};
						$scope.cancel = function() {
							$mdDialog.cancel();
						};
						$scope.answer = function(answer) {
							$mdDialog.hide(answer);
						};

						$scope.inputType1 = 'password';
						$scope.inputType2 = 'password';

						$scope.setpassinput1 = function() {
							$scope.inputType1 = 'password';
						}
						$scope.showpass1 = function() {
							if ($scope.inputType1 == 'password') {
								$scope.inputType1 = 'text';
							} else {
								$scope.inputType1 = 'password';
							}

						}
						/*$scope.showpass2 = function() {
							if ($scope.inputType2 == 'password') {
								$scope.inputType2 = 'text';
							} else {
								$scope.inputType2 = 'password';
							}
						}
						
						
						$scope.setpassinput2 = function() {
							$scope.inputType2 = 'password';
						}
						*/
						
						$scope.setpassinput2 = function() {
							$scope.inputType2 = 'password';
						}
						$scope.showpass2 = function() {
							if ($scope.inputType2 == 'password') {
								$scope.inputType2 = 'text';
							} else {
								$scope.inputType2 = 'password';
							}

						}
						
						
						$scope.changepass = function() {

							if ($scope.newPassword == $scope.cPassword) {
								$scope.savemsg = true;
								$scope.checkpass = false;
							} else {
								$scope.checkpass = true;
								$scope.savemsg = false;
							}

							if ($scope.savemsg == true) {

							}
						}

						$scope.newPassword = "";
						$scope.cPassword = "";
						$scope.passCheckFlag = true;
						$scope.checkPass = function() {

							$log.debug("Come to checkPass");
							if ($scope.newPassword != $scope.cPassword) {
								$scope.passCheckError = "Re-entered password is not matched!";
								$scope.passCheckFlag = false;
								
							}else{
								$scope.passCheckError = "";
								$scope.passCheckFlag = true;
								
							}
						}

						
						$scope.updatePass = function() {	
								curUser.password = $scope.cPassword;
								var UserService = appEndpointSF
										.getUserService();
								UserService.updateUser(curUser).then(
										function(msgBean) {

											$scope.newPassword = "";
											$scope.cPassword = "";

											$timeout(function() {
											}, 1);
											$scope.showAlert();
										})
							}
/*							$scope.newPassword = "";
							$scope.cPassword = "";
							
							$scope.changePwdForm.$setPristine();
							$scope.changePwdForm.$setValidity();*/
						
						$scope.showAlert = function(ev) {
							$mdDialog
									.show($mdDialog
											.alert()
											.parent(
													angular
															.element(document
																	.querySelector('#popupContainer')))
											.clickOutsideToClose(true)
											.title('Message')
											.textContent(
													'Your Password has been chaneged successfully.')
											.ariaLabel('Alert Dialog Demo').ok(
													'OK!').targetEvent(ev));
						};
					}

					$scope.showConfirm = function(ev) {

						var confirm = $mdDialog.confirm().title(
								'Profile Updated Successfully !').targetEvent(
								ev).ok('OK')

						$mdDialog.show(confirm).then(function() {

						});
						$scope.updateUser();
						$state.reload();
						$state.go("home");
					};

					$scope.waitForServiceLoad = function() {

						$log.debug("inside, watiting...");
						if (appEndpointSF.is_service_ready) {

							$scope.getUser();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});
