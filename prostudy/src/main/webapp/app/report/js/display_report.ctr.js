angular.module("prostudyApp").controller(
		"displayReportCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tempInstitute = {name: "", email_id: "", phone_no:"", address:""};
			$scope.institutes = []; 
			
			$scope.getInstituteById = function() {

				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.curUser.instituteID)
						.then(function(instituteList) {
							$scope.institutes.push(instituteList);
							$log.debug("$scope.institutes :"+angular.toJson($scope.institutes));

						});
			}
			

			$scope.getInstituteById();

		});
