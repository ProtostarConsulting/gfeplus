angular
		.module("prostudyApp")
		.controller(
				"gfExamResultListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, $location, $anchorScroll, ajsCache) {

					var examResultListCacheKey = "gf-examResultListCache";
					$scope.pagingInfoReturned = null;
					$scope.examResultList = [];
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.query = {
						order : '-createdDate',
						limit : 60,
						limitOptions : [ 1000, 2000, 3000, 4000, 5000 ],
						page : 1,
						totalSize : 0,
						totalSizeBackup : 0,
						searchByGrfRegNo : '',
						searchSchoolTxt : '',
						pendingResults : false,
						grfReviewed : false,
						entityList : null,

					};

					$scope.getExamResultEntities = function() {
						var gfStudentService = appEndpointSF
								.getGFStudentService();
						$scope.loading = true;
						gfStudentService
								.getExamResultEntities(
										$scope.curUser.instituteID)
								.then(
										function(resp) {
											$scope.examResultList = resp.items;
											$scope.examResultListBackup = $scope.examResultList;

											$scope.pendingGrfReview();
											$scope.loading = false;
										});
					}

					$scope.getExamResultEntitiesByGrfNo = function() {
						var gfStudentService = appEndpointSF
								.getGFStudentService();
						$scope.loading = true;

						var PartnerService = appEndpointSF
								.getPartnerSchoolService();

						PartnerService
								.getSchoolByAutoGeneratedID(
										$scope.selectFilterData.grfRegNo,$scope.curUser.instituteObj.yearofExam)
								.then(
										function(schoolObj) {
											gfStudentService
													.serachExamResultEntitiesBySchool(
															schoolObj)
													.then(
															function(resp) {
																$scope.filteredExamResultList = resp.items;
																$scope.loading = false;
															});
										});

					}

					$scope.refreshListPage = function() {
						// Remove cache and reset everything.
						ajsCache.remove(examResultListCacheKey);
						$scope.query.page = 1;
						$scope.pagingInfoReturned = null;
						$scope.query.searchByGrfRegNo = "";
						$scope.query.searchSchoolTxt = "";
						$scope.query.pendingResults = false;
						$scope.query.grfReviewed = false;
						$scope.examResultList = [];
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

						// Note this key has to be unique across application
						// else it will return unexpected result.
						if (!angular.isUndefined(ajsCache
								.get(examResultListCacheKey))) {
							$log.debug("Found List in Cache, return it.")
							$scope.queriedExamResultDataCache = ajsCache
									.get(examResultListCacheKey);
							$scope.examResultList = $scope.queriedExamResultDataCache.entityList;
							$scope.query.totalSize = $scope.queriedExamResultDataCache.totalSize;
							$scope.query.totalSizeBackup = $scope.queriedExamResultDataCache.totalSizeBackup;

						}

						if ($scope.examResultList.length < ($scope.query.limit * $scope.query.page)
								&& ($scope.query.totalSize == 0 || $scope.examResultList.length < $scope.query.totalSize)) {
							$log
									.debug("Need to fetch this page data from server....");
							var pagingInfoTemp = {
								entityList : null,
								startPage : $scope.query.page,
								limit : $scope.query.limit,
								totalEntities : 0,
								webSafeCursorString : $scope.pagingInfoReturned ? $scope.pagingInfoReturned.webSafeCursorString
										: null
							};

							var gfStudentService = appEndpointSF
									.getGFStudentService();
							if ($scope.query.pendingResults) {
								gfStudentService
										.fetchExamResultPendingByPaging(
												$scope.curUser.instituteID,
												$scope.curUser.instituteObj.yearofExam)
										.then(
												function(pagingInfoReturned) {
													initpagingInfoReturned(pagingInfoReturned);
													$scope.loading = false;
												});
							} else {
								gfStudentService
										.fetchExamResultByPaging(
												$scope.curUser.instituteID,
												$scope.curUser.instituteObj.yearofExam,
												pagingInfoTemp)
										.then(
												function(pagingInfoReturned) {
													initpagingInfoReturned(pagingInfoReturned);
													$scope.loading = false;
												});
							}
						} else {
							$log
									.debug("NOT Need to fetch from server. Just returned...");
							$scope.loading = false;
						}
					}

					function initpagingInfoReturned(pagingInfoReturned) {
						$scope.pagingInfoReturned = pagingInfoReturned;
						if ($scope.examResultList.length < pagingInfoReturned.totalEntities) {
							$scope.examResultList = $scope.examResultList
									.concat(pagingInfoReturned.entityList);
						} else {
							$scope.examResultList = pagingInfoReturned.entityList;
						}
						$scope.examResultListBackup = $scope.examResultList;
						$scope.query.totalSize = pagingInfoReturned.totalEntities;
						$scope.query.totalSizeBackup = pagingInfoReturned.totalEntities;
						$scope.query.entityList = $scope.examResultList;

						ajsCache.put(examResultListCacheKey, $scope.query);
					}

					$scope.searchTextDone = false;
					$scope.searchSchoolTxtChange = function() {
						if ($scope.query.searchSchoolTxt
								&& $scope.query.searchSchoolTxt.length >= 3) {
							$scope.query.searchByGrfRegNo = "";
							$scope.query.pendingResults = false;
							$scope.query.grfReviewed = false;
							$scope.query.page = 1;
							$scope.schoolSerachTxtChange(
									$scope.query.searchSchoolTxt.trim(),
									$scope.curUser.instituteObj.yearofExam);
						} else {
							// let user type whole 12 chars of GRF No
							// restore $scope.examResultList if was filtered
							if ($scope.examResultList.length !== $scope.examResultListBackup.length) {
								$scope.query.page = 1;
								$scope.examResultList = $scope.examResultListBackup;
								$scope.query.totalSize = $scope.query.totalSizeBackup;
							}
						}
					}

					$scope.searchByGrfRegNoChange = function() {
						var enteredGrfRegNo = $scope.query.searchByGrfRegNo
								.trim();
						if (enteredGrfRegNo && enteredGrfRegNo.length >= 5) {
							$scope.query.searchSchoolTxt = "";
							$scope.query.pendingResults = false;
							$scope.query.grfReviewed = false;
							$scope.query.page = 1;
							var grfRegNo = (enteredGrfRegNo
									.startsWith('P-2017-') && enteredGrfRegNo.length >= 12) ? enteredGrfRegNo
									: 'P-2017-' + enteredGrfRegNo;

							$scope.grfRegNoChange(grfRegNo,$scope.curUser.instituteObj.yearofExam);
						} else {
							// let user type whole 5 chars of GRF No
							// restore $scope.examResultList if was filtered
							if ($scope.examResultList.length !== $scope.examResultListBackup.length) {
								$scope.query.page = 1;
								$scope.examResultList = $scope.examResultListBackup;
								$scope.query.totalSize = $scope.query.totalSizeBackup;
							}
						}
					}

					$scope.schoolSerachTxtChange = function(searchSchoolTxt,yearOfExam) {

						$scope.searchTextDone = true;
						$scope.examResultList = [];
						$log.debug("Fetcing searchSchoolTxt: "
								+ searchSchoolTxt);
						var gfStudentService = appEndpointSF
								.getGFStudentService();
						gfStudentService.searchExamResultBySchoolName(
								searchSchoolTxt,yearOfExam).then(function(resultList) {
							if (resultList) {
								$scope.examResultList = resultList;
								$scope.query.totalSize = resultList.length;
							}

							$scope.searchTextDone = false;
						});
					}

					$scope.grfRegNoChange = function(grfRegNo,yearOfExam) {

						$scope.searchTextDone = true;
						$scope.examResultList = [];
						$log.debug("Fetcing GRF No: " + grfRegNo);
						var gfStudentService = appEndpointSF
								.getGFStudentService();
						gfStudentService
								.getExamResultByGRFNo(grfRegNo,yearOfExam)
								.then(
										function(resultList) {
											if (resultList) {
												$scope.examResultList = resultList;
												$scope.query.totalSize = resultList.length;
											}

											$scope.searchTextDone = false;
										});
					}

					$scope.pendingGrfReview = function() {
						if (!$scope.query.grfReviewed) {
							$scope.query.pendingResults = false;
							$scope.query.searchSchoolTxt = "";
							$scope.query.searchByGrfRegNo = "";
							$scope.query.page = 1;
							$scope.getExamResultsPendingGRFReview();
						} else {
							// let user type whole 12 chars of GRF No
							// restore $scope.examResultList if was filtered
							if ($scope.examResultList.length !== $scope.examResultListBackup.length) {
								$scope.query.page = 1;
								$scope.examResultList = $scope.examResultListBackup;
								$scope.query.totalSize = $scope.query.totalSizeBackup;
							}
						}
					}

					$scope.pendingResultsList = function() {
						if (!$scope.query.pendingResults) {
							$scope.query.grfReviewed = false;
							$scope.query.searchSchoolTxt = "";
							$scope.query.searchByGrfRegNo = "";
							$scope.query.page = 1;
							$scope.fetchExamResultPendingByPaging();
						} else {
							$scope.refreshListPage();
							// This is needed as refreshListPage has changed
							// this value.
							$scope.query.pendingResults = true;
						}
					}

					$scope.getExamResultsPendingGRFReview = function() {
						$scope.searchTextDone = true;
						$scope.examResultList = [];
						$log.debug("Fetcing Pending GRF Review");
						var gfStudentService = appEndpointSF
								.getGFStudentService();
						gfStudentService
								.getExamResultsPendingGRFReview(
										$scope.curUser.instituteID,$scope.curUser.instituteObj.yearofExam)
								.then(
										function(resultList) {
											if (resultList) {
												$scope.examResultList = resultList;
												$scope.query.totalSize = resultList.length;
											}
											$scope.searchTextDone = false;
										});
					}

					$scope.fetchExamResultPendingByPaging = function() {
						$scope.searchTextDone = true;
						$scope.examResultList = [];
						$log.debug("Fetcing Pending Result List");
						var gfStudentService = appEndpointSF
								.getGFStudentService();
						gfStudentService.fetchExamResultPendingByPaging(
								$scope.curUser.instituteID,$scope.curUser.instituteObj.yearofExam).then(
								function(pagingInfoReturned) {
									initpagingInfoReturned(pagingInfoReturned);
									$scope.searchTextDone = false;
								});
					}

					$scope.cancel = function() {
						$state.go('gandhifoundation');
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							// $scope.getExamResultEntities();
							$scope.onpagechange();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.cancelButton = function() {
						$state.go("studentModule", {});
					}

					$scope.getRowStyle = function(even) {
						if (!even) {
							return {
								'border' : '1px solid black',
								'text-align' : 'left',
								'padding' : '2px',
								'background-color' : '#8cced4'
							};
						} else {
							return {
								'border' : '1px solid black',
								'text-align' : 'left',
								'padding' : '2px'
							};
						}
					}

					$scope.getTHStyle = function() {
						return {
							'border' : '1px solid black',
							'text-align' : 'center',
							'padding' : '5px',
							'background-color' : '#44acb6'
						};

					}
				});
