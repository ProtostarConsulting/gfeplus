angular
		.module("prostudyApp")
		.controller(
				"instituteUserListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, ajsCache, objectFactory) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute User Saved!').position("top")
								.hideDelay(3000));
					};

					// $scope.curUser =
					// appEndpointSF.getLocalUserService().getLoggedinUser();

					$scope.changeAuthView = function(params) {
						$state.go("setup.userauth", params);
					}
					
					$scope.getInstituteUsers = function(refresh) {
						var userListCacheKey = "getInstituteUsers";
						// Note this key has to be unique across application
						// else it will return unexpected result.
						if (!angular
								.isUndefined(ajsCache.get(userListCacheKey))
								&& !refresh) {
							$log.debug("Found List in Cache, return it.")
							$scope.instituteUsersList = ajsCache
									.get(userListCacheKey);
							processUserList();
							return;
						}

						$log
								.debug("NOT Found List in Cache, fetching from server.")

						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService
								.getInstituteUsers($scope.curUser.instituteID)
								.then(
										function(instituteUsersList) {
											$scope.instituteUsersList = instituteUsersList;
											ajsCache.put(userListCacheKey,
													instituteUsersList);
											processUserList();

										},
										function(errorObject) {
											$scope.showErrorToast(errorObject.message);
										});
					}

					function processUserList() {
						$scope.admin = [];
						$scope.activeUsers = [];
						$scope.inActiveUsers = [];
						$scope.suspendedUsers = [];
						for (var i = 0; i < $scope.instituteUsersList.length; i++) {
							if ($scope.instituteUsersList[i].status == "active") {
								$scope.activeUsers
										.push($scope.instituteUsersList[i]);

								if ($scope.instituteUsersList[i].role == "Admin") {
									$scope.admin
											.push($scope.instituteUsersList[i]);
								}

							} else if ($scope.instituteUsersList[i].status == "inactive") {
								$scope.inActiveUsers
										.push($scope.instituteUsersList[i]);

							}
							if ($scope.instituteUsersList[i].status == "suspended") {
								$scope.suspendedUsers
										.push($scope.instituteUsersList[i]);

							}

						}
					}

					$scope.instituteUsersList = [];
					$scope.activeselected = [];

					$scope.inactiveUserStatus = function(res) {
						var inactive = "inactive";
						var userService = appEndpointSF.getUserService();
						if (res == 'active') {
							$scope.activeselected[0].status = inactive;
							userService.updateUserStatus(
									$scope.activeselected[0]).then(
									function(msgBean) {
										$scope.showUpdateToast();
										$scope.getInstituteUsers();
										$state.go("setup.instituteUsersList", {
											reload : true
										});
									});
						} else {
							$scope.suspendselected[0].status = inactive;
							userService.updateUserStatus(
									$scope.suspendselected[0]).then(
									function(msgBean) {
										$scope.showUpdateToast();
										$scope.getInstituteUsers();
										$state.go("setup.instituteUsersList", {
											reload : true
										});
									});
						}
					}
					$scope.suspendUserStatus = function(res) {
						var suspended = "suspended";
						var userService = appEndpointSF.getUserService();
						if (res == 'active') {
							$scope.activeselected[0].status = suspended;
							userService.updateUserStatus(
									$scope.activeselected[0]).then(
									function(msgBean) {
										$scope.showUpdateToast();
										$scope.getInstituteUsers();
										$state.go("setup.instituteUsersList", {
											reload : true
										});
									});
						} else {
							$scope.inactiveselected[0].status = suspended;
							userService.updateUserStatus(
									$scope.inactiveselected[0]).then(
									function(msgBean) {
										$scope.showUpdateToast();
										$scope.getInstituteUsers();
										$state.go("setup.instituteUsersList", {
											reload : true
										});
									});
						}
					}
					$scope.activeUserStatus = function(res) {
						var active = "active";
						var userService = appEndpointSF.getUserService();
						if (res == 'inactive') {
							$scope.inactiveselected[0].status = active;
							userService.updateUserStatus(
									$scope.inactiveselected[0]).then(
									function(msgBean) {
										$scope.showUpdateToast();
										$scope.getInstituteUsers();
										$state.go("setup.instituteUsersList", {
											reload : true
										});
									});
						} else {
							$scope.suspendselected[0].status = active;
							userService.updateUserStatus(
									$scope.suspendselected[0]).then(
									function(msgBean) {
										$scope.getInstituteUsers();
										$state.go("setup.instituteUsersList", {
											reload : true
										});
									});
						}
					}

					$scope.query = {
						order : 'firstName',
						limit : 15,
						page : 1
					};

					$scope.cancelButton = function() {
						$state.go("^", {});
					}

					$scope.error = "";

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getInstituteUsers();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
				});
