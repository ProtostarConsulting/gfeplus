angular
		.module("prostudyApp")
		.controller(
				"partnerSchool_Institue_AddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF, $state, $sce,
						$stateParams, $q, $mdDialog, $mdMedia, $location,
						$anchorScroll, Upload, ajsCache, indiaAddressLookupData) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$scope.Country = indiaAddressLookupData;

					$scope.schoolInstitute = {
						address : $scope.Address,
						instituteName : "",
						instituteID : ""
					};

					$scope.Address = {
						line1 : "",
						dist : "",
						city : "",
						state : "",
						country : "India",
						pin : "",
						tal : "",
						otherState : "",
						otherDist : "",
						otherTal : "",
						otherAddressFlag : false
					}

					$scope.schoolInstitute = $stateParams.selectedPSchoolInstituteId ? $stateParams.selectedPSchoolInstitute
							: $scope.schoolInstitute;
					$scope.schoolInstituteId = $stateParams.selectedPSchoolInstituteId ? $stateParams.selectedPSchoolInstituteId : null;

					$scope.addPartnerSchoolInstitute = function() {
						$scope.loading = true;
						$scope.schoolInstitute.instituteID = $scope.curUser.instituteID;
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService
								.addPartnerSchoolInstitute(
										$scope.schoolInstitute)
								.then(
										function(schoolInstitute) {
											$scope.loading = false;
											if (schoolInstitute.code) {
												$scope
														.showErrorToast("Error occured while saving data. Please try latter on or contact technical support. Error Details:"
																+ schoolid.message);
											} else {
												$scope.schoolInstitute = schoolInstitute;
												if ($scope.selectedPSchoolInstituteId != undefined) {
													$scope.showUpdateToast();
												} else {
													$scope.showAddToast();
													$state.reload();
												}
											}

										});
					}

					$scope.initSchoolInstituteLoad = function(schoolInstitute) {
						$scope.schoolInstitute = schoolInstitute;
						$scope.Address = $scope.schoolInstitute.address;
						$scope.schoolInstitute.address.pin = parseInt($scope.schoolInstitute.address.pin);

						if ($scope.schoolInstitute.address.state != "Maharashtra") {
							$scope.schoolInstitute.address.otherAddressFlag = true;
						}

						if ($scope.schoolInstitute.address.otherAddressFlag == false) {
							$scope.a;
							$scope.getDistricts($scope.a, $scope.Address.state);
							if ($scope.temp.tempDistricts)
								$scope
										.getTalukas($scope.a,
												$scope.Address.dist);
						}
					}

					$scope.temp = {
						tempDistricts : [],
						tempTalukas : [],
						tempVillages : []
					}

					$scope.getDistricts = function(index, state) {

						$scope.temp.tempDistricts = [];
						for (var i = 0; i < $scope.Country.states.length; i++) {

							if ($scope.Country.states[i].name == state) {

								$scope.temp.tempDistricts = $scope.Country.states[i].districts;

							}
						}
					};

					$scope.getTalukas = function(index, district) {

						$scope.temp.tempTalukas = [];
						for (var j = 0; j < $scope.temp.tempDistricts.length; j++) {
							if ($scope.temp.tempDistricts[j].name == district) {
								$scope.temp.tempTalukas = $scope.temp.tempDistricts[j].talukas;
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

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							if ($stateParams.selectedPSchoolInstitute != undefined) {
								$scope
										.initSchoolInstituteLoad($stateParams.selectedPSchoolInstitute);
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
				});