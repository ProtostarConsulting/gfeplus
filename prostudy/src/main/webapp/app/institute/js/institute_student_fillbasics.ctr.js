angular.module("prostudyApp")
.controller(
		"instituteStudentFillbasicsCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF, tableTestDataFactory,$state,
				appEndpointSF,$stateParams) {
			
			$scope.stud = $stateParams.currstud;			
			$log.debug("$scope.stud"+$scope.stud);
				
			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			
			$scope.currentInstID=$scope.curUser.instituteID;
			
			if($stateParams.currentInstID)
			{
				$scope.currentInstID = $stateParams.currentInstID;
				$log.debug("$scope.currentInstID"+$scope.currentInstID);
				
			}
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Student Data Saved!')
						.position("top").hideDelay(3000));
			};
					
			
			$scope.standards = [];
			$scope.divisions = [];
			$scope.subjects = [];			
			
			$scope.selectedStdID;
			$scope.stdList;
			$scope.divList;
			$scope.subList;
			
		
			$scope.getStandardByInstitute = function() {

				var StudentService = appEndpointSF
						.getStudentService();
				StudentService.getStandardByInstitute($scope.currentInstID).then(
						function(standardList) {
							$scope.stdList = standardList;							
							for(var i=0; i< $scope.stdList.length; i++)
								{
									$scope.standards.push($scope.stdList[i].name);									
								}	
							$log.debug("$scope.standards "+angular.toJson($scope.standards ));							
						});
			}
			
			
			
			$scope.getDivisionByStandard = function() {
				$scope.divisions=[];
				for(var i=0;i< $scope.stdList.length;i++)
				{
					if($scope.tempStudent.standard == $scope.stdList[i].name)
					{
						$scope.selectedStdID = $scope.stdList[i].id;
					}
				}
				var StudentService = appEndpointSF
						.getStudentService();
				StudentService.getDivisionByStandard($scope.selectedStdID).then(
						function(divisionList) {
							$scope.divList = divisionList;
							for(var i=0; i< $scope.divList.length; i++)
							{
								$scope.divisions.push($scope.divList[i].name);
							}
							
						});
			}
			$scope.subjects=[];
			$scope.getSubjectByDivision = function() {
			
				for(var i=0;i<$scope.divList.length;i++)
				{
					if($scope.tempStudent.division == $scope.divList[i].name)
					{
						$scope.selectedDivID = $scope.divList[i].id;
					}
				}
				var StudentService = appEndpointSF.getStudentService();
				StudentService.getSubjectByDivision($scope.selectedDivID).then(
						function(subjectList) {
							for(var i=0; i< subjectList.length; i++)
							{
								$scope.subjects.push(subjectList[i].id,subjectList[i].name);
							}
							$scope.subjects=subjectList;
							$scope.gotSubject=true;
						});				
			}
			$scope.selection = [];
		
		  	$scope.toggleSelection = function toggleSelection(subject) {
				var idx = $scope.selection.indexOf(subject);
				if (idx > -1) {
					$scope.selection.splice(idx, 1);
				} else {
					$scope.selection.push(subject);
				}

			};
			
		/*	$scope.getUserByEmailID = function() {

				var UserService = appEndpointSF.getUserService();
				
				UserService.getUserByEmailID($scope.currStudEmailId).then(
						function(currstud) {							
							$scope.stud = currstud;	
							$log.debug("$scope.stud "+$scope.stud );
						});
			}*/	
			

			$scope.tempStudSub = {					
					studID : "",
					subID : "",
					active: true
				};
			
			$scope.addStudSubject = function() {
				
				var StudSubService = appEndpointSF.getStudSubService();
				$scope.tempStudSub.studID=$scope.stud;			
				
				for(var i=0;i<$scope.selection.length;i++)
				{
					$scope.tempStudSub.subID=$scope.selection[i];
					
				StudSubService.addStudSubject($scope.tempStudSub).then(
						function(msgBean) {							
						});
				}
			}			
			
			$scope.updateUser = function() {
				$scope.stud.standard=$scope.tempStudent.standard;
				$scope.stud.division=$scope.tempStudent.division;
				
				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.stud).then(
						function(msgBean) {						
							$scope.addStudSubject();
							$scope.showSavedToast();
							$state.go("^", {});
						});
			}		
			
			$scope.cancelButton = function() {
				$state.go("^", {});
			}
			$scope.waitForServiceLoad = function() {
				  if (appEndpointSF.is_service_ready) {					  
				//	  $scope.getUserByEmailID();
						$scope.getStandardByInstitute();				  
				  } 
				  else {
				   $log.debug("Services Not Loaded, watiting...");
				   $timeout($scope.waitForServiceLoad, 1000);
				  }
				 }				  
				 $scope.waitForServiceLoad();
			
			
			
			
		});
