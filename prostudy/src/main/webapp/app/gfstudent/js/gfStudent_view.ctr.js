angular.module("prostudyApp").controller(
		"gfStudentviewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF, tableTestDataFactory,
				$state, $timeout, appEndpointSF, $stateParams) {

			$scope.standardList = [ "Medical College", "New English School",
			    					"Chattrapati Shivaji Vidyalay", "Bharati Vidyalay" ];
			    			$scope.answerOfMediumList = [ "Marathi", "Hindi", "English", ];

			$scope.selectedGFStudID = $stateParams.selectedGFStudID;
			
			$scope.getGFStudentById = function() {

				var gfStudentService = appEndpointSF.getGFStudentService();
				gfStudentService.getGFStudentById($scope.selectedGFStudID)
						.then(function(tempStudent) {
							$scope.tempStudent = tempStudent;

						});
			}

			$scope.getPartnerByInstitute = function() {

				var PartnerSchoolService = appEndpointSF
						.getPartnerSchoolService();
				PartnerSchoolService.getPartnerByInstitute(
						$scope.curUser.instituteID).then(function(pSchoolList) {
					$scope.pSchoolList = pSchoolList;

				});
			}

			$scope.cancel = function() {
				$state.go('gandhifoundation');
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {

					if ( $scope.selectedGFStudID != "") {
						$scope.getGFStudentById();
					} 
						$scope.getPartnerByInstitute();
					
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}

			$scope.waitForServiceLoad();

		});
