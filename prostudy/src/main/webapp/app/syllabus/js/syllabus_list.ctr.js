angular.module("prostudyApp").controller(
		"syllabusListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF, $filter,
				$log) {
			
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();

			$scope.isShowTable = true;
			$scope.isShowRecord = false;

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Syllabus Saved!')
						.position("top").hideDelay(3000));
			};
			// $scope.syllabus = "";

			$scope.selected = [];

			$scope.query = {
				order : 'name',
				limit : 5,
				page : 1
			};

			$scope.onpagechange = function(page, limit) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};

			$scope.onorderchange = function(order) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};


			$scope.getSyllabusByInstitute = function() {

				var SyllabusService = appEndpointSF.getSyllabusService();
				SyllabusService.getSyllabusByInstitute(
						$scope.curUser.instituteID).then(function(SyllabusList) {
					$scope.syllabi = SyllabusList;

				});

			}

			if (appEndpointSF.is_service_ready) {
				$scope.getSyllabusByInstitute();
			} else {
				$timeout(function() {
					$scope.getSyllabusByInstitute();
				}, 4000);
			}

			// $scope.editRecord = create copy of selected[0];
			$scope.editSyllabus = function() {
				$scope.editRecord = angular.copy($scope.selected[0]);
				$scope.isShowTable = false;
				$scope.isShowRecord = true;

			}
			$scope.cancel = function() {

				$scope.isShowTable = true;
				$scope.isShowRecord = false;

			}

			$scope.update = function() {
				var SyllabusService = appEndpointSF.getSyllabusService();

				SyllabusService.updateSyllabus($scope.editRecord).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr updateSyllabus");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
						});
				$log.debug("Select Syllabus updated");

				$scope.isShowTable = true;
				$scope.isShowRecord = false;

			}
		});
