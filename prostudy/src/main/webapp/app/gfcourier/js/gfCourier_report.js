angular
		.module("prostudyApp")
		.controller(
				"gfCourierReportCtr",
				function($scope, indiaAddressLookupData, partnerSchoolLevels, appEndpointSF,$log) {

					$scope.courierTypelist = [ "Book", "Certificate",
							"Error Certificate", "Error books",
							"Prize Certificate" ];

					$scope.partnerSchoolLevels = partnerSchoolLevels;
					$scope.Country = indiaAddressLookupData;

					$scope.selectFilterData = {

						courierType : $scope.courierTypelist,
						state : "",
						dist : "",
						tal : ""
					}

					$scope.temp = {
						tempDistricts : [],
						tempTalukas : [],
						tempVillages : []
					}
					
					$scope.list1=[];
					
					$scope.getcourierReportList = function()
					{
						var gfCourierService = appEndpointSF.getGFCourierService();
							gfCourierService.getCourierByCourierType($scope.selectFilterData.courierType)
						.then(
								function(tempCourierList) {

									$scope.list1=tempCourierList;
								});
						
					}
					
							

					$scope.getDistricts = function(index, state){

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
					
					$scope.downloadCourierReport = function(){
						//$log.debug("courierType"+$scope.selectFilterData.courierType);
						document.location.href="DownloadCourierReport?CourierType="+$scope.selectFilterData.courierType;
						//window.open("DownloadCourierReport?CourierType"+$scope.selectFilterData.courierType);
						
					}

				});