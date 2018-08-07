angular
		.module("prostudyApp")
		.controller(
				"gfBookListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $mdDialog, $mdMedia, $stateParams,
						tableTestDataFactory, ajsCache, $state, Upload,
						appEndpointSF) {
					console.log("Inside studentListPageCtr");
					$scope.loading = true;
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Assigned to Student!')
								.position("top").hideDelay(3000));
					};
					$scope.query = {
						order : 'description',
						limit : 10,
						page : 1
					};

					$scope.courierTypelist = [ "Book", "Certificate",
							"Error Certificate", "Error Books",
							"Prize Certificate" ];

					$scope.getGFBookByInstituteId = function(refresh) {
						$scope.loading = true;
						var bookListCacheKey = "getGFBookByInstituteId";
						// Note this key has to be unique across application
						// else it will return unexpected result.
						if (!angular
								.isUndefined(ajsCache.get(bookListCacheKey))
								&& !refresh) {
							$log.debug("Found List in Cache, return it.")
							$scope.bookStocks = ajsCache.get(bookListCacheKey);
							$scope.loading = false;
							return;
						}

						$log
								.debug("NOT Found List in Cache, fetching from server.")

						var gfBookStockService = appEndpointSF
								.getGFBookStockService();
						gfBookStockService.getGFBookByInstituteId(
								$scope.curUser.instituteID).then(
								function(tempBooks) {
									$scope.bookStocks = tempBooks;
									ajsCache.put(bookListCacheKey, tempBooks);
									$scope.loading = false;
									$log.debug("Got books form Server...");

								});
					}

					/*$scope.fetchSchoolByBId = function(id) {
						$scope.schoolList = [];
						$scope.totalBookQty = 0;
						var partnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						partnerSchoolService
								.getSchoolByBId(id)
								.then(
										function(schoolList) {
											$scope.schoolList = schoolList;
											
											 * for (var i = 0; i <
											 * schoolList.length; i++) {
											 * $scope.totalBookQty +=
											 * schoolList.examDetailList.bookSummary.bookDetail.totalStud; }
											 
											for (var k = 0; k < schoolList.length; k++) {
												for (var i = 0; i < schoolList[k].examDetailList.length; i++) {

													for (j = 0; j < schoolList[k].examDetailList[i].bookSummary.bookDetail.length; j++) {
														if (id == schoolList[k].examDetailList[i].bookSummary.bookDetail[j].bookName) {
															$scope.totalBookQty = $scope.totalBookQty
																	+ schoolList[k].examDetailList[i].bookSummary.bookDetail[j].totalStud;

														} else {
															console
																	.log("oooooooo");
														}

													}

												}
											}
											console.log("bookQty---"
													+ $scope.totalBookQty);
											console.log("schoolList---"
													+ $scope.schoolList);
											
										});
					}*/

					$scope.UplodeExcel = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/gfbookstock/gfBulkBooksUpload.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {
												curUser : $scope.curUser,
												getFreshBooks : $scope.getGFBookByInstituteId
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
							getFreshBooks) {

						$scope.csvFile;
						$scope.uploadProgressMsg = null;

						$scope.uploadBooksCSV = function() {
							$scope.loading = true;
							var csvFile = $scope.csvFile;
							Upload
									.upload({
										url : 'UploadBulkBookServlet',
										data : {
											file : csvFile,
											'username' : curUser.email_id,
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
																		'Books Data Uploaded Sucessfully.')
																.position("top")
																.hideDelay(3000));

												$scope.csvFile = null;
												$timeout(function() {
													$scope.cancel();
												}, 3000);
												// Load the books again in the
												// end
												getFreshBooks(true);
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

												/*
												 * if(progressPercentage ==
												 * 100%){ }
												 */
											});
						};

						$scope.cancel = function() {
							$mdDialog.cancel();
						};
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getGFBookByInstituteId(true);
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.cancel = function() {
						$state.go("bookModule.list", {});
					}

					$scope.downloadData = function() {

						document.location.href = "DownloadGFBooks?InstituteId="
								+ $scope.curUser.instituteID;

					}

					$scope.threshold = false;
					$scope.bookStocks1 = [];
					$scope.showThresholdBooks = function() {
						$scope.threshold = !$scope.threshold;
						$scope.bookStocks1 = [];
						if ($scope.threshold == true) {
							for (var i = 0; i < $scope.bookStocks.length; i++) {
								if ($scope.bookStocks[i].bookQty < $scope.bookStocks[i].bookThreshold) {
									$scope.bookStocks1
											.push($scope.bookStocks[i]);
								}
							}
							$scope.bookStocks = $scope.bookStocks1;
						} else {
							$state.reload();
						}

					}

					

				});