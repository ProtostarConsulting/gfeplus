angular
		.module("prostudyApp")
		.controller(
				"practiceExamListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Added Exam to MyExams!').position("top")
								.hideDelay(3000));
					};

					$scope.count = 0;
					$scope.selected = [];

					$scope.getPracticeExamByInstitute = function() {

						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService.getPracticeExamByInstitute(
								$scope.curUser.instituteID).then(
								function(practiceExamList) {
									$scope.practiceExams = practiceExamList;

								});
					}
					if (typeof $scope.curUser.myExams === 'undefined') {
						$scope.curUser.myExams = [];
					}

					$scope.isContainsTest = appEndpointSF.getUtilityService().objectArrayContains;

					$scope.addTestToMyList = function(selectedMyExamId) {

						var practiceTest = null;
						if (typeof $scope.curUser.myExams === 'undefined')
							$scope.curUser.myExams = [];

						for (var i = 0; i < $scope.practiceExams.length; i++) {
							if ($scope.practiceExams[i].id == selectedMyExamId) {
								practiceTest = $scope.practiceExams[i];
								break;
							}
						}

						$scope.curUser.myExams.push(practiceTest);

						$scope.updateUser();
					}

					$scope.updateUser = function() {

						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.curUser).then(
								function(msgBean) {

									$scope.showSavedToast();

								});

					}

					$scope.assignExamToStudent = function(exam) {
						var gfStudentService = appEndpointSF
								.getGFStudentService();
						gfStudentService.addPracticeExamToStudent(exam).then(
								function(resp) {
									$mdToast.show($mdToast.simple().content(
									'Assigned Exam To Student..!').position("top")
									.hideDelay(3000));
								});
					}

					$scope.like = function(selectedMyExamId) {

						for (i = 0; i < $scope.practiceExams.length; i++) {
							if ($scope.practiceExams[i].id == selectedMyExamId) {
								$scope.practiceExams[i].likes++;
								$scope.newTest = $scope.practiceExams[i];
								break;
							}
						}
						$scope.updateLikeCount()
					}

					$scope.updateLikeCount = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService.likeCount($scope.newTest).then(
								function(msgBean) {
									$log.debug("msgBean.msg:" + msgBean.msg);
								});
					}

					$scope.dislike = function(selectedMyExamId) {

						for (i = 0; i < $scope.practiceExams.length; i++) {
							if ($scope.practiceExams[i].id == selectedMyExamId) {

								$scope.practiceExams[i].dislikes++;
								$scope.newTest = $scope.practiceExams[i];
								break;
							}
						}
						$scope.updateDislikeCount()
					}

					$scope.updateDislikeCount = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService.dislikeCount($scope.newTest).then(
								function(msgBean) {
									$log.debug("msgBean.msg:" + msgBean.msg);

								});

					}

					$scope.query = {
						order : 'description',
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
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getPracticeExamByInstitute();
						} else {
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});