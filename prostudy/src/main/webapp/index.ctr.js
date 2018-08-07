var app = angular.module("prostudyAppWebsite", [ 'ngMaterial', 'ngMessages',
		'ngStorage', 'ngAnimate', 'directive.g+signin', 'ngMdIcons' ]);

app
		.controller(
				"indexCtr",
				function($scope, $rootScope, $window, $log, $q, $timeout,
						$mdToast, $mdBottomSheet, $localStorage, $http,
						$location, $anchorScroll, $mdMedia, $mdUtil, $mdSidenav) {

					$scope.loading = true;
					$scope.angular = angular;

					$scope.curUser = null;
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

					$scope.initGAPI = function() {
						$log.debug("Came to initGAPI");
						// This will load all server side end points
						// $scope.loadAppGoogleServices();
						$timeout(function() {
							var apiRoot = '//' + window.location.host
									+ '/_ah/api';
							var apisToLoad = 1; // must match number of calls to
							// gapi.client.load()
							gapi.client.load('userService', 'v0.1', function() {
								$log.debug("userService Loaded......");
								$scope.loading = false;
							}, apiRoot);
						}, 2000);

					}

					$timeout(function() {
						$scope.initGAPI();
					}, 2000);
					
					$scope.loginClick = function() {
						var hostBaseUrl = '//' + window.location.host
								+ '/login.html';
						$log.debug("hostBaseUrl: " + hostBaseUrl);
						$window.location.href = hostBaseUrl;
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

	// This is the absolutely vital part, without this, changes will not cascade
	// down through the DOM.
	$mdThemingProvider.alwaysWatchTheme(true);
});