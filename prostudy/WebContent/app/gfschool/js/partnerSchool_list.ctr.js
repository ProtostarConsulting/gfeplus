angular
		.module("prostudyApp")
		.controller(
				"partnerSchoolListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF, $state, $sce,
						$stateParams, $q, $mdDialog, $mdMedia, $location,
						$anchorScroll, Upload, ajsCache) {

					$scope.loading = true;
					$scope.query = {
						order : '-autoGenerated',
						limit : 60,
						limitOptions : [ 1000, 2000, 3000, 4000, 5000 ],
						page : 1,
						totalSize : 0,
						totalSizeBackup : 0,
						searchByGrfRegNo : '',
						searchSchoolTxt : '',
						selectedYearOfExam : '',
						entityList : null,
						schoolSelfUpdate : false
					};
					$scope.pSchoolList = [];
					$scope.schools = [];
					$scope.pagingInfoReturned = null;
					$scope.selectedPSchoolId = $stateParams.selectedPSchoolId ? $stateParams.selectedPSchoolId
							: null;
					$scope.refreshListPage = function() {
						// Remove cache and reset everything.
						var schoolListCacheKey = "fetchSchoolsListByPaging";
						ajsCache.remove(schoolListCacheKey);
						$scope.query.page = 1;
						$scope.pagingInfoReturned = null;
						$scope.query.searchByGrfRegNo = "";
						$scope.query.searchSchoolTxt = "";
						$scope.schools = [];
						$scope.pSchoolList = [];
						$scope.onpagechange();
					}

					$scope.onpagechange = function() {
						$scope.loading = true;
						$location.hash('topRight');
						$anchorScroll();

						if ($scope.query.searchSchoolTxt) {
							$scope.loading = false;
							return;
						}

						var schoolListCacheKey = "fetchSchoolsListByPaging";
						// Note this key has to be unique across application
						// else it will return unexpected result.
						if (!angular.isUndefined(ajsCache
								.get(schoolListCacheKey))) {
							$log.debug("Found List in Cache, return it.")
							$scope.queriedSchoolDataCache = ajsCache
									.get(schoolListCacheKey);
							$scope.pSchoolList = $scope.queriedSchoolDataCache.entityList;
							$scope.schools = $scope.pSchoolList;
							$scope.query.totalSize = $scope.queriedSchoolDataCache.totalSize;
							$scope.query.totalSizeBackup = $scope.queriedSchoolDataCache.totalSizeBackup;

						}

						if ($scope.schools.length < ($scope.query.limit * $scope.query.page)) {
							$log
									.debug("Need to fetch this page data from server. Doing so....");
							var pagingInfoTemp = {
								entityList : null,
								startPage : $scope.query.page,
								limit : $scope.query.limit,
								totalEntities : 0,
								webSafeCursorString : $scope.pagingInfoReturned ? $scope.pagingInfoReturned.webSafeCursorString
										: null
							};

							var PartnerService = appEndpointSF
									.getPartnerSchoolService();
							PartnerService
									.fetchSchoolsListByPaging(
											$scope.curUser.instituteID,
											$scope.curUser.instituteObj.yearofExam,
											pagingInfoTemp)
									.then(
											function(pagingInfoReturned) {
												$scope.pagingInfoReturned = pagingInfoReturned;
												if ($scope.pSchoolList.length < pagingInfoReturned.totalEntities) {
													$scope.pSchoolList = $scope.pSchoolList
															.concat(pagingInfoReturned.entityList);
												} else {
													$scope.pSchoolList = pagingInfoReturned.entityList;
												}
												$scope.schools = $scope.pSchoolList;
												$scope.query.totalSize = pagingInfoReturned.totalEntities;
												$scope.query.totalSizeBackup = pagingInfoReturned.totalEntities;

												var schoolListCacheKey = "fetchSchoolsListByPaging";
												$scope.query.entityList = $scope.pSchoolList;
												ajsCache.put(
														schoolListCacheKey,
														$scope.query);

												$scope.loading = false;
											});
						} else {
							$log
									.debug("NOT Need to fetch from server. Just returned...");
							$scope.loading = false;
						}
					}

					$scope.selfUpdateChkClicked = function() {
						if ($scope.query.schoolSelfUpdate) {
							$scope.schools = [];
							var PartnerService = appEndpointSF
									.getPartnerSchoolService();
							PartnerService.getSchoolByselfUpdateStatus().then(
									function(selfUpdateSchoolList) {
										$scope.schools = selfUpdateSchoolList;
									});
						} else {
							$scope.schools = $scope.pSchoolList;
						}
					}

					$scope.searchTextDone = false;
					$scope.searchSchoolTxtChange = function() {
						if ($scope.query.searchSchoolTxt
								&& $scope.query.searchSchoolTxt.length >= 3) {
							$scope.query.searchByGrfRegNo = "";
							$scope.query.page = 1;
							$scope
									.schoolSerachTxtChange($scope.query.searchSchoolTxt
											.trim());
						} else {
							// let user type whole 12 chars of GRF No
							// restore $scope.schools if was filtered
							if ($scope.schools.length !== $scope.pSchoolList.length) {
								$scope.query.page = 1;
								$scope.schools = $scope.pSchoolList;
								$scope.query.totalSize = $scope.query.totalSizeBackup;
							}
						}
					}
					$scope.searchByGrfRegNoChange = function() {
						var enteredGrfRegNo = $scope.query.searchByGrfRegNo
								.trim();
						if (enteredGrfRegNo && enteredGrfRegNo.length >= 5) {
							$scope.query.searchSchoolTxt = "";
							$scope.query.page = 1;
							var grfRegNo = (enteredGrfRegNo
									.startsWith('P-2017-') && enteredGrfRegNo.length >= 12) ? enteredGrfRegNo
									: 'P-2017-' + enteredGrfRegNo;

							$scope.grfRegNoChange(grfRegNo);
						} else {
							// let user type whole 5 chars of GRF No
							// restore $scope.schools if was filtered
							if ($scope.schools.length !== $scope.pSchoolList.length) {
								$scope.query.page = 1;
								$scope.schools = $scope.pSchoolList;
								$scope.query.totalSize = $scope.query.totalSizeBackup;
							}
						}
					}

					$scope.schoolSerachTxtChange = function(searchSchoolTxt) {

						$scope.searchTextDone = true;
						$scope.schools = [];
						$log.debug("Fetcing searchSchoolTxt: "
								+ searchSchoolTxt);
						var partnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						partnerSchoolService
								.searchSchoolByName(searchSchoolTxt)
								.then(
										function(resp) {
											if (resp && resp.length) {
												$scope.schools = $scope.schools
														.concat(resp);
												$scope.query.totalSize = resp.length;
											}

											$scope.searchTextDone = false;
										});
					}

					$scope.iscurUserRole = function() {
						$scope.schools = [];
						$scope.schools.push($scope.curUser.school);
						$scope.loading = false;
					}

					$scope.grfRegNoChange = function(grfRegNo) {

						$scope.searchTextDone = true;
						$scope.schools = [];
						$log.debug("Fetcing GRF No: " + grfRegNo);
						var partnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						partnerSchoolService
								.getSchoolByAutoGeneratedID(grfRegNo)
								.then(
										function(resp) {
											if (resp && resp.items) {
												$scope.schools = $scope.schools
														.concat(resp.items);
												$scope.query.totalSize = resp.items.length;
											} else {
												$scope.query.totalSize = 0;
											}

											$scope.searchTextDone = false;
										});
					}

					$scope.getNextYears = function() {
						var date = new Date();

						for (var i = 0; i < 3; i++) {
							var year = date.getFullYear();
							year = year.toString().substr(2, 2);

							$scope.Years.push(date.getFullYear() + "-"
									+ (Number(year) + 1));
							date.setYear(date.getFullYear() + 1);
						}
					}

					$scope.Years = [];
					$scope.getNextYears();

					$scope.getPrvYears = function() {
						var date = new Date();

						for (var i = 0; i < 3; i++) {
							var year = date.getFullYear();
							year = year.toString().substr(2, 2);

							$scope.Years.push((date.getFullYear() - 1) + "-"
									+ (Number(year)));
							date.setYear(date.getFullYear() - 1);
						}
					}

					$scope.getPrvYears();

					$scope.yearOfExamChanged = function(selectedYearOfExam) {
						// $scope.query.selectedYearOfExam
						// At the moment do nothing.
						var pagingInfoTemp = {
								entityList : null,
								startPage : $scope.query.page,
								limit : $scope.query.limit,
								totalEntities : 0,
								webSafeCursorString : null
							};

							var PartnerService = appEndpointSF
									.getPartnerSchoolService();
							PartnerService
									.fetchSchoolsListByPaging(
											$scope.curUser.instituteID,
											selectedYearOfExam,
											pagingInfoTemp)
									.then(
											function(pagingInfoReturned) {
												$scope.pagingInfoReturned = pagingInfoReturned;
												if ($scope.pSchoolList.length < pagingInfoReturned.totalEntities) {
													$scope.pSchoolList = $scope.pSchoolList
															.concat(pagingInfoReturned.entityList);
												} else {
													$scope.pSchoolList = pagingInfoReturned.entityList;
												}
												$scope.schools = $scope.pSchoolList;
												$scope.query.totalSize = pagingInfoReturned.totalEntities;
												$scope.query.totalSizeBackup = pagingInfoReturned.totalEntities;

												var schoolListCacheKey = "fetchSchoolsListByPaging";
												$scope.query.entityList = $scope.pSchoolList;
												ajsCache.put(
														schoolListCacheKey,
														$scope.query);

												$scope.loading = false;
											});
						
					}

					$scope.cancel = function() {
						$state.go('partnerSchool.listPartnerSchool');
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							// $scope.getPartnerSchoolByInstitute();
							if ($scope.curUser.role == "Admin") {
								$scope.onpagechange();
							}
							if ($scope.curUser.role == "Teacher") {
								$scope.iscurUserRole();
							}

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.downloadData = function() {
						document.location.href = "DownloadPartnerSchools?InstituteId="
								+ $scope.curUser.instituteID;
					}

					$scope.downloadDataByLanguage = function() {
						document.location.href = "DownloadSchoolByLanguage?InstituteId="
								+ $scope.curUser.instituteID;
					}

					// ----------------------UPLODE EXCEL
					// FILE-------------------------------
					$scope.UplodeExcel = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/gfschool/gfBulkSchoolsAdd.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {
												curUser : $scope.curUser,
												getFreshScools : $scope.getPartnerSchoolByInstitute
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

					function DialogController($scope, $mdDialog, curUser,
							getFreshScools) {

						$scope.csvFile;
						$scope.uploadProgressMsg = null;
						$scope.uploadSchoolsCSV = function() {
							var csvFile = $scope.csvFile;
							Upload
									.upload({
										url : 'UplodePartnerSchoolsExcel',
										data : {
											file : csvFile,
											'instituteId' : curUser.instituteID
										}
									})
									.then(
											function(resp) {
												$log
														.debug('Successfully uploaded '
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
												}, 3000);
												// Load the books again in the
												// end

											},
											function(resp) {
												$log
														.debug('Error Ouccured, Error status: '
																+ resp.status);
												$scope.uploadProgressMsg = 'Error: '
														+ resp.status;
											},
											function(evt) {
												var progressPercentage = parseInt(100.0
														* evt.loaded
														/ evt.total);
												$log
														.debug('Upload progress: '
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

					}

					// -----------------------Upload School User-----
					// CSV-------------------
					$scope.UploadSchoolUserExcel = function(ev,
							selectedPSchoolId) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/gfschool/uploadSchoolUser.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {
												curUser : $scope.curUser,
												selectedPSchoolId : selectedPSchoolId
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

					function DialogController($scope, $mdDialog, curUser,
							selectedPSchoolId) {

						$scope.csvFile;
						$scope.uploadProgressMsg = null;
						$scope.uploadSchoolUserCSV = function() {
							var csvFile = $scope.csvFile;
							Upload
									.upload(
											{
												url : 'UploadPartnerSchoolUser',
												data : {
													file : csvFile,
													'instituteId' : curUser.instituteID,
													'partnerSchoolID' : selectedPSchoolId
												}
											})
									.then(
											function(resp) {
												$log
														.debug('Successfully uploaded '
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
																		'School User Data Uploaded Sucessfully.')
																.position("top")
																.hideDelay(3000));

												$scope.csvFile = null;
												$timeout(function() {
													$scope.cancel();
												}, 3000);
												// Load the books again in the
												// end

											},
											function(resp) {
												$log
														.debug('Error Ouccured, Error status: '
																+ resp.status);
												$scope.uploadProgressMsg = 'Error: '
														+ resp.status;
											},
											function(evt) {
												var progressPercentage = parseInt(100.0
														* evt.loaded
														/ evt.total);
												$log
														.debug('Upload progress: '
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

					}

				});