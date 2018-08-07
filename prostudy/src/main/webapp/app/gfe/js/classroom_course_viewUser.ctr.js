angular
		.module("prostudyApp")
		.controller(
				"classroomViewUserCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {

					$scope.selectedUserId = $stateParams.selectedUserId;					
					$scope.selectedCourseId=$stateParams.selectedCourseId;
					$scope.userType=$stateParams.userType;
					
					$scope.permissionList=["PERMISSION_UNSPECIFIED","CREATE_COURSE"];
			
					$scope.getCourseName = function() {							
						var request = gapi.client.classroom.courses.get({
							id : $scope.selectedCourseId							
								});
					
						request.execute(function(resp) {
							$scope.courseName = resp.result.name;							
						});
					}
					
					$scope.getCourseName();
					
					$scope.getCourseTeacher = function() {	
						$scope.loading = true;
						var request = gapi.client.classroom.courses.teachers.get({
							courseId : $scope.selectedCourseId,
							userId : $scope.selectedUserId
								});
					
						request.execute(function(resp) {
							$scope.user = resp.result;
							$scope.loading = false;														
						});
					}
					
					$scope.getCourseStudent = function() {	
						$scope.loading = true;
						var request = gapi.client.classroom.courses.students.get({
							courseId : $scope.selectedCourseId,
							userId : $scope.selectedUserId
								});
					
						request.execute(function(resp) {
							$scope.user = resp.result;
							$scope.loading = false;														
						});
					}
					if($scope.userType=="Teacher")
						{
						$scope.getCourseTeacher();
						}
					else if($scope.userType=="Student")
						{
						$scope.getCourseStudent();
						}
					
					$scope.cancelButton = function() {
						$state.go("^", {});
					}

					
				});

