angular.module("prostudyApp").controller(
		"instituteEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.selected = [];

			$scope.tempInstitute = {
				name : "",
				email_id : "",
				phone_no : "",
				address : {}
			};
			$scope.institutes = [];

			$scope.addInstitute = function() {
				
				var InstituteService = appEndpointSF.getInstituteService();

				InstituteService.addInstitute($scope.tempInstitute).then(
						function(msgBean) {

							$scope.showSavedToast();
							$scope.tempInstitute = {
								name : "",
								email_id : "",
								phone_no : "",
								address : ""
							};
						});

			}

			$scope.getInstitutes = function() {

				var InstituteService = appEndpointSF.getInstituteService();

				InstituteService.getInstitutes().then(function(instituteList) {
					$log.debug("Inside Ctr getInstitutes");
					$scope.institutes = instituteList;
				});
			}

			$scope.editingData = [];

			$scope.modify = function(selectedInstitute) {
				$scope.editingData[selectedInstitute.name] = true;
				$scope.institute = selectedInstitute;
			};

			$scope.update = function(institutes) {
				$scope.editingData[institutes.name] = false;
			};// end of update

			$scope.removeInstitute = function(index) {

				delete $scope.selected;
			}; // end of remove

			
			$scope.waitForServiceLoad = function() {
				  if (appEndpointSF.is_service_ready) {					  
					  $scope.getInstitutes();			  
				  } 
				  else {
				   $log.debug("Services Not Loaded, watiting...");
				   $timeout($scope.waitForServiceLoad, 1000);
				  }
				 }
				  
				 $scope.waitForServiceLoad();

		});
