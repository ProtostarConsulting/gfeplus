angular
		.module("prostudyApp")
		.controller(
				"editInstituteCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, objectFactory) {

					$scope.checkConfirmPassword = appEndpointSF
							.getUtilityService().checkConfirmPassword;

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute User Saved!').position("top")
								.hideDelay(3000));
					};
					$scope.showSavedToast1 = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Updated!').position("top")
								.hideDelay(3000));
					};

					$scope.curUser;

					// $scope.curUser =
					// appEndpointSF.getLocalUserService().getLoggedinUser();
					$scope.instRoles = [ "Admin", "Teacher", "Student" ];
					$scope.tempUser = {
						isGoogleUser : false
					};

					$scope.getInstituteByCurrentUser = function() {
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService
								.getInstituteByCurrentUser(
										$scope.curUser.instituteID)
								.then(
										function(institute) {
											$scope.tempInstitute = institute;
											$scope.tempInstitute.phone_no = parseInt($scope.tempInstitute.phone_no);
											//$scope.account = $scope.tempInstitute.accounttype.accountName;
										});
					}

					$scope.tempInstitute = {};
					$scope.updateInstitute = function() {
						var InstituteService = appEndpointSF
								.getInstituteService();

						InstituteService.updateInstitute($scope.tempInstitute)
								.then(function(msgBean) {

									$scope.showSavedToast1();
								})
						$scope.editInstituteForm.$setPristine();
						$scope.editInstituteForm.$setValidity();
						$scope.editInstituteForm.$setUntouched();
					}

					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};

					$scope.cancelButton = function() {
						$state.go("^", {});
					}

					$scope.accountTypes = [];
					$scope.getAllAccountTypes = function() {

						$scope.selection = [];
						var UserService = appEndpointSF.getUserService();
						UserService.getAllAccountTypes().then(
								function(planList) {
									$scope.accountTypes = planList.items;
								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getInstituteByCurrentUser();
							$scope.getAllAccountTypes();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
				});
