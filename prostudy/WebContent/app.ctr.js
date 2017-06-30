angular
		.module("prostudyApp")
		.controller(
				"indexCtr",
				function($scope, $rootScope, $window, $log, $q, $timeout,
						$mdToast, $mdBottomSheet, $state, $localStorage,
						$location, $anchorScroll, ajsCache, appEndpointSF) {

					$log.debug("Inside indexCtr");
					$scope.angular = angular;

					var defaulLogingUserIconURL = '/img/icons/ic_person_24px.svg';
					var defaulInstituteLogoURL = '/img/images/grf_logo_new.gif';

					$scope.showUpdateToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Changes Saved Successfully.').position("top")
								.hideDelay(3000));
					};

					$scope.showAddToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Record Saved Successfully.').position(
								"top").hideDelay(3000));
					};

					$scope.show400Toast = function() {
						$mdToast.show($mdToast.simple().content(
								'Something goes wrong. Record not saved.')
								.position("top").hideDelay(4000));
					};

					$scope.showErrorToast = function(errorMsg) {
						$mdToast.show($mdToast.simple().content(errorMsg)
								.position("top").capsule(true).hideDelay(9000));
					};
					$scope.back = function() {
						window.history.back();// for #tp1
						window.history.back(); // to actual view
					};

					$scope.hasUserAuthority = function(user, authorityToCheck) {
						return user.authority
								&& user.authority.length
								&& user.authority.indexOf(authorityToCheck
										.trim()) > -1
					};

					$scope.data = {
						expanded : true
					};

					$scope.loading = true;
					$scope.curUser = null;
					$scope.flag = true;
					$scope.initDone = false;
					var defaultTheme = 'grf-theme';
					$scope.theme = defaultTheme
					$scope.loginPersonIconUrl = defaulLogingUserIconURL;
					$scope.logoURL = defaulInstituteLogoURL;

					/*
					 * if ($scope.curUser != undefined || $scope.curUser !==
					 * null) { if($scope.curUser.instituteObj.theme){
					 * $scope.theme = $scope.curUser.instituteObj.theme; }
					 * 
					 * if($scope.curUser.instituteObj.logBlobKey){
					 * $scope.logBaseURL = '//' + window.location.host +
					 * '/serve?blob-key=' +
					 * $scope.curUser.instituteObj.logBlobKey; } }
					 */

					$scope.themeList = [ 'default', 'red', 'pink', 'purple',
							'deep-purple', 'indigo', 'blue', 'light-blue',
							'cyan', 'teal', 'green', 'light-green', 'lime',
							'yellow', 'amber', 'orange', 'deep-orange',
							'brown', 'grey', 'blue-grey', 'grf-theme' ];

					$scope.changeTheme = function(themeName) {
						$scope.theme = themeName
					}

					$scope.loginCheck = function() {
						var curUser = appEndpointSF.getLocalUserService()
								.getLoggedinUser();
						if (!curUser) {
							$state.go("gfe");
							return false;
						}
						return true;
					}

					$scope.isAuthorized = function(authName) {
						var found = false;
						if (!$scope.curUser.userAuthMasterEntity
								|| !$scope.curUser.userAuthMasterEntity.authorizations) {
							return found;
						}
						for (var index = 0; index < $scope.curUser.userAuthMasterEntity.authorizations.length; index++) {
							if ($scope.curUser.userAuthMasterEntity.authorizations[index].authName == authName) {
								found = true;
								break;
							}
						}
						return found;
					}

					$scope.showUpdateToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Changes Saved Successfully.').position("top")
								.hideDelay(3000));
					};

					$scope.showAddToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Record Saved Successfully.').position(
								"top").hideDelay(3000));
					};

					$scope.institute = [];

					$scope.tempUser = {
						email_id : '',
						password : ''
					};
					$scope.loginClick = function() {
						$state.go("gfe");
					};

					$scope.$on('moduleData', function(event, args1) {
						$log.debug("In side customLogin on Index Page");
						$scope.modules = args1.modules;
					});

					$scope.authModule = [];
					$scope.$on('customLoginEvent', function(event, args) {
						$log.debug("In side customLogin on Index Page");
						$scope.curUser = args.curUser;
						$scope.getInstituteById();
						$scope.getCurrentUserRoleByInstitute();
						$scope.modules = args.modules;
					});

					$scope.getCurrentUserRoleByInstitute = function() {

						$scope.selection = [];
						$scope.data = {
							instituteID : '',
							role : ''
						};
						var UserService = appEndpointSF.getUserService();

						UserService
								.getCurrentUserRoleByInstitute(
										$scope.curUser.instituteID,
										$scope.curUser.role)
								.then(
										function(modules) {
											$scope.modules = modules;
											console
													.log("$scope.modules==ROLE=="
															+ $scope.modules);
											$scope.$emit('moduleData', {
												modules : $scope.modules
											});
										});

					}

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.$on('event:google-plus-signin-success', function(
							event, authResult) {
						$log.debug('Signed in!');
						// User successfully authorized the G+ App!
						continueGoogleLogin(authResult);
					});

					function continueGoogleLogin(authResult) {
						$scope.loading = true;
						if (!appEndpointSF.is_service_ready) {
							$scope.waitForServiceLoad(authResult);
							// This is needed when auto login happens after page
							// refresh
							return;
						}

						var profile = authResult.getBasicProfile();

						$scope.loginPersonIconUrl = profile.getImageUrl();

						if ($scope.loginPersonIconUrl == null
								|| $scope.loginPersonIconUrl == '') {
							$scope.loginPersonIconUrl = defaulLogingUserIconURL;
						}

						$log.debug('ID: ' + profile.getId());

						appEndpointSF
								.getUserService()
								.getUserByEmailID(profile.getEmail())
								.then(
										function(loggedInUser) {
											$log
													.debug('Inside getUserByEmailID...');

											appEndpointSF.getLocalUserService()
													.saveLoggedInUser(
															loggedInUser);

											$log
													.debug("loggedInUser:"
															+ angular
																	.toJson(loggedInUser));

											$scope.curUser = loggedInUser;

											if (loggedInUser.myExams == undefined) {
												loggedInUser.myExams = [];
											}
											if (loggedInUser.myBooks == undefined) {
												loggedInUser.myBooks = [];
											}
											if (loggedInUser.institute == undefined) {
												loggedInUser.institute = [];
											}

											if (loggedInUser.id == undefined
													&& loggedInUser.instituteID == undefined) {

												loggedInUser.email_id = profile
														.getEmail();
												profile.getName().split(" ")[0];
												loggedInUser.firstName = profile
														.getName().split(" ")[0];
												loggedInUser.lastName = profile
														.getName().split(" ")[1];

												appEndpointSF
														.getLocalUserService()
														.saveLoggedInUser(
																loggedInUser);

												$state.go("updatemyprofile", {
													flag : $scope.flag
												});

											} else {
												$log
														.debug('Inside else of loggedInUser.id == undefined...');
												$scope.getInstituteById();

											}

											$scope.loading = false;
										});

					}

					$scope.getRoleSecListByInstitute = function() {

						$scope.selection = [];
						var UserService = appEndpointSF.getUserService();

						UserService.getRoleSecListByInstitute(
								$scope.curUser.instituteID).then(
								function(modules) {
									$scope.modules = modules;

								});

					}

					$scope.getInstituteById = function() {

						var InstituteService = appEndpointSF
								.getInstituteService();

						InstituteService.getInstituteById(
								$scope.curUser.instituteID).then(
								function(institute) {
									var curUser = appEndpointSF
											.getLocalUserService()
											.getLoggedinUser();
									curUser.instituteObj = institute;
									appEndpointSF.getLocalUserService()
											.saveLoggedInUser(curUser);

									$scope.curUser = curUser;
									$scope.initCommonSetting();
								});

					}

					function getUserAuthTree() {
						var authService = appEndpointSF
								.getAuthorizationService();
						authService
								.getAuthorizationMasterEntity()
								.then(
										function(result) {
											$log.debug("result:" + result);
											var authorizationMasterEntity = {
												authorizations : []
											};
											var userAuthMasterEntity = {
												authorizations : []
											};

											var jsonUserAuthObject = angular
													.fromJson($scope.curUser.authorizations);

											if ($scope.curUser.authorizations) {
												var jsonUserAuthObject = angular
														.fromJson($scope.curUser.authorizations);
												$scope.userAuthObject = jsonUserAuthObject;
											} else {
												$scope.userAuthObject = {
													authorizations : []
												};
											}

											if (result
													&& result.authorizations != undefined) {

												authorizationMasterEntity.authorizations = result.authorizations;

												userAuthMasterEntity = authService
														.filterMasterAuthTree(
																authorizationMasterEntity,
																$scope.userAuthObject,
																userAuthMasterEntity);

												userAuthMasterEntity.authorizations
														.sort(function(a, b) {
															return (parseFloat(a.orderNumber) > parseFloat(b.orderNumber)) ? 1
																	: -1
														});

												$log
														.debug("userAuthMasterEntity:"
																+ angular
																		.toJson(userAuthMasterEntity));

												var curUser = appEndpointSF
														.getLocalUserService()
														.getLoggedinUser();
												curUser.userAuthMasterEntity = userAuthMasterEntity;
												appEndpointSF
														.getLocalUserService()
														.saveLoggedInUser(
																curUser);

												$scope.curUser = curUser;
												// $scope.safeApply();
											}
										});
					}

					$scope.signOut = function() {


						var hostBaseUrl = '//' + window.location.host
								+ '/index.html';

						if (gapi.auth2 == undefined) {
							$scope.curUser = null;
							$scope.curUser = appEndpointSF
									.getLocalUserService().logout();

							// $state.go("home");
							$window.location.href = hostBaseUrl;
							return;
						}
						var auth2 = gapi.auth2.getAuthInstance();
						// try logout 3 times.
						for (var i = 1; i <= 3; i++) {
							auth2
									.signOut()
									.then(
											function() {
												// also remove login details
												// from chrome
												// browser

												$scope.googleUser = null;
												$scope.curUser = null;
												$scope.curUser = appEndpointSF
														.getLocalUserService()
														.logout();

												// $state.go("home");
												$window.location.href = hostBaseUrl;
											});
						}
					}

					$scope.$on('event:google-plus-signin-failure', function(
							event, authResult) {
						// User has not authorized the G+ App!
						$log.debug('Not signed into Google Plus.');
						// $scope.getInstituteById();
					});

					// $window.initGAPI = function() {}

					$scope.initCommonSetting = function() {
						$log.debug('Inside initCommonSetting');
						ajsCache.removeAll();
						$scope.curUser = appEndpointSF.getLocalUserService()
								.getLoggedinUser();

						// Allow guest login for add result page.

						if ($state.current.name == "studentModule.addExamResult") {
							return;
							// this allow access to current page without login
						}

						if (!$scope.curUser) {
							$state.go("login");
							return; // else it goes to login state but continues
							// the this js flow
						}

						if ($scope.curUser && $scope.curUser.instituteObj) {
							$scope.theme = $scope.curUser.instituteObj.theme;
						}
						if ($scope.curUser.instituteObj
								&& $scope.curUser.instituteObj.logBlobKey) {
							$scope.logoURL = '//' + window.location.host
									+ '/serve?blob-key='
									+ $scope.curUser.instituteObj.logBlobKey;
						} else {
							$scope.logoURL = defaulInstituteLogoURL;
						}
						$scope.institute = $scope.curUser.instituteObj;
						getUserAuthTree();
						$scope.initDone = true;
						$scope.loading = false;
						$scope.data.expanded7 = true;
						if(!$scope.curUser){
							$state.go("welcome");
						}else{
							$state.go("gfe");
						}
						
					}

					$scope.initGAPI = function() {
						$log.debug("Came to initGAPI");

						// $scope.theme = $scope.curUser.theme;
						// This will load all server side end points
						// $scope.loadAppGoogleServices();
						$timeout(
								function() {
									appEndpointSF
											.loadAppGoogleServices($q.defer())
											.then(
													function() {
														$log
																.debug("##########Loaded All Google Endpoint Services....#########");
														$scope.loading = false;
													});
								}, 2000);

					};

					$scope.waitForServiceLoad = function(authResult) {
						if (!appEndpointSF.is_service_ready) {
							$log
									.debug("Index: Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
							return;
						}

						$log
								.debug("####Index: Loaded All Services, Continuing####");
						if (authResult) {
							//continueGoogleLogin(authResult);
						}
						if (!$scope.initDone) {
							$scope.initCommonSetting();
						}
					}

					$scope.initGAPI();
					$scope.waitForServiceLoad();

					// Common Utility Functions
					$scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if (phase == '$apply' || phase == '$digest') {
							if (fn && (typeof (fn) === 'function')) {
								fn();
							}
						} else {
							this.$apply(fn);
						}
					};

					$rootScope.$on('$stateChangeSuccess', function(event,
							toState, toParams, fromState, fromParams) {
						// On any state change go the the top
						$location.hash('topRight');
						$anchorScroll();
					});
					$rootScope.$on('$stateChangeStart', function(e, toState,
							toParams, fromState, fromParams) {
						// check access permission here.
					});

					$scope.containsObject = function(obj, list) {
						var i;
						for (i = 0; i < list.length; i++) {
							if (angular.equals(list[i], obj)) {
								return true;
							}
						}
						return false;
					};
					$scope.parseInt = function(str) {
						if (!str) {
							return 0;
						}
						return parseInt(str);
					};
					$scope.parseFloat = function(str) {
						if (!str) {
							return 0;
						}
						return parseFloat(str);
					};

					// Common Utility Functions-END

				})
		.controller(
				'AppCtrl',
				function($scope, $timeout, $mdSidenav, $mdUtil, $log, $mdMedia) {
					$scope.toggleMainMenuSwitch = $mdMedia('gt-md');

					$scope.toggleMainMenu = function() {
						$scope.toggleMainMenuSwitch = !$scope.toggleMainMenuSwitch;
						$log
								.debug("toggle left menu. $scope.toggleMainMenuSwitch:"
										+ $scope.toggleMainMenuSwitch);
					}

					$scope.close = function() {
						if (!$mdMedia('gt-md'))
							$scope.toggleMainMenu();
					}
				});