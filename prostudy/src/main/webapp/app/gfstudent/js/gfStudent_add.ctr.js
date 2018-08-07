angular
		.module("prostudyApp")
		.controller(
				"gfStudentAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, objectFactory, answerOfMediumList,
						standardList) {

					$scope.answerOfMediumList = answerOfMediumList;
					$scope.standardList = standardList

					$scope.tempStudent = {
						fName : '',
						mName : '',
						lName : '',
						standard : '',
						mediumOfAnswer : '',
						gender : '',
						school : '',
						role : 'Student'
					}

					$scope.selectedGFStudID = $stateParams.selectedGFStudID;

					$scope.addGFStudent = function() {
						$scope.tempStudent.instituteID = $scope.curUser.instituteID;

						var gfStudentService = appEndpointSF
								.getGFStudentService();

						if (!$scope.selectedGFStudID) {
							if ($scope.pSchoolList.length == 1) {
								$scope.tempStudent.school = $scope.pSchoolList[0];
							} else {
								for (var i = 0; i < $scope.pSchoolList.length; i++) {
									if ($scope.pSchoolList[i].schoolName == $scope.tempStudent.school.schoolName)
										$scope.tempStudent.school = $scope.pSchoolList[i];
								}
							}
						} else {
							for (var i = 0; i < $scope.pSchoolList.length; i++) {
								if ($scope.pSchoolList[i].schoolName == $scope.tempStudent.school.schoolName)
									$scope.tempStudent.school = $scope.pSchoolList[i];
							}
						}
						gfStudentService.addGFStudent($scope.tempStudent).then(
								function(resp) {
									$scope.gfStudentForm.$setPristine();
									$scope.gfStudentForm.$setValidity();
									$scope.gfStudentForm.$setUntouched();
									$scope.tempStudent = {};

									
									if (resp.code == 400 || resp.code == 500) {
										$scope.show400Toast();
									} else {
										if ($scope.selectedGFStudID == "") {
											$scope.showAddToast();
											$state.reload();

										} else {
											$scope.showUpdateToast();
											$state.go('studentModule.list');
										}
									}
								});
					}

					$scope.getGFStudentById = function() {

						var gfStudentService = appEndpointSF
								.getGFStudentService();
						gfStudentService.getGFStudentById(
								$scope.selectedGFStudID).then(
								function(tempStudent) {
									$scope.tempStudent = tempStudent;
									// $scope.tempStudent.schoolName =
									// $scope.tempStudent.schoolName.schoolName;
								});
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

					$scope.cancel = function() {
						$state.go('gandhifoundation');
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							if ($scope.selectedGFStudID != "") {
								$scope.getGFStudentById();
							}
							$scope.getPartnerByInstitute();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};
					$scope.cancelButton = function() {
						$state.go("studentModule", {});
					}
				});
