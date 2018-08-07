angular
		.module("prostudyApp")
		.controller(
				"gfStudentListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $mdDialog, $mdMedia,Upload,ajsCache,
						tableTestDataFactory, appEndpointSF) {
					console.log("Inside studentListPageCtr");

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Assigned to Student!')
								.position("top").hideDelay(3000));
					};
					$scope.query = {
						order : 'standard',
						limit : 50,
						page : 1
					};

					// $scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();
					$scope.students = [];
					
					$scope.getGFStudentsByInstitute = function(refresh) {

						var studentListCacheKey = "getGFStudentsByInstitute";
						// Note this key has to be unique across application
						// else it will return unexpected result.
						if (!angular
								.isUndefined(ajsCache.get(studentListCacheKey)) && !refresh) {
							$log.debug("Found List in Cache, return it.")
							$scope.gfStudentList = ajsCache
									.get(studentListCacheKey);
							return;
						}
						
						$scope.loading = true;
						var gfStudentService = appEndpointSF
								.getGFStudentService();
						gfStudentService.getGFStudentsByInstitute(
								$scope.curUser.instituteID).then(
								function(gfStudentList) {
									$scope.gfStudentList = gfStudentList;
									ajsCache.put(studentListCacheKey,
											gfStudentList);
									$scope.loading = false;
								});
					}

					$scope.getPartnerByInstitute = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.getPartnerByInstitute(
								$scope.curUser.instituteID).then(
								function(pSchoolList) {
									$scope.pSchoolList = pSchoolList;
								});
					}
					
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							if ($scope.examStudent != undefined) {
								$scope.getStudentByExam();
							} else {
								$scope.getGFStudentsByInstitute();
								$scope.getPartnerByInstitute();		
								
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					
					$scope.downloadCertificate = function(id) {
						window.open("PrintCertificatePdf?id="+id);
					}

					$scope.waitForServiceLoad();
					$scope.selectedSchoolID;
					$scope.UplodeExcel = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/gandhiFoundation/gfBulkStudentUpload.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {
												curUser : $scope.curUser,
												getFreshSchools : $scope.getPartnerByInstitute,
												getFreshStudents : $scope.getGFStudentsByInstitute,
												selectedSchoolID : $scope.selectedSchoolID
											}
										})
								.then(
										function(answer) {
											$scope.status = 'You said the information was "'
													+ answer + '".';
										},
										function() {
											$scope.status = 'You cancelled the dialog.';
										});

					};

					function DialogController($scope, $mdDialog, curUser, getFreshSchools, selectedSchoolID) {
						$scope.insId = curUser.instituteID;
						$scope.csvFile;
						$scope.uploadProgressMsg = null;
						$scope.uploadStudentsCSV = function() {
							var csvFile = $scope.csvFile;
							Upload
									.upload(
											{
												url : 'UploadBulkGFStudentServlet',
												data : {
													file : csvFile,
													'username' : curUser.email_id,
													'selectedSchoolID' : $scope.selectedSchoolID
												}
											})
									.then(
											function(resp) {
												$log.debug('Successfully uploaded '
																+ resp.config.data.file.name
																+ '.'
																+ angular
																		.toJson(resp.data));
												$scope.uploadProgressMsg = 'Successfully uploaded '
														+ resp.config.data.file.name
														+ '.';
												$mdToast
														.show($mdToast
																.simple()
																.content(
																		'Students Data Uploaded Sucessfully.')
																.position("top")
																.hideDelay(3000));
												
												$scope.csvFile = null;
												$timeout(function() {
													$scope.cancel();
													},3000);
												//Load the books again in the end
												getFreshStudents();
											},
											function(resp) {
												$log.debug('Error Ouccured, Error status: '
																+ resp.status);
												$scope.uploadProgressMsg = 'Error: '
														+ resp.status;
											},
											function(evt) {
												var progressPercentage = parseInt(100.0
														* evt.loaded
														/ evt.total);
												$log.debug('Upload progress: '
																+ progressPercentage
																+ '% '
																+ evt.config.data.file.name);
												$scope.uploadProgressMsg = 'Upload progress: '
														+ progressPercentage
														+ '% '
														+ evt.config.data.file.name;
												+'...'
											});
							
						};
						$scope.cancel = function() {
						    $mdDialog.cancel();
						  };
						$scope.getSchoolID = function() {
							$scope.selectedSchoolID = $scope.selectedSchool.id;

						}
						
						$scope.getPartnerSchoolByInstitute = function() {

							var PartnerService = appEndpointSF
									.getPartnerSchoolService();
							PartnerService.getPartnerByInstitute($scope.insId)
									.then(function(pSchoolList) {
										$scope.pSchoolList = pSchoolList;

									});
						}
						$scope.waitForServiceLoad = function() {
							if (appEndpointSF.is_service_ready) {
								$scope.getPartnerSchoolByInstitute();
								
							} else {
								$log.debug("Services Not Loaded, watiting...");
								$timeout($scope.waitForServiceLoad, 1000);
							}
						}
						$scope.waitForServiceLoad();					}

					$scope.downloadData=function(){
						
						document.location.href="DownloadGFStudents?InstituteId="+$scope.curUser.instituteID;
						
					}
				});