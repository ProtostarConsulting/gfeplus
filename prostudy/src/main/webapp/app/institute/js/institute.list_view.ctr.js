angular
		.module("prostudyApp")
		.controller(
				"instituteListViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams,
						objectFactory) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.selectedInstituteID = $stateParams.selectedInstituteID;

					console.log("$scope.selectedGFUserID"
							+ $scope.selectedGFUserID);

					$scope.selectedStdID = $stateParams.selectedStdID;
					$scope.selectedDivID = $stateParams.selectedDivID;

					$scope.selectedStdName = $stateParams.selectedStdName;
					$scope.selectedDivName = $stateParams.selectedDivName;
					$scope.selectedSubName = $stateParams.selectedSubName;

					$scope.selectedSubId = $stateParams.selectedSubId;
					$scope.selectedSubjectId = $stateParams.selectedSubjectId;

					$scope.flag = false;
					$scope.flag3 = false;
					$scope.flag4 = true;
					$scope.isGoogleUser = false;
					$scope.checkConfirmPassword = appEndpointSF
							.getUtilityService().checkConfirmPassword;

					$scope.adminList = [];
					$scope.teacherList = [];
					$scope.studentList = [];

					$scope.standards = [];
					$scope.divisions = [];
					$scope.subjects = [];

					$scope.stdList;
					$scope.divList;
					$scope.subList;
					$scope.std;

					$scope.newField = {};
					$scope.editingStd = false;

					$scope.newDiv = {};
					$scope.editingDiv = false;

					$scope.newSub = {};
					$scope.editingSub = false;

					$scope.showUpdateSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Updated!').position("top")
								.hideDelay(3000));
					};
					$scope.showAdminSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Admin Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showTeacherSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Teacher Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showStudentSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Student Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Added successfully!').position("top")
								.hideDelay(3000));
					};

					$scope.tempStudent = objectFactory.newInstituteUser(
							"Student", $scope.selectedInstituteID,
							$scope.isGoogleUser);
					$scope.tempTeacher = objectFactory.newInstituteUser(
							"Teacher", $scope.selectedInstituteID,
							$scope.isGoogleUser);
					$scope.tempAdmin = objectFactory.newInstituteUser("Admin",
							$scope.selectedInstituteID, $scope.isGoogleUser);

					$scope.standard = {

						instituteID : $scope.selectedInstituteID,
						name : ""
					};

					$scope.division = {

						standardID : $scope.selectedStdID,
						name : ""
					};

					$scope.subjectList = [];
					$scope.addSubjects = function() {
						$scope.subjectList.push({
							'divisionID' : $scope.selectedDivID,
							'name' : $scope.name,

						});
						$scope.name = '';

					};

					$scope.addInstituteStandards = function() {
						var StudentService = appEndpointSF
								.getStudentService();

						StudentService.addStandards($scope.standard).then(
								function(msgBean) {

									$scope.currentStdID = msgBean.id;
									$scope.showSavedToast();

								});

					}
					$scope.addInstituteDivisions = function() {
						var StudentService = appEndpointSF
								.getStudentService();

						StudentService.addDivisions($scope.division).then(
								function(msgBean) {

									$scope.currentDivID = msgBean.id;
									$scope.division = {};
									$scope.showSavedToast();

								});

					}

					$scope.addInstituteSubjects = function() {
						var StudentService = appEndpointSF.getStudentService();
						$scope.currentDivID = $stateParams.currentDivID;

						for (i = 0; i < $scope.selectedSubjects.length; i++) {
							StudentService.addSubjects(
									$scope.selectedSubjects[i]).then(
									function(msgBean) {

									});
							$scope.showSavedToast();
							$scope.subjectList = [];
						}

					}

					$scope.addInstituteAdmins = function() {
						var UserService = appEndpointSF.getUserService();

						UserService.addUser($scope.tempAdmin).then(
								function(msgBean) {

								});

						$scope.showAdminSavedToast();
						$scope.cancelButton();

					}

					$scope.addInstituteTeachers = function() {
						var UserService = appEndpointSF.getUserService();

						UserService.addUser($scope.tempTeacher).then(
								function(msgBean) {
								});

						$scope.showTeacherSavedToast();
						$scope.cancelButton();
					}

					$scope.addInstituteStudents = function() {
						var UserService = appEndpointSF.getUserService();
						$scope.tempStudent.instituteID = $scope.selectedInstituteID;

						UserService
								.addUser($scope.tempStudent)
								.then(
										function(msgBean) {

											$scope.showStudentSavedToast();
											$state
													.go(
															"institute.studFillbasics",
															{
																currstud : msgBean,
																currentInstID : $scope.selectedInstituteID
															});
										});

					}
					$scope.showselectedInstitute = function() {
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService.getInstituteById(
								$scope.selectedInstituteID).then(
								function(institutes) {
									$scope.Institute = institutes;
								});
					}

					$scope.editInstitute = function() {
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService.editInstitute($scope.Institute).then(
								function(msgBean) {
									$scope.showUpdateSavedToast();
								});

						$state.go("institute.list_view");
					}
					$scope.users = [];
					$scope.getUserByInstitute = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByInstitute($scope.selectedInstituteID)
								.then(
										function(userList) {
											$scope.users = userList;

											for (var i = 0; i < $scope.users.length; i++) {
												if ($scope.users[i].role == "Admin") {
													$scope.adminList
															.push($scope.users[i]);

												} else if ($scope.users[i].role == "Teacher") {
													$scope.teacherList
															.push($scope.users[i]);

												} else if ($scope.users[i].role == "Student") {
													$scope.studentList
															.push($scope.users[i]);

												}
											}

										});
					}

					$scope.viewStandardByInstitute = function() {

						var StudentService = appEndpointSF
								.getStudentService();
						StudentService.getStandardByInstitute(
								$scope.selectedInstituteID).then(
								function(standardList) {

									$scope.viewstdList = standardList;

								});
					}

					$scope.viewDivisionByStandard = function() {

						$scope.std = $scope.selectedStdName;
						var StudentService = appEndpointSF
								.getStudentService();
						StudentService.getDivisionByStandard(
								$scope.selectedStdID).then(
								function(divisionList) {
									$scope.viewDivList = divisionList;

								});
					}

					$scope.viewSubjectByDivision = function() {

						var StudentService = appEndpointSF.getStudentService();
						StudentService.getSubjectByDivision(
								$scope.selectedDivID).then(
								function(subjectList) {
									$scope.viewSubList = subjectList;

								});
					}

					$scope.getStandardByInstitute = function() {

						var StudentService = appEndpointSF
								.getStudentService();
						StudentService
								.getStandardByInstitute(
										$scope.selectedInstituteID)
								.then(
										function(standardList) {
											for (var i = 0; i < standardList.length; i++) {
												$scope.standards
														.push(standardList[i].name);

											}
											$scope.stdList = standardList;

										});
					}

					$scope.getDivisionByStandard = function() {

						for (var i = 0; i < $scope.stdList.length; i++) {
							if ($scope.tempStudent.standard == $scope.stdList[i].name) {
								$scope.selectedStdID = $scope.stdList[i].id;
							}
						}
						var StudentService = appEndpointSF
								.getStudentService();
						StudentService
								.getDivisionByStandard($scope.selectedStdID)
								.then(
										function(divisionList) {
											for (var i = 0; i < divisionList.length; i++) {
												$scope.divisions
														.push(divisionList[i].name);
											}
											$scope.divList = divisionList;
										});
					}

					$scope.getSubjectByDivision = function() {

						for (var i = 0; i < $scope.divList.length; i++) {
							if ($scope.tempStudent.division == $scope.divList[i].name) {
								$scope.selectedDivID = $scope.divList[i].id;
							}
						}
						var StudentService = appEndpointSF.getStudentService();
						StudentService
								.getSubjectByDivision($scope.selectedDivID)
								.then(
										function(subjectList) {
											for (var i = 0; i < subjectList.length; i++) {
												$scope.subjects
														.push(subjectList[i].name);
											}

										});
						$scope.subjects.splice(0, $scope.subjects.length);
					}

					$scope.editStd = function(field) {
						$scope.editingStd = $scope.viewstdList.indexOf(field);
						$scope.newField = angular.copy(field);

					}

					$scope.saveField = function(index) {
						if ($scope.editingStd !== false) {
							$scope.viewstdList[$scope.editingStd] = $scope.newField;
							$scope.editingStd = false;
						}
					};

					$scope.cancel = function(index) {

						if ($scope.editingStd !== false) {
							$scope.viewstdList[$scope.editingStd] = $scope.newField;
							$scope.editingStd = false;
						}
					};

					$scope.updateStandard = function() {

						var StudentService = appEndpointSF
								.getStudentService();

						for (var i = 0; i < $scope.viewstdList.length; i++) {
							if ($scope.selectedStdID == $scope.viewstdList[i].id) {
								$scope.updatedval = $scope.viewstdList[i]
							}

						}
						StudentService.editStandard($scope.updatedval).then(
								function(msgBean) {
								});

					}

					$scope.editDiv = function(field) {
						$scope.editingDiv = $scope.viewDivList.indexOf(field);
						$scope.newDIv = angular.copy(field);

					}

					$scope.saveDiv = function(index) {
						if ($scope.editingDiv !== false) {
							$scope.viewDivList[$scope.editingDiv] = $scope.newDIv;
							$scope.editingDiv = false;
						}
					};

					$scope.cancelDiv = function(index) {

						if ($scope.editingDiv !== false) {
							$scope.viewDivList[$scope.editingDiv] = $scope.newDIv;
							$scope.editingDiv = false;
						}
					};

					$scope.updateDivision = function() {

						var StudentService = appEndpointSF
								.getStudentService();

						$scope.selectedDivisionId = $stateParams.selectedDivisionId;
						for (var i = 0; i < $scope.viewDivList.length; i++) {
							if ($scope.selectedDivisionId == $scope.viewDivList[i].id) {
								$scope.updatedval = $scope.viewDivList[i]
							}

						}

						StudentService.editDivision($scope.updatedval).then(
								function(msgBean) {
								});

					}

					$scope.editSub = function(field) {
						$scope.editingSub = $scope.viewSubList.indexOf(field);
						$scope.newSub = angular.copy(field);
					}

					$scope.saveSub = function(index) {
						if ($scope.editingSub !== false) {
							$scope.viewSubList[$scope.editingSub] = $scope.newSub;
							$scope.editingSub = false;
						}
					};

					$scope.cancelSub = function(index) {

						if ($scope.editingSub !== false) {
							$scope.viewSubList[$scope.editingSub] = $scope.newSub;
							$scope.editingSub = false;
						}
					};

					$scope.updateSubject = function() {

						var StudentService = appEndpointSF.getStudentService();

						for (var i = 0; i < $scope.viewSubList.length; i++) {
							if ($scope.selectedSubjectId == $scope.viewSubList[i].id) {
								$scope.updatedval = $scope.viewSubList[i]
							}

						}
						StudentService.editSubject($scope.updatedval).then(
								function(msgBean) {

								});

					}

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

					$scope.selected = [];

					$scope.cancelButton = function() {
						$state.go('^', {});
					};
					$scope.getStudentsBySubjectID = function() {
						var UserService = appEndpointSF.getUserService();
						UserService
								.getStudentsBySubjectID($scope.selectedSubId)
								.then(function(studList) {
									$scope.studentListBySubject = studList;
								});
					}
					if ($scope.selectedSubId != undefined) {
						$scope.getStudentsBySubjectID();
					}

					$scope.error = "";
					$scope.checkUserAlreadyExist = function(email_id) {
						if (email_id) {
							var UserService = appEndpointSF.getUserService();
							UserService
									.checkUserAlreadyExist(email_id)
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

					$scope.getPartnerByInstitute = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.getPartnerByInstitute(
								$scope.curUser.instituteID).then(
								function(pSchoolList) {

									$scope.pSchoolList = pSchoolList;

								});
					}

					$scope.logoURL;
					$scope.selectedInstituteID = $stateParams.selectedInstituteID;
					$scope.currUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					function showLogo() {

						$log.debug("$scope.currUser.instituteObj.logBlobKey==="
								+ $scope.currUser.instituteObj.logBlobKey);
						$scope.logoURL = '//' + window.location.host
								+ '/serve?blob-key='
								+ $scope.currUser.instituteObj.logBlobKey;
						$log.debug("$scope.logoURL==" + $scope.logoURL);

					}

					$scope.logBaseURL = '//' + window.location.host
							+ '/serve?blob-key='
							+ $scope.curUser.instituteObj.logBlobKey;

					$scope.curUser;
					$scope.getLogUploadURL = function() {
						var uploadUrlService = appEndpointSF
								.getuploadURLService();
						uploadUrlService.getLogUploadURL().then(function(url) {
							$scope.logUploadURL = url.msg;
							$scope.instID = $scope.curUser.instituteID;
						});

					}
					$scope.logUploadURL;

					$scope.uplodeimage = function() {
						/* action="{{logUploadURL}}" */
						document.imageform.action = $scope.logUploadURL;
						// calling servlet action
						document.imageform.submit();

						// $scope.getBusinessById();
					}
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							//$scope.getStandardByInstitute();
							$scope.getUserByInstitute();
							$scope.getPartnerByInstitute();
							$scope.getLogUploadURL();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();
				});
