angular.module("prostudyApp").controller(
		"studentViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF, tableTestDataFactory,
				$state, $timeout, appEndpointSF, $stateParams) {

			$scope.selectedStudEmailId = $stateParams.selectedStudEmailId;
			$scope.subjects = [];

			$scope.getStudent = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByEmailID($scope.selectedStudEmailId).then(
						function(student) {
							$scope.student = student;
							$scope.getSubjectsByStudentID();
						});
			}
			$scope.getStudent();

			$scope.getSubjectsByStudentID = function() {
				var StudentService = appEndpointSF.getStudentService();
				StudentService.getSubjectsByStudentID($scope.student.id).then(
						function(subList) {
							$scope.subjects = subList;
							$scope.checked = true;
						});
			}

			$scope.cancel = function() {
				$state.go("^", {});
			}

		});
