angular
		.module("prostudyApp")
		.controller(
				"addInstituteUserCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, objectFactory,standardList) {

					$scope.checkConfirmPassword = appEndpointSF
							.getUtilityService().checkConfirmPassword;

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute User Saved!').position("top")
								.hideDelay(3000));
					};

					// $scope.curUser =
					// appEndpointSF.getLocalUserService().getLoggedinUser();
					$scope.standardList=standardList;
					$scope.instRoles = [ "Admin", "Teacher", "Student" ];
					$scope.tempUser = {
						isGoogleUser : false,
					};
					
					if($stateParams.selectedPSchool != undefined){
						$scope.tempUser.school= $stateParams.selectedPSchool?$stateParams.selectedPSchool:null;
					}
					
					if($stateParams.selectedPSchoolInstitute != undefined){
						$scope.tempUser.schoolInstitute= $stateParams.selectedPSchoolInstitute?$stateParams.selectedPSchoolInstitute:null;
					}
					
					$scope.addInstituteUsers = function() {
						var UserService = appEndpointSF.getUserService();
						$scope.tempUser.instituteID = $scope.curUser.instituteID;

						UserService.addUser($scope.tempUser).then(
								function(msgBean) {

								});
						$scope.instituteAddUserForm.$setPristine();
						$scope.instituteAddUserForm.$setValidity();
						$scope.instituteAddUserForm.$setUntouched();
						$scope.tempUser = {};
						$scope.showSavedToast();

					}

					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};

					$scope.cancelButton = function() {
						$state.go("^", {});
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
													// $scope.error = "User
													// Already Exists";
													$scope.instituteAddUserForm.email_id.$error.alreadyExists = true;
													$scope.instituteAddUserForm.email_id.$invalid = true;
													$scope.instituteAddUserForm.$invalid = true;
												} else {
													$scope.error = "";
													$scope.instituteAddUserForm.email_id.$error.alreadyExists = false;
													$scope.instituteAddUserForm.email_id.$invalid = false;
												}
											});
						}
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							// $scope.getInstitutes();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
				});

angular
		.module("prostudyApp")
		.directive(
				'proUserexists',
				function($log, $q, appEndpointSF) {
					return {
						restrict : 'A',
						require : 'ngModel',
						link : function($scope, $element, $attrs, ngModel) {
							$log.debug("Inside of proUserexists....");
							ngModel.$asyncValidators.userexists = function(
									modelValue) {
								var deferred = $q.defer();
								var UserService = appEndpointSF
										.getUserService();
								$log.debug("modelValue:" + modelValue);
								UserService
										.checkUserAlreadyExist(modelValue)
										.then(
												function(response) {
													$log
															.debug("Inside of userexists validator fn: " + response.bool);													
													if (response.bool == true) {
														deferred.reject();
													} else {
														deferred.resolve();
													}
												});
								return deferred.promise;
							}

						}
					};
				});
