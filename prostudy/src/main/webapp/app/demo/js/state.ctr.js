angular.module("prostudyApp")
		.controller(
				"statesPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF) {
					console.log("Inside statesPageCtr");

					$scope.things = [ "A", "Set", "Of", "Things", "out" ];
					$scope.items = [ "A", "List", "Of", "Items", "out" ];
					// console.log("Via Serice:" +
					// customerservice.addCustomer());
					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Student Saved!').position("top").hideDelay(
								3000));
					};



					/* Setup Menu */
					$scope.toggleRight = buildToggler('right');
					/**
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
					 */
					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};
					
					
					$scope.tempStudent = {firstName: "", lastName: ""};
					$scope.students = []; 
					
					$scope.addStudent = function(){
						$log
						.debug("No1");	
						var studentService = appEndpointSF.getStudentService();
						//$scope.students = studentService.addStudent($scope.tempStudent);
												
						studentService.addStudent($scope.tempStudent)
						.then(
								function(msgBean) {
									$log
									.debug("No6");	
									$log
											.debug("Inside Ctr addStudent");
									$log
									.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast();
									$scope.tempStudent = {firstName: "", lastName: ""};
								});
						$log
						.debug("No4");	
					}
					
					$scope.getStudents = function(){
						//$scope.students = appEndpointSF.getStudentService().getStudents();
						var studentService = appEndpointSF.getStudentService();					
												
						studentService.getStudents()
						.then(
								function(studList) {
									$log
											.debug("Inside Ctr getStudents");
									$scope.students = studList;
								});
					}

				});