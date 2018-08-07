angular
		.module("prostudyApp")
		.controller(
				"initsetup",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, $http, objectFactory,
						appEndpointSF) {
					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};
					$scope.userMsg;
					$scope.step2;
					$scope.createAccountTypes_Bool = true;
					$scope.createUsers_Bool = false;
					$scope.createAuthMaster_Bool = true;

					$scope.createAccountTypes = function() {

						var protostarAdminService = appEndpointSF
								.getProtostarAdminService();
						protostarAdminService
								.getallAccountType()
								.then(
										function(gotAccountList) {

											$scope.accountlist = (gotAccountList == undefined || gotAccountList.items == undefined) ? 0
													: gotAccountList.items.length;
											if ($scope.accountlist == 0) {
												protostarAdminService
														.createAccountPlanTypes()
														.then(
																function(
																		msgBean) {
																	$scope.createAccountTypes_Bool = false;
																	$scope.createUsers_Bool = true;
																	$scope.userMsg = "Account types are created. ";
																});
											} else {
												$scope.createAccountTypes_Bool = false;
												$scope.createUsers_Bool = true;
												$scope.userMsg = "Account types are already created. No action was taken.";
											}

										});
					}

					$scope.createUsers = function() {
						var protostarAdminService = appEndpointSF
								.getProtostarAdminService();
						protostarAdminService
								.getallAccountType()
								.then(
										function(gotAccountList) {
											$scope.accountlist = (gotAccountList == undefined || gotAccountList.items == undefined) ? 0
													: gotAccountList.items.length;

											protostarAdminService
													.getAllemp()
													.then(
															function(gotEmpList) {
																$scope.emps = (gotEmpList == undefined || gotEmpList.items == undefined) ? 0
																		: gotEmpList.items.length;

																if ($scope.emps == 0) {
																	protostarAdminService
																			.createUsers()
																			.then(
																					function(
																							msgBean) {
																						$scope.userMsg = "Users created successfully.";
																						$scope.createUsers_Bool = false;
																					});
																} else {
																	$scope.userMsg = "Users are already created. No action was taken.";
																	$scope.createUsers_Bool = false;
																}

															});

										});
					}

					$scope.createAuthMaster = function() {

						$scope.authorizationMasterEntity = {
							authorizations : []
						};

						/*
						 * $scope.authorizationMasterEntity = { authorizations : [ {
						 * "authName" : "home", "authDisplayName" : "Home",
						 * "uiStateName" : "home", "orderNumber" : "0" }, {
						 * "authName" : "setup", "authDisplayName" : "Setup",
						 * "uiStateName" : "setup", "orderNumber" : "2" }, {
						 * "authName" : "proadmin", "authDisplayName" :
						 * "Proadmin", "uiStateName" : "proadmin", "orderNumber" :
						 * "1" } ] };
						 */
						var authService = appEndpointSF
								.getAuthorizationService();

						authService
								.getAuthorizationMasterEntity()
								.then(
										function(result) {
											$log.debug("get result:"
													+ angular.toJson(result));
											if (result.authorizations == undefined
													|| result.authorizations.length == 0) {

												$http
														.get(
																"/app/initsetup/js/masterauth.json")
														.then(
																function(
																		response) {
																	$log
																			.debug("http response:"
																					+ angular
																							.toJson(response));
																	if (response.data.authorizations
																			&& response.data.authorizations.length > 0) {
																		$scope.authorizationMasterEntity = response.data;
																		authService
																				.saveAuthorizationMasterEntity(
																						$scope.authorizationMasterEntity)
																				.then(
																						function(
																								result) {
																							$log
																									.debug("save result:"
																											+ angular
																													.toJson(result));
																							$scope.userMsg = "Auth master created successfully.";
																							$scope.createAuthMaster_Bool = false;
																						});
																	} else {
																		$log
																				.debug("ERROR: no valid data found in masterauth.json.");
																		$scope.userMsg = "ERROR: no valid data found in masterauth.json.";
																	}
																});

											} else {
												$scope.userMsg = "Auth master is already created. No action was taken.";
												$scope.createAuthMaster_Bool = false;
											}

										});
					}

					$scope.touchAllSchools = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.touchAllSchools().then(
								function(msg) {
									$scope.userMsg = "Success!";
								});
					}
					
					$scope.touchAllCouriers = function() {
						var CourierService = appEndpointSF
								.getGFCourierService();

						CourierService.touchAllEntities().then(
								function() {
									$scope.userMsg = "Success!";
								});
					}
					
					

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							// $scope.initsetup();
						} else {
							$log
									.debug("initsetup: Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.toggleRight = buildToggler('right');

					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};

				});
