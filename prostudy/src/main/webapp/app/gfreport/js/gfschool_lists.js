angular
		.module("prostudyApp")
		.controller(
				"schoollistsCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, $state,
						appEndpointSF, $sce, partnerSchoolLevels,
						indiaAddressLookupData, boardList) {

					$scope.selectFilterData = {
						category : "All",
						state : "All",
						dist : "All",
						tal : "All"
					}

					$scope.temp = {
						tempDistricts : [],
						tempTalukas : [],
						tempVillages : []
					}
					$scope.partnerSchoolLevels = partnerSchoolLevels;
					$scope.Country = angular.copy(indiaAddressLookupData);
					$scope.Country.states.unshift({
						name : "All"
					});

					$scope.gfSchoolList = [];
					$scope.schoolListsDate == null;

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

					$scope.getVillages = function(index, taluka) {

						$scope.temp.tempVillages = [];
						for (var k = 0; k < $scope.temp.tempTalukas.length; k++) {
							if ($scope.temp.tempTalukas[k].name == taluka) {
								$scope.temp.tempVillages = $scope.temp.tempTalukas[k].villages;
							}
						}
					};

					$scope.filterSchoolList = function() {
						$scope.filteredSchoolList = [];

						// To filter school list by address
						for (var i = 0; i < $scope.pSchoolList.length; i++) {
							if ($scope.selectFilterData.category != "All") {
								if ($scope.pSchoolList[i].category != $scope.selectFilterData.category) {
									continue;
								}
							}
							if ($scope.selectFilterData.state != "All") {
								if ($scope.selectFilterData.state == $scope.pSchoolList[i].address.state) {
									if ($scope.selectFilterData.dist == "All") {
										$scope.filteredSchoolList
												.push($scope.pSchoolList[i]);
									} else if ($scope.selectFilterData.dist == $scope.pSchoolList[i].address.dist) {
										if ($scope.selectFilterData.tal == "All") {
											$scope.filteredSchoolList
													.push($scope.pSchoolList[i]);
										} else if ($scope.selectFilterData.tal == $scope.pSchoolList[i].address.tal) {
											$scope.filteredSchoolList
													.push($scope.pSchoolList[i]);
										}
									}
								}
							}else{
								$scope.filteredSchoolList
								.push($scope.pSchoolList[i]);
							}
						}

					}

					$scope.getPartnerSchoolByInstitute = function() {
						var PartnerService = appEndpointSF
								.getPartnerSchoolService();

						PartnerService.getPartnerByInstitute(
								$scope.curUser.instituteID).then(
								function(pSchoolList) {
									$scope.pSchoolList = pSchoolList;
									$scope.filteredSchoolList = [];
								});

					}

					$scope.downloadData = function() {
						document.location.href = "DownloadPartnerSchools?InstituteId="
								+ $scope.curUser.instituteID;
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getPartnerSchoolByInstitute();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});