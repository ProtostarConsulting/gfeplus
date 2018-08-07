angular
		.module("prostudyApp")
		.controller(
				"partnerSchool_Institue_ListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF, $state, $sce,
						$stateParams, $q, $mdDialog, $mdMedia, $location,
						$anchorScroll, Upload, ajsCache) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.pSchoolInstitueList = [];
					$scope.instituteList = [];
					$scope.query = {
						order : '-instituteName',
						limit : 60,
						limitOptions : [ 1000, 2000, 3000, 4000, 5000 ],
						page : 1,
						totalSize : 0,
						totalSizeBackup : 0,
						searchSchoolTxt : '',
						entityList : null
					};

					$scope.pagingInfoReturned = null;

					$scope.refreshListPage = function() {
						// Remove cache and reset everything.
						var schoolInstituteListCacheKey = "fetchSchoolInstituteListByPaging";
						ajsCache.remove(schoolInstituteListCacheKey);
						$scope.query.page = 1;
						$scope.pagingInfoReturned = null;
						$scope.query.searchSchoolTxt = "";
						$scope.pSchoolInstitueList = [];
						$scope.instituteList = [];
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

						var schoolInstituteListCacheKey = "fetchSchoolInstituteListByPaging";
						// Note this key has to be unique across application
						// else it will return unexpected result.
						if (!angular.isUndefined(ajsCache
								.get(schoolInstituteListCacheKey))) {
							$log.debug("Found List in Cache, return it.")
							$scope.queriedSchoolDataCache = ajsCache
									.get(schoolInstituteListCacheKey);
							$scope.queriedSchoolDataCache.entityList ? $scope.queriedSchoolDataCache.entityList
									: [];
							$scope.pSchoolInstitueList = $scope.instituteList;
							$scope.query.totalSize = $scope.queriedSchoolDataCache.totalSize;
							$scope.query.totalSizeBackup = $scope.queriedSchoolDataCache.totalSizeBackup;

						}

						if ($scope.pSchoolInstitueList.length < ($scope.query.limit * $scope.query.page)) {
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
									.fetchSchoolInstituteListByPaging(
											$scope.curUser.instituteID,
											pagingInfoTemp)
									.then(
											function(pagingInfoReturned) {
												$scope.pagingInfoReturned = pagingInfoReturned;
												if ($scope.instituteList.length < pagingInfoReturned.totalEntities) {
													$scope.instituteList = $scope.instituteList
															.concat(pagingInfoReturned.entityList);
												} else {
													$scope.instituteList = pagingInfoReturned.entityList;
												}
												$scope.pSchoolInstitueList = $scope.instituteList;
												$scope.query.totalSize = pagingInfoReturned.totalEntities;
												$scope.query.totalSizeBackup = pagingInfoReturned.totalEntities;

												var schoolListCacheKey = "fetchSchoolInstituteListByPaging";
												$scope.query.entityList = $scope.instituteList;
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

					$scope.getPartnerSchoolInstituteList = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						PartnerSchoolService.getPartnerSchoolInstituteList()
								.then(function(list) {
									$scope.pSchoolInstitueList = list;
								});
					}

					$scope.searchByInstituteName = function() {
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
							if ($scope.pSchoolInstitueList.length !== $scope.instituteList.length) {
								$scope.query.page = 1;
								$scope.pSchoolInstitueList = $scope.instituteList;
								$scope.query.totalSize = $scope.query.totalSizeBackup;
							}
						}
					}

					$scope.schoolSerachTxtChange = function(searchSchoolTxt) {

						$scope.searchTextDone = true;
						$scope.pSchoolInstitueList = [];
						$log.debug("Fetcing searchSchoolTxt: "
								+ searchSchoolTxt);
						var partnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						partnerSchoolService
								.searchSchoolInstituteByName(searchSchoolTxt)
								.then(
										function(resp) {
											if (resp && resp.length) {
												$scope.pSchoolInstitueList = $scope.pSchoolInstitueList
														.concat(resp);
												$scope.query.totalSize = resp.length;
											}

											$scope.searchTextDone = false;
										});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							// $scope.getPartnerSchoolInstituteList();
							$scope.onpagechange();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
				});