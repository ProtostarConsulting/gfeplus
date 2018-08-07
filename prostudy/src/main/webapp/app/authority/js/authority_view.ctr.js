angular.module("prostudyApp").controller(
		"authorityViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.selection = [];
			$scope.role;
			$scope.modules = {};

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple()
						.content('Updated Successfully!').position("top")
						.hideDelay(3000));
			};

			$scope.moduleList = [ "Authority", "Exam", "Student","Scheduled	Exam",
					"Institute", "Attendance", "Book", "Favourite", "Report",
					"Certificate Management", "Admission Management" ]

			$scope.toggleSelection = function toggleSelection(index) {
				$scope.selection[index] = !$scope.selection[index];
			};

			$scope.getAuthorityByRole = function() {

				$scope.selection = [];
				var UserService = appEndpointSF.getUserService();
				UserService.getAuthorityByRole($scope.role,$scope.curUser.instituteID).then(
						function(modules) {
							$scope.modules = modules[0];
							for ( var i in $scope.moduleList) {
								$scope.selection.push($scope.modules.modules
										.indexOf($scope.moduleList[i]) > -1);
							}
						});
			}

			$scope.UpdateRoleSec = function() {
				$scope.modules.modules = [];
				for (var i = 0; i < $scope.selection.length; i++) {
					if ($scope.selection[i])
						$scope.modules.modules.push($scope.moduleList[i]);
				}
				var UserService = appEndpointSF.getUserService();

				UserService.addOrUpdateRoleSec($scope.modules).then(
						function(msgBean) {
							$scope.showSavedToast();

						});
				$state.go('authority');
			}

	

			$scope.cancelButton = function() {

				$state.go('^', {});
			};

		});
