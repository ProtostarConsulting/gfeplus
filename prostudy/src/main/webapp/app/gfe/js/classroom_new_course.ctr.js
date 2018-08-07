angular
		.module("prostudyApp")
		.controller(
				"classroomNewCourseCtr",
				function(	
						$scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q,tableTestDataFactory, $state, appEndpointSF) {

					
					$scope.courseState=["COURSE_STATE_UNSPECIFIED","ACTIVE","ARCHIVED","PROVISIONED","DECLINED"];
				
					
					$scope.tempCourse = {
						'name' : "",
						'section' : "",
						'descriptionHeading' : "",
						'description' : "",
						'room' : "",
						'ownerId' : "me",
						'enrollmentCode' : "",
						'courseState':"PROVISIONED",
						'alternateLink' : ""
					};
					
					$scope.createCourse = function(tempCourse) {
						
						$scope.creating = true;
						var request = gapi.client.classroom.courses
								.create(tempCourse);

						request.execute(function(resp) {
							$scope.creating = false;
							$scope.showSavedToast();
							$state.go("gfe.classroomCourseList",{});
							//$scope.sendEmailMessage();
						});
					}
			/*		$scope.uploadFiles = function(file, errFiles) {
				        $scope.f = file;
				        $scope.errFile = errFiles && errFiles[0];
				        if (file) {
				            file.upload = Upload.upload({
				                url: 'UploadCourseListServlet',
				                data: {file: file}
				            });
				        
				            
				            file.upload.then(function (response) {
				                $timeout(function () {
				                   // file.result = response.data;
				                   // console.log(" file.result"+ angular.toJson(file.result));
				                	
				                	$scope.courseList=response.data;
				                    console.log('Success '+angular.toJson($scope.courseList));
				                  			                    
				                    
				                    for(var i=0; i< $scope.courseList.length;i++)
				                    	{
				                    	   console.log('Success '+angular.toJson($scope.courseList[i]));
				                    	$scope.createCourse($scope.courseList[i]);
				                    	}
				                    				                    
				                    
				                });
				            }, function (response) {
				                if (response.status > 0)                	
				                	
				                	
				                    $scope.errorMsg = response.status + ': ' + response.data;
				            }, function (evt) {
				                file.progress = Math.min(100, parseInt(100.0 * 
				                                         evt.loaded / evt.total));
				            });
				        }   
				        
				     }
					$scope.courseList = [];*/
				
					/*	$scope.currentUser = null;

					$scope.getCurrentUser = function() {
						var request = gapi.client.plus.people.get({
							'userId' : 'me'
						});
						request.execute(function(resp) {
							$scope.currentUser = resp;
							console.log('Retrieved profile for:'
									+ resp.displayName);
						});
					}

					$scope.getCurrentUser();

					$scope.sendEmailMessage = function() {
						$log.debug("$scope.currentUser:" + $scope.currentUser);
						var base64EncodedEmail = btoa("Course is created in the Classroom app by you. Course Name:"
								+ $scope.tempCourse.name);
						
					
						var request = gapi.client.gmail.users.messages
								.send({
									'userId' : "info@protostar.co.in",
									'message' : {
										'raw' : base64EncodedEmail
									}
								});
						request.execute(function(resp) {
							$log.debug("Send Emnail resp:"
									+ angular.toJson(resp));

						});
					}*/
					
					$scope.cancelButton = function() {
						$state.go("gfe.classroomCourseList", {});
					}
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Course Saved!').position("top").hideDelay(
								3000));
					};

				});

