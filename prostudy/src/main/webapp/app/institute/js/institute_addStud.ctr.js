angular
		.module("prostudyApp")
		.controller(
				"instituteAddStudCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams) {

					$scope.showStudentSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Student Added!').position("top")
								.hideDelay(3000));
					};

					// $scope.currentInstID = $stateParams.currentInstID;;

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$scope.isGoogleUser = false;
					$scope.flag3 = true;

					$scope.checkConfirmPassword = appEndpointSF
							.getUtilityService().checkConfirmPassword;

					$scope.currentInstID = $scope.curUser.instituteID;

					if ($stateParams.currentInstID) {
						$scope.currentInstID = $stateParams.currentInstID;

					}
					$scope.tempStudent = {
						'instituteID' : $scope.currentInstID,
						'institute' : "",
						'firstName' : "",
						'lastName' : "",
						'email_id' : "",
						'address' : "",
						'contact' : "",
						'role' : "Student",
						'standard' : "",
						'division' : "",
						'subject' : "",
						'password' : "",
						'authority':[],
						'isGoogleUser' : $scope.isGoogleUser
					};

					$scope.error = "";
					$scope.checkUserAlreadyExist = function() {
						if ($scope.tempStudent.email_id) {
							var UserService = appEndpointSF.getUserService();
							UserService
									.checkUserAlreadyExist(
											$scope.tempStudent.email_id)
									.then(
											function(response) {
												if (response.bool == true) {
													$scope.error = "User Already Exists";
													angular
															.element(document
																	.getElementById('firstName'))[0].disabled = true;
													angular
															.element(document
																	.getElementById('lastName'))[0].disabled = true;
													angular
															.element(document
																	.getElementById('address'))[0].disabled = true;
													angular
															.element(document
																	.getElementById('contact'))[0].disabled = true;
													angular
															.element(document
																	.getElementById('password'))[0].disabled = true;
													angular
															.element(document
																	.getElementById('Confirmpassword'))[0].disabled = true;
													angular
															.element(document
																	.getElementById('addButton'))[0].disabled = true;
												} else {
													$scope.error = "";
													angular
															.element(document
																	.getElementById('firstName'))[0].disabled = false;
													angular
															.element(document
																	.getElementById('lastName'))[0].disabled = false;
													angular
															.element(document
																	.getElementById('address'))[0].disabled = false;
													angular
															.element(document
																	.getElementById('contact'))[0].disabled = false;
													angular
															.element(document
																	.getElementById('password'))[0].disabled = false;
													angular
															.element(document
																	.getElementById('Confirmpassword'))[0].disabled = false;
													angular
															.element(document
																	.getElementById('addButton'))[0].disabled = false;
												}
											});
						}
					}

					$scope.currentStdID = $stateParams.currentStdID;
					$scope.currentDivID = $stateParams.currentDivID;

					$scope.isDisabled = false;
					$scope.disableButton = function() {
						$scope.isDisabled = true;
					}

					$scope.addInstituteStudents = function() {
						var UserService = appEndpointSF.getUserService();

						UserService
								.addUser($scope.tempStudent)
								.then(
										function(msgBean) {
											if (msgBean.email_id == undefined) {
												//Show error on page. "There was problem saving data on Server. Please contact you Admin."
												$log.debug("Error Msg: " + msgBean);
											} else {
												$scope.email_id = msgBean.email_id;
												$log.debug("msgBean  :"+ msgBean);
												$log.debug("$scope.email_id"+ $scope.email_id);
												$state.go("institute.studFillbasics",
																{
																	currstud : msgBean,
																	currentInstID : $scope.currentInstID
																});
											}
										});
						$scope.showStudentSavedToast();

					}

					$scope.standard = {

						instituteID : $scope.currentInstID,
						name : ""
					};

					$scope.division = {

						standardID : $scope.currentStdID,
						name : ""
					};

					$scope.subjectList = [];
					$scope.addSubjects = function() {
						$scope.subjectList.push({
							'divisionID' : $scope.currentDivID,
							'name' : $scope.name,

						});
						$scope.name = '';

					};

					$scope.query = {
						order : 'description',
						limit : 5,
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
					
					
					$scope.getPartnerByInstitute = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.getPartnerByInstitute(
								$scope.curUser.instituteID).then(
								function(pSchoolList) {

									$scope.pSchoolList = pSchoolList;
									
								});
					}
					
					
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getPartnerByInstitute();
							
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});
