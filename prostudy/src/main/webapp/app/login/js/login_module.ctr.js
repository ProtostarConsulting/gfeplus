angular
		.module("prostudyApp")
		.controller(
				"loginModuleCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $location, objectFactory,
						appEndpointSF, tableTestDataFactory, $state) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Teacher Registered!').position("top")
								.hideDelay(3000));
					};

					$scope.flag = false;
					$scope.errmsg = "";

					$scope.tempUser = {
						userId : "",
						firstName : "",
						lastName : "",
						instituteName : "",
						userName : "",
						email_id : "",
						address : "",
						contact : "",
						gender : "",
						password : "",
						role : "Teacher",
						book : ""

					};
					$scope.loginMsg = "";
					$scope.users = [];

					$scope.addUser = function() {

						var UserService = appEndpointSF.getUserService();
						UserService.addUser($scope.tempUser).then(
								function(msgBean) {

									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSavedToast();

								});

					}

					$scope.login = function() {
						$scope.loading = true;
						var UserService = appEndpointSF.getUserService();
						UserService
								.login($scope.tempUser.email_id,
										$scope.tempUser.password)
								.then(
										function(result) {

											if (!result.result
													|| result.result.status !== "active") {
												$scope.ErrorMsg = "Login failed. Please contact to admin.";
												$scope.loading = false;
											} else {

												if (result.result.email_id) {

													appEndpointSF
															.getLocalUserService()
															.saveLoggedInUser(
																	result.result);
													$scope.curUser = result.result;

													/*
													 * if($scope.curUser
													 * !=null){
													 * $scope.getCurrentUserRoleByInstitute();
													 * $scope.modules; }
													 */$log
															.debug("User logged in successfully: "
																	+ $scope.tempUser.email_id);
													// $window.location.reload();
													$scope
															.$emit(
																	'customLoginEvent',
																	{
																		curUser : result.result
																	});
													$scope
															.$broadcast(
																	'customLoginEvent',
																	{
																		curUser : result.result
																	});
													$scope.loading = false;
												}

											}
										});
					}

					/*
					 * $scope.getCurrentUserRoleByInstitute = function() {
					 * 
					 * var UserService = appEndpointSF.getUserService();
					 * 
					 * UserService.getCurrentUserRoleByInstitute(
					 * $scope.curUser.instituteID,$scope.curUser.role).then(
					 * function(modules) { $scope.modules = modules;
					 * console.log("$scope.modules==ROLE=="+$scope.modules);
					 * $scope.$emit('moduleData', { modules:$scope.modules });
					 * }); }
					 */
					$scope.cancelButton = function() {
						$state.go("home", {});
					}
					$scope.inputType = 'password';
					$scope.hoverIn = function() {
						$scope.inputType = 'text';
					}
					$scope.hoverOut = function() {
						$scope.inputType = 'password';
					}

					/* Setup page menu */
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
