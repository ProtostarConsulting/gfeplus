angular.module("prostudyApp").controller(
		"syllabusAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF, $filter,boardList,
				$log) {

		
			$scope.boards = [ {} ];
			$scope.boards = boardList;
		
			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Syllabus Data Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.standards = [];
			$scope.divisions = []; 
			$scope.subjects = []; 
			
			$scope.selectedStdID;
			$scope.stdList;
			$scope.divList;
			$scope.subList;
			
			$scope.tempSyllabus = {
				syllabusId : "",
				instituteID : $scope.curUser.instituteID,
				board : "",
				standard : "",
				division : "",
				subject : "",
				chapterName : "",
				chapterContent : ""
			};

			$scope.getStandardByInstitute = function() {

				var StudentService = appEndpointSF
						.getStudentService();
				StudentService.getStandardByInstitute($scope.curUser.instituteID).then(
						function(standardList) {
							for(var i=0; i< standardList.length; i++)
								{
									$scope.standards.push(standardList[i].name);
									
								}
							$scope.stdList = standardList;
							
						});
			}
			
			$scope.getStandardByInstitute();
			
			$scope.getDivisionByStandard = function() {
			
				for(var i=0;i< $scope.stdList.length;i++)
				{
					if($scope.tempSyllabus.standard == $scope.stdList[i].name)
					{
						$scope.selectedStdID = $scope.stdList[i].id;
					}
				}
				var StudentService = appEndpointSF
						.getStudentService();
				StudentService.getDivisionByStandard($scope.selectedStdID).then(
						function(divisionList) {
							for(var i=0; i< divisionList.length; i++)
							{
								$scope.divisions.push(divisionList[i].name);
							}
							$scope.divList = divisionList;
						});
			}
			
			$scope.getSubjectByDivision = function() {
				
				for(var i=0;i<$scope.divList.length;i++)
				{
					if($scope.tempSyllabus.division == $scope.divList[i].name)
					{
						$scope.selectedDivID = $scope.divList[i].id;
					}
				}
				var StudentService = appEndpointSF.getStudentService();
				StudentService.getSubjectByDivision($scope.selectedDivID).then(
						function(subjectList) {
							for(var i=0; i< subjectList.length; i++)
							{
								$scope.subjects.push(subjectList[i].name);
							}

						});
				$scope.subjects.splice(0,$scope.subjects.length);
			}
			
			$scope.addSyllabus = function() {
			
				var SyllabusService = appEndpointSF.getSyllabusService();
				SyllabusService.addSyllabus($scope.tempSyllabus).then(
						function(msgBean) {
							
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempSyllabus = {};

						});
				
			}
			
			$scope.cancelButton = function() {
				$state.go("^", {});
			}

		});
