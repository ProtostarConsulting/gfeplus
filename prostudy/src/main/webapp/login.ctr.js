var app = angular.module("loginApp", [ 'ngMaterial', 'ngMessages', 'ngStorage',
		'ngAnimate', 'directive.g+signin', 'ngMdIcons' ]);

app
		.controller(
				"loginCtr",
				function($scope, $rootScope, $window, $log, $q, $timeout,
						$mdToast, $mdBottomSheet, $localStorage, $http,
						$mdDialog, $location, $anchorScroll, $mdMedia, $mdUtil,
						$mdSidenav) {

					$scope.loading = true;
					$scope.angular = angular;

					$scope.curUser = null;
					$scope.visible = false;
					$scope.googleUserDetails = "";
					$scope.googleUser = null;
					$scope.businessName = "";
					$scope.prodigitalLogo = "/img/images/protostar_logo_pix_308_124.png";
					$scope.mobileDevice = $mdMedia('gt-md');

					/* Page Menu */
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

					$scope.gotoPart = function(partId) {
						$location.hash(partId);
						$anchorScroll();
					}

					/*$scope.registerNewInstitute = function() {
						var hostBaseUrl = '//' + window.location.host
								+ '/app.html#/registerNewInstitute#tp1';
						$log.debug("hostBaseUrl: " + hostBaseUrl);
						$window.location.href = hostBaseUrl;
					}*/

					$scope.loginClick = function() {
						var hostBaseUrl = '//' + window.location.host
								+ '/app.html#/gfe#tp1';
						$log.debug("hostBaseUrl: " + hostBaseUrl);
						$window.location.href = hostBaseUrl;
					}

					$scope.user = {
						business : "",
						email_id : "",
						firstName : "",
						lastName : "",
						password : "",
						isGoogleUser : true,
						theme : "",
						authority : []
					}

					$scope.$on('event:google-plus-signin-success', function(
							event, authResult) {
						$log.debug('Signed in!');
						// User successfully authorized the G+ App!
						if (authResult != undefined) {
							continueGoogleLogin(authResult);
						}
					});

					function continueGoogleLogin(authResult) {
						$scope.loading = true;
						$scope.visible = true;
						var profile = authResult.getBasicProfile();

						$scope.loginPersonIconUrl = profile.getImageUrl();
						if (gapi.client.userService == undefined) {
							$scope.initGAPI(authResult);
							return;
						}

						if ($scope.loginPersonIconUrl == null
								|| $scope.loginPersonIconUrl == '') {
							$scope.loginPersonIconUrl = defaulLogingUserIconURL;
						}

						$log.debug('ID: ' + profile.getId());
						gapi.client.userService
								.getUserByEmailID({
									'email_id' : profile.getEmail()
								})
								.then(
										function(loggedInUser) {
											$log
													.debug('Inside getUserByEmailID...');
											$scope.curUser = loggedInUser.result;

											gapi.client.instituteService
													.getInstituteById(
															{
																'id' : loggedInUser.result.instituteID
															})
													.then(
															function(resp) {
																if (resp) {
																	$scope.curUser.instituteObj = resp.result;
																}
																if ($scope.curUser.instituteObj) {
																	var hostBaseUrl = '//'
																			+ window.location.host
																			+ '/app.html#/gfe'
																	$window.location.href = hostBaseUrl;
																}
																$localStorage.loggedinUser = $scope.curUser;
															});

											$log
													.debug("loggedInUser:"
															+ angular
																	.toJson(loggedInUser));

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

												/*
												 * gapi.client.userService
												 * .saveLoggedInUser(loggedInUser);
												 */
											} else {
												$log
														.debug('Inside else of loggedInUser.id == undefined...');
												// $scope.getInstituteById();

											}

											$scope.loading = false;
										});

					}

					$scope.initGAPI = function(authResult) {
						$log.debug("Loading Google client.js...");

						if (gapi && gapi.client && gapi.client.load) {
							var apiRoot = '//' + window.location.host
									+ '/_ah/api';
							var apisToLoad = 2; // must match number of calls to
							// gapi.client.load()
							gapi.client.load('userService', 'v0.1', function() {
								$log.debug("userService Loaded......");
								$scope.loading = false;
								$scope.$apply($scope.loading);
							}, apiRoot);
							gapi.client
									.load(
											'instituteService',
											'v0.1',
											function() {
												$log
														.debug("instituteService Loaded......");
												if (authResult != undefined) {
													continueGoogleLogin(authResult);
												}
												$scope.loading = false;
												$scope.$apply($scope.loading);
											}, apiRoot);
						} else {
							$timeout($scope.initGAPI, 2000);
						}
					}

					$scope.initGAPI();

					$scope.registerNewInstitute = function(ev) {
						var useFullScreen = $mdMedia('xs');
						$mdDialog
								.show(
										{
											controller : registerNewInstituteCtr,
											templateUrl : '/app/login/registerNewInstitute.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : true,
											locals : {}
										})
								.then(
										function(answer) {
											$scope.status = 'You said the information was "'
													+ answer + '".';
										},
										function() {
											$scope.status = 'You cancelled the dialog.';
										});

					};

					function registerNewInstituteCtr($scope, $mdDialog) {

						function defaultActionProcessing() {
							return {
								saving : false,
								saveButtonText : "Register",
								savingButtonText : "Saving..."
							};
						}
						$scope.actionProcessing = defaultActionProcessing();

						$scope.registrationSuccess = false;

						$scope.institute = {
							name : ''
						};

						$scope.userEntity = {
							email_id : "",
							firstName : "",
							lastName : "",
							isGoogleUser : true,
							password : '',
							instituteID : '',
							role : 'Admin'
						};
						$scope.registerNewInstitute = function() {

							$scope.actionProcessing.saving = true;
							gapi.client.instituteService
									.addInstitute($scope.institute)
									.then(
											function(resp) {
												if (resp.result) {
													$scope.userEntity.instituteID = resp.result.id;
													$scope.registrationSuccess = true;
													gapi.client.userService
															.addUser(
																	$scope.userEntity)
															.then(
																	function(
																			resp) {
																	});
												}
											});
						}

					}
				});

app.config(function($mdThemingProvider) {

	/*
	 * Available palettes: red, pink, purple, deep-purple, indigo, blue,
	 * light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange,
	 * deep-orange, brown, grey, blue-grey
	 */
	$mdThemingProvider.theme('default').primaryPalette('light-blue')
			.accentPalette('pink');
	$mdThemingProvider.theme('red').primaryPalette('red').accentPalette(
			'orange').warnPalette('blue');
	$mdThemingProvider.theme('pink').primaryPalette('pink').accentPalette(
			'orange').warnPalette('blue');
	$mdThemingProvider.theme('purple').primaryPalette('purple').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('deep-purple').primaryPalette('deep-purple')
			.accentPalette('grey').warnPalette('blue');
	$mdThemingProvider.theme('indigo').primaryPalette('indigo').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('blue').primaryPalette('blue').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('light-blue').primaryPalette('light-blue')
			.accentPalette('grey').warnPalette('blue');
	$mdThemingProvider.theme('cyan').primaryPalette('cyan').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('teal').primaryPalette('teal').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('green').primaryPalette('green').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('light-green').primaryPalette('light-green')
			.accentPalette('grey').warnPalette('blue');
	$mdThemingProvider.theme('lime').primaryPalette('lime').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('yellow').primaryPalette('yellow').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('amber').primaryPalette('amber').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('orange').primaryPalette('orange').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('deep-orange').primaryPalette('deep-orange')
			.accentPalette('grey').warnPalette('blue');
	$mdThemingProvider.theme('brown').primaryPalette('brown').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('grey').primaryPalette('grey').accentPalette(
			'grey').warnPalette('blue');
	$mdThemingProvider.theme('blue-grey').primaryPalette('blue-grey')
			.accentPalette('grey').warnPalette('blue');
	$mdThemingProvider.theme('docs-dark', 'default').primaryPalette('yellow')
			.dark();

	// This is the absolutely vital part, without this, changes will not cascade
	// down through the DOM.
	$mdThemingProvider.alwaysWatchTheme(true);
});