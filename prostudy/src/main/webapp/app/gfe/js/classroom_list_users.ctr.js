angular
		.module("prostudyApp")
		.controller(
				"classroomCourseUserListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$mdDialog,
						$mdUtil, $log, $q, $stateParams, tableTestDataFactory, appEndpointSF) {
					
					$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
					$scope.courseName = $stateParams.courseName;
					$scope.userType = "";
					$scope.userList = [];
					$scope.selected=[];
					
					$scope.selectedCourseId = $stateParams.selectedCourseId;
					$scope.userType = $stateParams.userType;
					
					$scope.authorized = false;
					$scope.loading = false;
					
					$scope.viewClassTeachers = function() {
						$scope.loading = true;
						$scope.selected=[];
						$scope.userType = "Teacher";
						var request = gapi.client.classroom.courses.teachers
								.list({
									courseId : $scope.selectedCourseId,
									pageSize : 100
								});

						request.execute(function(resp) {
							$scope.userList = resp.result.teachers?resp.result.teachers:[];
							//$scope.loading = false;
							$scope.$apply(function(){
								$scope.loading = false;
							});
							
						});
					}

					
					
					$scope.viewClassStudents = function() {
						$scope.loading = true;
						$scope.selected=[];
						$scope.userType = "Student";
						var request = gapi.client.classroom.courses.students
								.list({
									courseId : $scope.selectedCourseId,
									pageSize : 200
								});

						request.execute(function(resp) {
							$scope.userList = resp.result.students?resp.result.students:[];
							//$scope.loading = false;
							$scope.$apply(function(){
								$scope.loading = false;
							});
							$log.debug("resp:" + angular.toJson(resp));
						});
					}
					$scope.deleteUser = function(courseId,userId,userType,ev) {
						
						var confirm = $mdDialog.confirm().title(
						'Are you sure you want to delete User ?').ariaLabel('Lucky day')
						.targetEvent(ev).ok('YES').cancel('NO');
				$mdDialog.show(confirm).then(function() {					
					
					if(userType==="Teacher")
					{
						
					var request = gapi.client.classroom.courses.teachers.delete({
								courseId : courseId,
								userId : userId
							});

					}
					else if(userType==="Student")
						{
						
						var request = gapi.client.classroom.courses.students.delete({
							courseId : courseId,
							userId : userId
						});
						}
					request.execute(function(resp) {
						$scope.showSavedToast();
						$log.debug("resp:" + angular.toJson(resp));
					});
					
				}, function() {							
					
				});						
					
					}

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'User Deleted!').position("top")
								.hideDelay(3000));
					};

					if($scope.userType == "Teacher")
						$scope.viewClassTeachers();
					else
						$scope.viewClassStudents();
					
					
									
					$scope.query = {
						order : 'fullName',
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

				});