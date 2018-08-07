angular.module("prostudyApp").controller(
		"generateCertificateCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside generateCertificateCtr");
			$scope.students = [];
			
			$scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();
			
			$scope.getStudentsByInstitute = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByInstitute($scope.curUser.instituteID)
						.then(
								function(studentList) {
									$scope.newStudents = studentList;
									
									for(var i=0;i<$scope.newStudents.length;i++)
									{
										if($scope.newStudents[i].role == "Student")
										{
											$scope.students.push($scope.newStudents[i]);
											$log.debug("$scope.students :"+angular.toJson($scope.students));
											
										}
									}		
											
									
								});
			}
			$scope.getStudentsByInstitute();

		});