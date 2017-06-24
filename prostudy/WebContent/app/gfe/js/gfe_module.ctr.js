angular
		.module("prostudyApp")
		.controller(
				"gfeModuleCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF) {

					$log.debug("Inside gfeModuleCtr");
					
					/*if(!$scope.loginCheck()){ //If not logged in return control
						return false;
					}*/
					$scope.authorized = false;
					$scope.loading = false;
					$scope.classroomAPIReady = false;
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					
					$scope.currentUserDomain = $scope.curUser.email_id
							.split("@")[1];

					$scope.courseListBackup = null;
					$scope.directoryUserListBackup = null;
					$scope.teacherListBackup = null;
					

					var CLIENT_ID = '759880535753-3h86dfhcao97655vcnooobn17l4flp8q.apps.googleusercontent.com';

					var SCOPES = [

							"https://www.googleapis.com/auth/classroom.courses",
							"https://www.googleapis.com/auth/userinfo.profile",
							"https://www.googleapis.com/auth/classroom.profile.emails",
							"https://www.googleapis.com/auth/classroom.profile.photos",
							"https://www.googleapis.com/auth/plus.me",
							"https://www.googleapis.com/auth/userinfo.email",
							"https://www.googleapis.com/auth/admin.directory.user",
							"https://www.googleapis.com/auth/classroom.rosters",
							"https://mail.google.com",
							"https://www.googleapis.com/auth/gmail.modify",
							"https://www.googleapis.com/auth/gmail.compose",
							"https://www.googleapis.com/auth/gmail.send",
							"https://www.googleapis.com/auth/admin.directory.user.readonly",
							"https://www.googleapis.com/auth/admin.directory.user" ]

					$scope.checkAuth = function checkAuth() {
						$log.debug("Inside checkAuth..");

						gapi.auth.authorize({
							'client_id' : CLIENT_ID,
							'scope' : SCOPES.join(' '),
							'immediate' : true
						}, $scope.handleAuthResult);
					}

					$scope.handleAuthResult = function(authResult) {
						$log.debug("Inside handleAuthResult..");

						if (authResult && !authResult.error) {
							$scope.authorized = true;
							$scope.$apply(function() {
								$scope.loading = false;
							});

						} else {

							$scope.authorized = false;
						}
					}

					$scope.handleAuthClick = function(event) {
						$log.debug("Inside handleAuthClick..");
						gapi.auth.authorize({
							client_id : CLIENT_ID,
							scope : SCOPES,
							immediate : false
						}, $scope.handleAuthResult);
						return false;
					}

					$scope.loadClassroomApi = function() {
						gapi.client.load('classroom', 'v1');
						gapi.client.load('gmail', 'v1', function() {
						});						
						gapi.client.load('admin', 'directory_v1', function() {
							$scope.classroomAPIReady = true;
						});
					}

					/* Setup menu */
					$scope.toggleRight = buildToggler('right');
					/**
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
					 */
					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}
					
					$scope.back = function() {
						window.history.back();
						// $state.go("^", {});
					};

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.loadClassroomApi();
						} else {
							$log.debug("GfE: Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});