angular
		.module("prostudyApp")
		.controller(
				"gfStartExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, $location, $anchorScroll, $filter, objectFactory,
						answerOfMediumList, standardList) {

					$scope.loading = true;
					$scope.standardList = standardList

					var gfStudentService = appEndpointSF.getGFStudentService();
					var partnerSchoolService = appEndpointSF
							.getPartnerSchoolService();

					$scope.reviewByGrfRegNo = $stateParams.reviewByGrfRegNo;

					$scope.answerOfMediumList = answerOfMediumList;
					$scope.standardList = standardList
					$scope.practiceExamList = [];
					$scope.data = {
						grfRegNo : '',
						coordinatorMobileNumberEntered : '',
						foundValidRecord : false,
						errorMsg : '',
						guestSuccessMsg : ''
					};

					$scope.tempStudent = {
						fName : '',
						mName : '',
						lName : '',
						standard : '',
						mediumOfAnswer : '',
						gender : '',
						school : '',
						role : 'Student',
						language:''	
					}

					$scope.selectedGFStudID = $stateParams.selectedGFStudID;

					$scope.grfRegNoChange = function(grfRegNo) {

						$scope.loading = true;
						$scope.currentSchoolStandardList = [];
						$scope.foundSchool = null;
						$scope.data.foundValidRecord = false;
						$scope.data.guestSuccessMsg = '';

						partnerSchoolService
								.getSchoolByAutoGeneratedID(grfRegNo)
								.then(
										function(resp) {

											if (resp.items && resp.items.length) {
												$scope.foundSchool = resp.items[0];
											}
											if ($scope.foundSchool == null) {
												$scope.data.errorMsg = "This GRF. Reg. No. is not found. Please correct it and try. Please contact GRF office.";
												$scope.loading = false;
												return;
											} else {
												var studPerStd = 3;
												// three students/results per
												// std
												var contactDetail = $scope.foundSchool.contactDetail;
												$scope.coordinatorDetail = null;
												if (contactDetail.coordinatorDetail != undefined
														&& contactDetail.coordinatorDetail.length > 0) {
													$scope.coordinatorDetail = contactDetail.coordinatorDetail[0];
												}
												var userEnteredCoOrdMobileNo = '91'
														+ $scope.data.coordinatorMobileNumberEntered;
												// Check this only if user is
												// not logged-in
												if (!$scope.curUser
														&& ($scope.coordinatorDetail == null || userEnteredCoOrdMobileNo
																.indexOf($scope.coordinatorDetail.coordinatorMobileNum) == -1)) {
													$scope.data.errorMsg = "Entered co-ordinator number did not match with our records. Please contact GRF office.";
													$scope.loading = false;
													return;
												}
												// find show next form
												$scope.data.foundValidRecord = true;
												$scope.loading = false;
												// Load exams list, you will
												// need it soon
												$scope
														.getPracticeExamByInstitute();

											}

										});
					}

					$scope.addGFStudentAndStartExam = function() {
						$scope.tempStudent.instituteID = $scope.foundSchool.instituteID;
						$scope.tempStudent.school = $scope.foundSchool;
						
						gfStudentService
								.addGFStudent($scope.tempStudent)
								.then(
										function(resp) {

											// find and start the student test
											var foundExam = null;
											angular
													.forEach(
															$scope.practiceExamList,
															function(exam) {
																$log.debug("exam: " + exam.examtitle);
																if (exam.standard == $scope.tempStudent.standard && exam.category == $scope.tempStudent.language) {
																	foundExam = exam;
																}
															});
											if (foundExam == null) {
												$scope.data.guestSuccessMsg = "Sorry! There is no exam for this stardard. Please inform your teacher and contact GRF office.";
											} else {

												$scope.curUser = {
													id : resp.id,
													firstName : $filter('uppercase')(resp.fName),
													lastName : '',
													email_id : resp.fName
															.replace(/\s/g, '-')
															+ '@gvsp.com',
													instituteID : $scope.foundSchool.instituteID
												};

												appEndpointSF
														.getLocalUserService()
														.saveLoggedInUser(
																$scope.curUser);

												$state
														.go(
																'exam.practiceexamtest',
																{
																	selectedExamId : foundExam.id,
																	foundSchool: $scope.foundSchool,
																	foundSchool: $scope.foundSchool
																});
											}
										});
					}

					$scope.getPracticeExamByInstitute = function() {
						$log
								.debug("###Inside practiceExamTestCtr###getPracticeExamByInstitute");
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService.getPracticeExamByInstitute(
								$scope.foundSchool.instituteID).then(
								function(practiceExamList) {
									$scope.practiceExamList = practiceExamList;
								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.loading = false;
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.query = {
						order : 'description',
						limit : 120,
						page : 1
					};

					$scope.cancelButton = function() {
						$state.go("studentModule", {});
					}

					$scope.getStandardLabelStyle = function() {
						return {
							'padding-top' : '5px'
						};

					}
					$scope.getStudNameStyle = function() {
						return {
							'padding-left' : '100px',
							'padding-right' : '50px',
						};

					}

					$scope.getFormRowStyle = function() {
						return {
							'padding-top' : '1px',
							'padding-bottom' : '2px'
						};

					}
				});