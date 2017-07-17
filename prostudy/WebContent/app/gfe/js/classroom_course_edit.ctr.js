angular
		.module("prostudyApp")
		.controller(
				"classroomCourseEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$stateParams,$mdDialog,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {					
					
					
					$scope.loading = false;	
					$scope.updating = false;
					$scope.flag = true;
					
					$scope.tempCourse = {
							'name' : "",
							'section' : "",
							'descriptionHeading' : "",
							'description' : "",
							'room' : "",
							'ownerId' : "me",
							'enrollmentCode' : "",
							'courseState':"",
							'alternateLink' : ""
						};
							
					$scope.selectedCourseId=$stateParams.selectedCourseId;
					$scope.tempCourse=$stateParams.selectedCourse;
					$scope.courseStateList	=["COURSE_STATE_UNSPECIFIED","ACTIVE","ARCHIVED","PROVISIONED","DECLINED" ];					
				
				
					$scope.updateCourse = function(ev) {
						
						var confirm = $mdDialog.confirm().title(
						'Are you sure you want to update this course ?').ariaLabel('Lucky day')
						.targetEvent(ev).ok('YES').cancel('NO');
				$mdDialog.show(confirm).then(function() {
					
					$scope.flag = false;
					$scope.loading = true;	
					$scope.updating = true;
					var teachersBackup = $scope.tempCourse.teachers;
			          delete $scope.tempCourse.teachers;
					var request = gapi.client.classroom.courses.update($scope.tempCourse);
					request.execute(function(resp) {							
						$scope.showSavedToast();
						$scope.loading = false;	
						$scope.updating = false;
						$state.go("gfe.classroomCourseList",{});							
					});
					$scope.tempCourse.teachers = teachersBackup;
					
				}, function() {							
					
				});
						
					}					
					
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Course Updated Successfully!').position("top").hideDelay(
								3000));
					};
					$scope.cancelButton = function() {
						$state.go("gfe.classroomCourseList", {});
					}
			
					
				});

