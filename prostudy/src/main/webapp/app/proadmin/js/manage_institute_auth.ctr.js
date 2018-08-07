angular
		.module("prostudyApp")
		.controller(
				"proAdminManageInstituteAuth",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $stateParams, objectFactory,
						appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("Inside proAdminManageAuth");

					$scope.selectedInstituteID = $stateParams.selectedInstituteID;

					if (!$scope.selectedInstituteID) {
						return;
					}

					$scope.authorizationMasterEntity = {
						authorizations : []
					};
					$scope.institute = null;
					$scope.existingInstituteAuthObject = null;

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

												var InstituteService = appEndpointSF
														.getInstituteService();

												InstituteService
														.getInstituteById(
																$scope.selectedInstituteID)
														.then(
																function(
																		institute) {
																	$scope.institute = institute;
																	var jsonString = $scope.institute.authorizations;

																	$log
																			.debug("$scope.institute.authorizations:Json: "
																					+ jsonString);

																	if (jsonString) {
																		var jsonObject = angular
																				.fromJson($scope.institute.authorizations);
																		$scope.existingInstituteAuthObject = jsonObject;

																		$scope.authorizationMasterEntity = authService
																				.markSelectedAuthorizations(
																						$scope.authorizationMasterEntity,
																						$scope.existingInstituteAuthObject);
																	}
																});

											}
											$scope.mode = "list";
										});

						$log.debug("Called getAllAuthorizations...");

					}

					// for testing only. This will be fetched from server
					var selectedInstituteTestAuths = {
						name : "MBIS",
						'authorizations' : [ {
							'authName' : 'gfe',
							'authorizations' : [ {
								'authName' : 'list'
							}, {
								'authName' : 'edit',
								'authorizations' : ''
							} ]
						}, {
							'authName' : 'exams',
							'authorizations' : ''
						}, {
							'authName' : 'setup',
							'authorizations' : ''
						} ]

					};

					

					$scope.saveAuthorization = function() {
						$log.debug("Called saveAuthorization...");
						var authService = appEndpointSF
								.getAuthorizationService();

						var toSaveJsonString = angular
								.toJson(authService
										.getCurrentSelectedAuthorizations($scope.authorizationMasterEntity));

						$log.debug("toSaveJsonString: " + toSaveJsonString);

						$scope.institute.authorizations = toSaveJsonString;
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService.updateInstitute($scope.institute)
								.then(function(msgBean) {
									$scope.showUpdateToast();
								});
					}
					
					$scope.cancelButton = function() {
						$state.go("^", {});
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