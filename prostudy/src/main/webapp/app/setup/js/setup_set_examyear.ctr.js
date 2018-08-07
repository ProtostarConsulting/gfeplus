angular.module("prostudyApp").controller(
		"setExamYearCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			// get last next 3 year to show academic year
			$scope.getNextYears = function() {
				var date = new Date();
				for (var i = 0; i < 3; i++) {
					var year = date.getFullYear();
					year = year.toString().substr(2, 2);

					$scope.Years.push(date.getFullYear() + "-"
							+ (Number(year) + 1));
					date.setYear(date.getFullYear() + 1);
				}
			}

			$scope.Years = [];
			$scope.getNextYears();
			// ----get pre year to push years----
			$scope.getPrvYears = function() {
				var date = new Date();

				for (var i = 0; i < 3; i++) {
					var year = date.getFullYear();
					year = year.toString().substr(2, 2);

					$scope.Years.push((date.getFullYear() - 1) + "-"
							+ (Number(year)));
					date.setYear(date.getFullYear() - 1);
				}

			}
			$scope.getPrvYears();
			// ---get curyear ------
			$scope.getCurYear = function() {
				var date = new Date();
				var curyear = date.getFullYear();
				curyear = curyear.toString().substr(2, 2);
				$scope.yearOfExam = date.getFullYear() + "-"
						+ (Number(curyear) + 1);
			}
			$scope.getCurYear();

			$scope.setExamYear = function() {
				$scope.institue.yearofExam = $scope.yearOfExam;
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.updateInstitute($scope.institue).then(
						function() {
							$scope.showAddToast();
						});
			}

			$scope.getInstituteById = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.curUser.instituteID)
						.then(function(institueObj) {
							$scope.institue = institueObj;
						});
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getInstituteById();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad1, 1000);
				}
			}

			$scope.waitForServiceLoad();
		});