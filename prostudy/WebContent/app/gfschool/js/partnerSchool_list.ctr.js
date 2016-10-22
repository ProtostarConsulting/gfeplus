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
						entityList : null
					};
					$scope.pSchoolList = [];
					$scope.schools = [];
					$scope.pagingInfoReturned = null;

					$scope.refreshListPage = function() {
						var schoolListCacheKey = "fetchSchoolsListByPaging";
						ajsCache.remove(schoolListCacheKey);
						$scope.query.page = 1;
						$scope.schools = [];
						$scope.onpagechange();
					}

					$scope.onpagechange = function() {
						$scope.loading = true;
						$location.hash('topRight');
						$anchorScroll();

						var schoolListCacheKey = "fetchSchoolsListByPaging";
						// Note this key has to be unique across application
						// else it will return unexpected result.
						if (!angular.isUndefined(ajsCache
								.get(schoolListCacheKey))) {
							$log.debug("Found List in Cache, return it.")
							$scope.quriedSchoolDataCache = ajsCache
									.get(schoolListCacheKey);
							$scope.pSchoolList = $scope.quriedSchoolDataCache.entityList;
							$scope.schools = $scope.pSchoolList;
							$scope.query.totalSize = $scope.quriedSchoolDataCache.totalSize;

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
											pagingInfoTemp)
									.then(
											function(pagingInfoReturned) {
												$scope.pagingInfoReturned = pagingInfoReturned;
												$scope.pSchoolList = $scope.pSchoolList
														.concat(pagingInfoReturned.entityList);
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

					$scope.searchTextDone = false;
					$scope.searchSchoolTxtChange = function() {
						if ($scope.query.searchSchoolTxt
								&& $scope.query.searchSchoolTxt.length >= 12) {
							$scope.query.page = 1;
							$scope
									.schoolSerachTxtChange($scope.query.searchSchoolTxt
											.trim());
						} else {
							// let user type whole 12 chars of GRF No
							// restore $scope.schools if was filtered
							if ($scope.schools.length !== $scope.pSchoolList.length) {
								$scope.schools = $scope.pSchoolList;
								$scope.query.totalSize = $scope.query.totalSizeBackup;
							}
						}
					}
					$scope.searchByGrfRegNoChange = function() {
						if ($scope.query.searchByGrfRegNo
								&& $scope.query.searchByGrfRegNo.length >= 12) {
							$scope.query.page = 1;
							$scope.grfRegNoChange($scope.query.searchByGrfRegNo
									.trim());
						} else {
							// let user type whole 12 chars of GRF No
							// restore $scope.schools if was filtered
							if ($scope.schools.length !== $scope.pSchoolList.length) {
								$scope.schools = $scope.pSchoolList;
								$scope.query.totalSize = $scope.query.totalSizeBackup;
							}
						}
					}

					$scope.schoolSerachTxtChange = function(searchSchoolTxt) {

						$scope.searchTextDone = true;
						$scope.schools = [];
						$scope.foundSchool = null;
						$log.debug("Fetcing searchSchoolTxt: "
								+ searchSchoolTxt);
						var partnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						partnerSchoolService
								.searchSchoolByName(searchSchoolTxt)
								.then(
										function(resp) {
											if (resp.length) {
												$scope.schools = $scope.schools
														.concat(resp);
												$scope.query.totalSize = resp.length;
											}

											$scope.searchTextDone = false;
										});
					}

					$scope.grfRegNoChange = function(grfRegNo) {

						$scope.searchTextDone = true;
						$scope.schools = [];
						$scope.foundSchool = null;
						$log.debug("Fetcing GRF No: " + grfRegNo);
						var partnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						partnerSchoolService.getSchoolByAutoGeneratedID(
								grfRegNo).then(function(resp) {
							if (resp.result.id) {
								$scope.schools.push(resp);
								$scope.query.totalSize = 1;
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

					$scope.yearOfExamChanged = function() {
						// $scope.query.selectedYearOfExam
						// At the moment do nothing.
					}

					$scope.cancel = function() {
						$state.go('partnerSchool.listPartnerSchool');
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							// $scope.getPartnerSchoolByInstitute();
							$scope.onpagechange();

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

					/*
					 * function DialogController($scope, $mdDialog, curuser) {
					 * 
					 * $scope.insId = curuser.instituteID; $scope.loding =
					 * false; $scope.uplodeExcel = function() { $scope.loding =
					 * true; document.excelform.action =
					 * $scope.PartnerSchoolsUploadURL; // calling servlet action
					 * document.excelform.submit(); }
					 * 
					 * $scope.getLogUploadURL = function() { var
					 * uploadUrlService = appEndpointSF .getuploadURLService();
					 * uploadUrlService .getPartnerSchoolsUploadURL() .then(
					 * function(url) { $scope.PartnerSchoolsUploadURL = url.msg;
					 * }); } $scope.PartnerSchoolsUploadURL;
					 * 
					 * $scope.waitForServiceLoad = function() { if
					 * (appEndpointSF.is_service_ready) {
					 * $scope.getLogUploadURL(); } else { $log.debug("Services
					 * Not Loaded, watiting...");
					 * $timeout($scope.waitForServiceLoad, 1000); } }
					 * $scope.waitForServiceLoad(); } //
					 * -------------------------------------------------------
					 */
				});