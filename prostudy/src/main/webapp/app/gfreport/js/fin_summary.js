angular
		.module("prostudyApp")
		.controller(
				"finSummaryCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, $state,
						appEndpointSF, $sce, $location, $anchorScroll,
						partnerSchoolLevels, indiaAddressLookupData, boardList,
						logisticsList) {

					$scope.loading = true;
					$scope.filterType = '';

					$scope.getFinSummayReportData = function() {
						var PartnerService = appEndpointSF
								.getPartnerSchoolService();
						$scope.noOfPaymentsTotal = 0;
						$scope.noOfCourierParcelsTotal = 0;

						PartnerService
								.getFinSummayReportData(
										$scope.curUser.instituteID, $scope.curUser.instituteObj.yearofExam)
								.then(
										function(finSummayReportData) {
											$scope.finSummayReportData = finSummayReportData;
											$scope.angular
													.forEach(
															$scope.finSummayReportData.paymentModesData,
															function(paymodeObj) {
																$scope.noOfPaymentsTotal += parseInt(paymodeObj.noOfPayments);
															});
											angular
													.forEach(
															$scope.finSummayReportData.logisticsWiseData,
															function(
																	logisticsObj) {
																$scope.noOfCourierParcelsTotal += parseInt(logisticsObj.noOfParcels);
															});
											$scope.loading = false;
										});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							// $scope.getPartnerSchoolByInstitute();
							// $scope.getGFCourierByInstitute();
							$scope.getFinSummayReportData();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.t_addTotalAmountByPaymentType = function(amt) {
						return $scope.t_totalAmountByPaymentType;
					}
					$scope.t_addTotalCostByLogisticType = function(cost) {
						return $scope.t_totalCostByLogisticType
					}
					$scope.clearfilterValues = function(courierType) {

						$scope.filterType = '';
						$scope.filterPaymentType = '';
						$scope.filterLogisticsType = '';
						$scope.t_totalAmountByPaymentType = 0;
						$scope.t_totalCostByLogisticType = 0;

					}

					var date1 = new Date();
					var currentYear = date1.getFullYear();
					currentYear = currentYear.toString().substr(2, 2);
					currentYear = date1.getFullYear() + "-"
							+ (Number(currentYear) + 1);

					$scope.getPaymentTotalCurrentYear = function(school) {

						var paymentDetailList = [];
						for (q = 0; q < school.examDetailList.length; q++) {
							if (school.examDetailList[q].yearOfExam == currentYear) {
								if (school.examDetailList[q].paymentDetail != undefined) {
									paymentDetailList = school.examDetailList[q].paymentDetail;
									break;
								}
							}
						}

						var paymentDetailCal = {
							'payTotal' : 0,
							'paymentDate' : ''
						}

						if (paymentDetailList && paymentDetailList.length > 0) {
							var payTotal = 0;
							var paymentDate = '';
							for (var i = 0; i < paymentDetailList.length; i++) {
								if ($scope.filterPaymentType == paymentDetailList[i].payReceivedBy
										.trim()) {
									payTotal += paymentDetailList[i].payAmount;
									paymentDate = paymentDetailList[i].paymentDate;
								}
							}

							paymentDetailCal.payTotal = payTotal;
							paymentDetailCal.paymentDate = paymentDate;
							$scope.t_totalAmountByPaymentType += payTotal;
						}

						school.paymentDetailCal = paymentDetailCal;
					}

					$scope.filterSchoolListBy = function(paymentType) {
						$scope.loading = true;
						$scope.fitlteredSchoolList = [];
						$scope.t_totalAmountByPaymentType = 0;

						var PartnerService = appEndpointSF
								.getPartnerSchoolService();

						PartnerService
								.getSchoolByPaymentMode(paymentType)
								.then(
										function(list) {
											$scope.fitlteredSchoolList = list;
											$scope.t_totalAmountByPaymentType = 0;

											angular
													.forEach(
															$scope.fitlteredSchoolList,
															function(school) {
																$scope
																		.getPaymentTotalCurrentYear(school);
															});

											$scope.loading = false;
										});

					}

					$scope.filterCourierListBy = function(courierLogistics) {
						$scope.loading = true;
						$scope.fitlteredCourierList = [];
						$scope.t_totalCostByLogisticType = 0;

						var gfCourierService = appEndpointSF
								.getGFCourierService();
						gfCourierService
								.getCourierByLogisticsType(courierLogistics, $scope.curUser.instituteObj.yearofExam)
								.then(
										function(gfCouriertList) {
											$scope.fitlteredCourierList = gfCouriertList;
											angular
													.forEach(
															$scope.fitlteredCourierList,
															function(courier) {
																$scope.t_totalCostByLogisticType += courier.courierCost;
															});
											$scope.loading = false;
										});

					}

					$scope.filterBy = function(fType, fSubType) {

						$scope.otherFilterType = fType;
						$scope.filterSubType = fSubType;

						$location.hash('topRight');
						$anchorScroll();

						$scope.displayButton = true;
						$scope.filterType = fType;
						if ($scope.filterType == 'school') {
							$scope.filterPaymentType = fSubType;
							$scope.filterSchoolListBy(fSubType);

						} else if ($scope.filterType == 'courier') {
							$scope.filterLogisticsType = fSubType;
							$scope.filterCourierListBy(fSubType);

						}

					}

					$scope.downloadSummaryReport = function() {
						document.location.href = "DownloadFinicialSummaryReport?summaryReportFilterType1="
								+ $scope.otherFilterType
								+ "&summaryReportFilterType2="
								+ $scope.filterSubType
								+ "&yearOfExam="
								+ $scope.curUser.instituteObj.yearofExam;
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