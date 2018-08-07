angular
		.module("prostudyApp")
		.controller(
				"classroomCourseViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {				
					
					
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
							
					
					$scope.tempCourse=$stateParams.selectedCourse;
					
					$scope.courseStateList	=["COURSE_STATE_UNSPECIFIED","ACTIVE","ARCHIVED","PROVISIONED","DECLINED" ];						
				
					$scope.cancelButton = function() {
						$state.go("gfe.classroomCourseList",{});
					}
			
					
				});

