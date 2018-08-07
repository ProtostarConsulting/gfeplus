var app = angular.module("prostudyApp");

app
		.controller(
				"gfeIndexCtr",
				function($scope, $rootScope, $window, $log, $q, $timeout,
						$mdToast, $mdBottomSheet, $localStorage, $http, $state,
						$location, $anchorScroll, $mdMedia, $mdUtil, $mdSidenav) {

					$scope.loading = true;
					//$scope.angular = angular;
					if(!$scope.loginCheck()){ //If not logged in return control
						return false;
					}
					
					$scope.authorized = false;
					$scope.loading = false;
					$scope.classroomAPIReady = false;
					
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


					$scope.curUser = null;
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
					
					$scope.handleAuthResult = function(authResult) {
						$log.debug("Inside handleAuthResult..");

						if (authResult && !authResult.error) {
							$scope.authorized = true;
							$scope.$apply(function() {
								$scope.loading = false;
								$state.go('gfe');
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

	// This is the absolutely vital part, without this, changes will not cascade
	// down through the DOM.
	$mdThemingProvider.alwaysWatchTheme(true);
});