angular.module("prostudyApp").controller(
		"authorityAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state, $stateParams,$mdDialog) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			
		
			$scope.currentInstID = $stateParams.currentInstID;

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Saved Successfully!')
						.position("top").hideDelay(3000));
			};

			$scope.moduleList = ["authority","partnerSchool","setup","proadmin", "exam", "student", "syllabus","scheduledExam",
					"institute", "attendance", "book", "favourite", "report","certificateMgmt","admissionMgmt"]

			$scope.toggleSelection = function toggleSelection(index) {
				$scope.selected[index] = !$scope.selected[index];
			};
			
			$scope.selected = [];
			
			$scope.RoleSecEntity = {
				instituteID : $scope.currentInstID,
				role : "",
				modules : []
			}
		
			$scope.showConfirm = function(ev) {
				
				$log.debug("$scope.isDisabled :"+$scope.isDisabled)
				
				var confirm = $mdDialog.confirm().title(
						'Do you want to continue ?').ariaLabel('Lucky day')
						.targetEvent(ev).ok('YES').cancel('NO');
				$mdDialog.show(confirm).then(function() {
					$scope.status = $state.go("institute.addStandards", {
						currentInstID : $scope.currentInstID
					});
				}, function() {
				
					$scope.status = $state.go("institute");
				});
				
			};

			$scope.addRoleSec = function() {
				$scope.RoleSecEntity.modules = [];
				for (var i = 0; i < $scope.selected.length; i++) {
					if ($scope.selected[i])
						$scope.RoleSecEntity.modules.push($scope.moduleList[i]);
				}

				var UserService = appEndpointSF.getUserService();
				$scope.RoleSecEntity.instituteID = $scope.currentInstID;
				UserService.addOrUpdateRoleSec($scope.RoleSecEntity).then(
						function(msgBean) {
							$scope.showSavedToast();
							$scope.RoleSecEntity = {};
						});
				
				
			}
			
			
			

		});
