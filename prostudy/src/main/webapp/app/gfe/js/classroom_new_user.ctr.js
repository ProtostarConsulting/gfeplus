angular.module("prostudyApp")
		.controller(
				"classroomNewUserCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$stateParams, $mdUtil, $log, $q, tableTestDataFactory,
						appEndpointSF, $state) {

					$scope.selectedCourseId = $stateParams.selectedCourseId;
					$scope.courseName = $stateParams.courseName;
					
					$scope.userType = $stateParams.userType;
					   $scope.directoryUsers=[];
					   
					$scope.GlobalPermission = {
						'permission' : ""
					}

					$scope.name = {
						'givenName' : "",
						'familyName' : "",
						'fullName' : ""
					}

					$scope.profile = {

						'id' : "",
						'name' : $scope.name,
						'emailAddress' : "",
						'photoUrl' : "",
						'permissions' : []

					}
					$scope.tempUser = {
						'courseId' : $scope.selectedCourseId,
						'userId' : "",
						'profile' : $scope.profile
					};

					$scope.listUsers=function () {
					      var request = gapi.client.directory.users.list({	
					    	  viewType:'admin_view',
					    	  pageToken:'',
					    	  sortOrder:'ascending' ,
					    	  orderBy:'email',
					    	  projection:'basic',
					        domain:	'sgpcs.in',
					        maxResults:500
					        
					      });
					     
					      request.execute(function(resp) {
					    	 
					    	   var users = resp.users;
					       
					        if (users && users.length > 0) {
					          for (i = 0; i < users.length; i++) {
					            var user = users[i].primaryEmail;
					            $scope.directoryUsers.push(user);
					          }
					        } else {
					        	 $log.debug("Not Found");
					        }
					      //$scope.loading = false;
							$scope.$apply(function(){
								$scope.loading = false;
							});				      							
					      });
					    }
					
					$scope.createTeacher = function() {

						$scope.tempUser.userId = $scope.profile.emailAddress;

						$log.debug("Inside $scope.tempUser .."
								+ angular.toJson($scope.tempUser));
						var request = gapi.client.classroom.courses.teachers
								.create($scope.tempUser);

						request.execute(function(resp) {
							$log.debug("resp:" + angular.toJson(resp));
							$scope.showTeacherAddedToast();
							$state.go("gfe.classroomCourseList",{});
						});
					}

					$scope.createStudent = function() {
						$scope.tempUser.userId = $scope.profile.emailAddress;

						$log.debug("Inside $scope.tempUser .."
								+ angular.toJson($scope.tempUser));
						var request = gapi.client.classroom.courses.students
								.create($scope.tempUser);

						request.execute(function(resp) {
							$log.debug("resp:" + angular.toJson(resp));
							$scope.showStudentAddedToast();
							$state.go("gfe.classroomCourseList",{});
						});
					}

					$scope.showTeacherAddedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Teacher Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showStudentAddedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Student Added!').position("top")
								.hideDelay(3000));
					};
					$scope.cancelButton = function() {
						$state.go("gfe.classroomCourseList", {});
					}
					$scope.listUsers();
					
					 
					   $scope.selectedItem;
					   $scope.searchText = null;

					   $scope.querySearch = function(query) {
					    var results = query ? $scope.directoryUsers
					      .filter(createFilterFor(query))
					      :$scope.directoryUsers;
					    var deferred = $q.defer();
					    $timeout(function() {
					     deferred.resolve(results);
					    }, Math.random() * 1000, false);
					    return deferred.promise;
					   }
					
					   function createFilterFor(query) {
					    var lowercaseQuery = angular.lowercase(query);
					    return function filterFn(usr) {
					     return (angular.lowercase(usr).indexOf(lowercaseQuery) === 0);
					    };
					   }
					
					
				});
