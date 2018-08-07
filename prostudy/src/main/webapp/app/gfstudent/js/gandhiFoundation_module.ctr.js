angular.module("prostudyApp").controller(
		"gfModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$localStorage,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside studentModuleCtr");

			$scope.studFlag = true;		

			$scope.menu = '';
			$scope.toggleMenu = function(menu) {
				$scope.menu = menu;
				$scope.schoolCounter;
				$scope.studentsCounter;
				$scope.booksCounter;
				$scope.courierCounter;
		
		//FOR SCHOOL		
				var schoolCounter = angular.fromJson($localStorage.dbSchoolCounter);
				if (typeof schoolCounter === 'undefined')
					schoolCounter = 0;
				
				if(menu == "school"){
					if(schoolCounter == 0){
						$scope.schoolCounter = schoolCounter + 1;
						$localStorage.dbSchoolCounter = angular.toJson($scope.schoolCounter);
					}else{
						$scope.schoolCounter = schoolCounter - 1;
						$localStorage.dbSchoolCounter = angular.toJson($scope.schoolCounter);
					}
				}
			
		//FOR STUDENT
				var studentsCounter = angular.fromJson($localStorage.dbStudentsCounter);
				if (typeof studentsCounter === 'undefined')
					studentsCounter = 0;
				
				if(menu == "students"){
					if(studentsCounter == 0){
						$scope.studentsCounter = studentsCounter + 1;
						$localStorage.dbStudentsCounter = angular.toJson($scope.studentsCounter);
					}else{
						$scope.studentsCounter = studentsCounter - 1;
						$localStorage.dbStudentsCounter = angular.toJson($scope.studentsCounter);
					}
				}
				
		//FOR Book
				var booksCounter = angular.fromJson($localStorage.dbBooksCounter);
				if (typeof booksCounter === 'undefined')
					booksCounter = 0;
				
				if(menu == "books"){
					if(booksCounter == 0){
						$scope.booksCounter = booksCounter + 1;
						$localStorage.dbBooksCounter = angular.toJson($scope.booksCounter);
					}else{
						$scope.booksCounter = booksCounter - 1;
						$localStorage.dbBooksCounter = angular.toJson($scope.booksCounter);
					}
				}
				
		//FOR COURIER
				var courierCounter = angular.fromJson($localStorage.dbCourierCounter);
				if (typeof courierCounter === 'undefined')
					courierCounter = 0;
				
				if(menu == "courier"){
					if(courierCounter == 0){
						$scope.courierCounter = courierCounter + 1;
						$localStorage.dbCourierCounter = angular.toJson($scope.courierCounter);
					}else{
						$scope.courierCounter = courierCounter - 1;
						$localStorage.dbCourierCounter = angular.toJson($scope.courierCounter);
					}
				}		
			}

			/* Setup menu */
			$scope.toggleRight = buildToggler('right');
			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
			 */
			function buildToggler(navID) {
				var debounceFn = $mdUtil.debounce(function() {
					$mdSidenav(navID).toggle().then(function() {
						$log.debug("toggle " + navID + " is done");
					});
				}, 200);
				return debounceFn;
			}
			$scope.back = function() {
				window.history.back();
				// $state.go("^", {});
			};

			$scope.close = function() {
				$mdSidenav('right').close().then(function() {
					$log.debug("close RIGHT is done");
				});
			};

		});