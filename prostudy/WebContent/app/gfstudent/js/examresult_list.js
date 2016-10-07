angular
		.module("prostudyApp")
		.controller(
				"gfExamResultListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, objectFactory, indiaAddressLookupData) {

					$scope.selectFilterData = {
						state : "",
						dist : "",
						grfReviewed : false,
						grfRegNo : ''
					}

					$scope.examResultList = [];
					$scope.Country = angular.copy(indiaAddressLookupData);

					$scope.gfSchoolList = [];
					$scope.schoolListsDate == null;
					$scope.temp = {
						tempDistricts : [],
						tempTalukas : [],
						tempVillages : []
					}
					$scope.pendingGrfReview = function(cheked) {
						$scope.filteredExamResultList = [];
						if (cheked) {
							$scope.examResultListBackup.forEach(function(
									resultObj) {
								if (!resultObj.grfReviewed) {
									$scope.filteredExamResultList
											.push(resultObj);
								}
							});
						} else {
							$scope.filteredExamResultList = $scope.examResultListBackup;
						}
					}

					$scope.filterResultList = function(index, state) {

						if ($scope.selectFilterData.grfRegNo) {
							$scope.getExamResultEntitiesByGrfNo();
							return;
						}

						$scope.filteredExamResultList = [];

						// To filter result list by address
						for (var i = 0; i < $scope.examResultList.length; i++) {

							if ($scope.selectFilterData.state != "All") {
								if ($scope.selectFilterData.state == $scope.examResultList[i].school.address.state) {
									if ($scope.selectFilterData.dist == "All") {
										$scope.filteredExamResultList
												.push($scope.examResultList[i]);
									} else if ($scope.selectFilterData.dist == $scope.examResultList[i].school.address.dist) {
										if ($scope.selectFilterData.tal == "All") {
											$scope.filteredExamResultList
													.push($scope.examResultList[i]);
										}
									}
								}
							} else {
								$scope.filteredExamResultList
										.push($scope.examResultList[i]);
							}
						}

						// Display only top 100 students per filter
						var tillIndex = ($scope.filteredExamResultList.length > 100) ? 99
								: $scope.filteredExamResultList.length;
						$scope.filteredExamResultList = $scope.filteredExamResultList
								.slice(0, tillIndex);

					}

					$scope.getDistricts = function(index, state) {
						$scope.temp.tempDistricts = [];
						for (var i = 0; i < $scope.Country.states.length; i++) {

							if ($scope.Country.states[i].name == state) {

								$scope.temp.tempDistricts = $scope.Country.states[i].districts;
								if (!$scope.containsObject({
									name : "All"
								}, $scope.temp.tempDistricts)) {
									$scope.temp.tempDistricts.unshift({
										name : "All"
									});
								}
							}
						}
					};

					$scope.getTalukas = function(index, district) {

						$scope.temp.tempTalukas = [];
						for (var j = 0; j < $scope.temp.tempDistricts.length; j++) {
							if ($scope.temp.tempDistricts[j].name == district) {
								$scope.temp.tempTalukas = $scope.temp.tempDistricts[j].talukas;
								if (!$scope.containsObject({
									name : "All"
								}, $scope.temp.tempTalukas)) {
									$scope.temp.tempTalukas.unshift({
										name : "All"
									});
								}
							}
						}
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
											$scope.filteredExamResultList = [];
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
										$scope.selectFilterData.grfRegNo)
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

					$scope.cancel = function() {
						$state.go('gandhifoundation');
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getExamResultEntities();
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