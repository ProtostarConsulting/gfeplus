angular.module("prostudyApp").controller(
		"instituteAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory) {

			$scope.loadInstituteList = function() {
				console.log("inside loadInstituteList")
				$scope.institutes = [];
				$scope.selected = [];
				tableTestDataFactory.getInstituteList().then(
						function(data) {
							$scope.institutes = data;
							$log.debug("inside ctr then $scope.institutes"
									+ $scope.institutes);
							console.log("inside institute")
						});

				$scope.editingData = [];

				$scope.addInstitute = function() {
					var institute = {
						name : $scope.name,
						city : $scope.city,
						state : $scope.state,

					};
					$scope.institutes.push(institute);
				};

			}// end of loadInstituteList load

			$scope.loadInstituteList();

		});
