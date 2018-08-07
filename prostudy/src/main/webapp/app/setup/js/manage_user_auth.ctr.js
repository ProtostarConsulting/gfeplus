angular
		.module("prostudyApp")
		.controller(
				"manageUserAuthCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $stateParams, $mdConstant,
						objectFactory, appEndpointSF) {
					$log.debug("Inside manageUserAuthCtr");
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.authChipSepKeys = [ $mdConstant.KEY_CODE.ENTER,
							$mdConstant.KEY_CODE.COMMA ];

					$scope.selectedUserEmailId = $stateParams.selectedUserEmailId;

					if (!$scope.selectedUserEmailId) {
						return;
					}

					$scope.authorizationMasterEntity = {
						authorizations : []
					};
					$scope.instituteAuthMasterEntity = {
						authorizations : []
					};

					$scope.institute = $scope.curUser.instituteObj;

					if ($scope.curUser.instituteObj.authorizations) {
						$scope.existingInstituteAuthObject = angular
								.fromJson($scope.curUser.instituteObj.authorizations);
					} else {
						$scope.existingInstituteAuthObject = {
							authorizations : []
						};
					}

					$log.debug("$scope.curUser.instituteObj.authorizations: "
							+ $scope.curUser.instituteObj.authorizations);

					$scope.selectedUser = null
					$scope.userAuthObject = null;

					function getAuthorizationMasterEntity() {
						var authService = appEndpointSF
								.getAuthorizationService();
						authService
								.getAuthorizationMasterEntity()
								.then(
										function(result) {
											$log.debug("result:" + result);
											if (result
													&& result.authorizations != undefined) {
												$scope.authorizationMasterEntity.authorizations = result.authorizations;

												$scope.instituteAuthMasterEntity = authService
														.filterMasterAuthTree(
																$scope.authorizationMasterEntity,
																$scope.existingInstituteAuthObject,
																$scope.instituteAuthMasterEntity);

												var UserService = appEndpointSF
														.getUserService();
												UserService
														.getUserByEmailID(
																$scope.selectedUserEmailId)
														.then(
																function(user) {
																	$scope.selectedUser = user;
																	$scope.selectedUser.authority = ($scope.selectedUser.authority && angular
																			.isArray($scope.selectedUser.authority)) ? $scope.selectedUser.authority
																			: [];
																	$log
																			.debug("user.authorizations: "
																					+ user.authorizations);
																	var jsonUserAuthObject = angular
																			.fromJson(user.authorizations);
																	$scope.userAuthObject = jsonUserAuthObject;
																	if (user.authorizations) {
																		$scope.instituteAuthMasterEntity = authService
																				.markSelectedAuthorizations(
																						$scope.instituteAuthMasterEntity,
																						$scope.userAuthObject);
																	}
																});

											}
											$scope.mode = "list";
										});

						$log.debug("End of getAuthorizationMasterEntity...");

					}

					$scope.saveAuthorization = function() {

						$log.debug("Called saveAuthorization...");
						var authService = appEndpointSF
								.getAuthorizationService();

						var toSaveJsonString = angular
								.toJson(authService
										.getCurrentSelectedAuthorizations($scope.instituteAuthMasterEntity));

						$log.debug("toSaveJsonString: " + toSaveJsonString);

						$scope.selectedUser.authorizations = toSaveJsonString;

						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.selectedUser).then(
								function(user) {
									$scope.showUpdateToast();
								});

					}

					$scope.cancelButton = function() {
						$scope.back();
						// $state.go("^", {});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							getAuthorizationMasterEntity();

						} else {
							$log
									.debug("proAdminManageInstituteAuth: Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();

					$scope.selected = []
					$scope.query = {
						order : 'id',
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

				});