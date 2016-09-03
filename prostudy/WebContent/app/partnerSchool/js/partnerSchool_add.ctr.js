angular
		.module("prostudyApp")
		.controller(
				"partnerSchoolAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, $state,
						$stateParams, $location, $anchorScroll, appEndpointSF,
						partnerSchoolLevels, standardList,
						indiaAddressLookupData) {

					console.log("Inside partnerSchoolAddCtr");
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.Country = indiaAddressLookupData;
					$scope.partnerSchoolLevels = partnerSchoolLevels;
					$scope.standardList = standardList;
					// ----------tab control-------
					$scope.maxTabNo = 5;
					$scope.selectedIndex = 0;
					$scope.tabNext = function() {
						if ($scope.selectedPSchoolId != "") {
							// no tab movement if
							return;
						}

						var index = ($scope.selectedIndex == $scope.maxTabNo) ? $scope.selectedIndex
								: $scope.selectedIndex + 1;
						$scope.selectedIndex = index;

					}
					// ----------------------------

					// -------------language-------
					$scope.languages = [ "Hindi", "Marathi", "English" ];
					$scope.selected = [];
					$scope.toggle = function(item, list) {
						var idx = list.indexOf(item);
						if (idx > -1) {
							list.splice(idx, 1);
						} else {
							list.push(item);
						}
						/* $log.debug("=="+$scope.selected); //work fine */
					};
					$scope.exists = function(item, list) {
						return list.indexOf(item) > -1;

					};
					// ----------------------------
					// -----------online ofline------
					/*
					 * $scope.data = { $scope.modeOfExam = 'OffLine';
					 * $scope.bookRequired = 'OffLine'; };
					 */
					// ----------------------------
					// ---auto ganereted number
					// ------------------------
					$scope.partnerSchool = {
						address : $scope.Address,
						examDetailList : [],
						contactDetail : "",
						autoGenerated : "",
						govRegisterno : "",
						instituteID : "",
						schoolName : "",
						instName : "",
						formNumber : "",
						category : "",
						primaryContact : ""

					};
					$scope.examDetail = {
						totalStudent : "",
						male : "",
						female : "",
						total : "",
						/* examMedium : $scope.selected, */
						yearOfExam : "",
						bookRequired : 'OffLine',
						modeOfExam : 'OffLine',
						bookSummary : "",
						paymentDetail : $scope.PaymentDetail,

					}
					$scope.contactDetail = {
						headMasterName : "",
						headMasterMobile : "",
						headMasterPhone : "",
						headMasterEmailId : "",
						coordinatorDetail : [ {
							srno : 1,
							coordinatorName : "",
							coordinatorPhoneNum : "",
							coordinatorMobileNum : "",
							coordinatorEmailId : "",
						} ]

					}

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

					$scope.bookSummary = {
						bookDetail : [ {
							standard : "",
							bookName : "",
							bookPrise : 0,
							totalStud : 0,
							totalFees : 0
						} ],
						total : 0,
						amtForInst20per : 0,
						amtForGRF80per : 0
					}

					// attached the bookdetail to book summery entity
					$scope.bookDetail = {
						standard : "",
						bookName : "",
						bookPrise : 0,
						totalStud : 0,
						totalFees : 0

					}

					$scope.PaymentDetail = {
						payReceivedBy : "",
						paymentDate : new Date(),
						payAmount : 0,
						note : "",
						tPaid : 0,
						pAmount : 0,
						nameOfBank : "",
						branchName : "",
						transactionNumber : "",
						depositDate : new Date(),

					}

					// get last next 3 year to show academic year
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
					// ----get pre year to push years----
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
					// ---get curyear ------
					$scope.getCurYear = function() {
						var date = new Date();
						var curyear = date.getFullYear();
						curyear = curyear.toString().substr(2, 2);
						$scope.yearOfExam = date.getFullYear() + "-"
								+ (Number(curyear) + 1);
					}
					$scope.getCurYear();

					$scope.calculateTotal = function() {
						$scope.examDetail.total = Number($scope.examDetail.male)
								+ Number($scope.examDetail.female);
					}

					$scope.selectedPSchoolId = $stateParams.selectedPSchoolId;
					$log.debug("$scope.selectedPSchoolId :"
							+ $scope.selectedPSchoolId);

					$scope.enableTillTabNo = ($scope.selectedPSchoolId == "") ? 0
							: $scope.maxTabNo;
					$scope.schoolid;

					$scope.addPartnerSchool = function() {

						$scope.tabNext();
						$scope.enableTillTabNo++;

						$scope.waitForServiceLoad2();
						if ($scope.PaymentDetail.payReceivedBy != "") {
							$scope.PaymentDet.push($scope.PaymentDetail);
							$scope.examDetail.paymentDetail = $scope.PaymentDet;
							$scope.PaymentDetail = {
								payReceivedBy : "",
								paymentDate : new Date(),
								payAmount : 0,
								note : "",
								tPaid : 0,
								pAmount : 0
							}
						}
						$scope.examDetail.bookSummary = $scope.bookSummary;
						$scope.partnerSchool.instituteID = $scope.curUser.instituteID;
						$scope.partnerSchool.contactDetail = $scope.contactDetail;

						if ($scope.schoolid != undefined
								&& $scope.selectedPSchoolId == "") {
							$scope.partnerSchool.id = $scope.schoolid.id;

						}
						/* if ($scope.examlist.length >=1) { */
						$scope.partnerSchool.examDetailList = $scope.examlist;
						/*
						 * } else { $scope.partnerSchool.examDetailList[0] =
						 * $scope.examDetail; }
						 */

						if ($scope.partnerSchool.address.state == "Other") {
							$scope.partnerSchool.address.state = $scope.partnerSchool.address.otherState;
							$scope.partnerSchool.address.dist = $scope.partnerSchool.address.otherDist;
							$scope.partnerSchool.address.tal = $scope.partnerSchool.address.otherTaluka;
							$scope.partnerSchool.address.otherAddressFlag = true;
						} else {
							$scope.partnerSchool.address.otherAddressFlag = false;
						}
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						$scope.getExamByYear();
						$scope.partnerSchool.modifiedDate = new Date();
						$scope.partnerSchool.modifiedBy = $scope.curUser.email_id;

						$location.hash('topRight');
						$anchorScroll();
						$scope.loading = true;
						PartnerSchoolService
								.addPartnerSchool($scope.partnerSchool)
								.then(
										function(schoolid) {
											$scope.loading = false;
											if (schoolid.code) {
												$scope
														.showErrorToast("Error occured while saving data. Please try latter on or contact technical support. Error Details:"
																+ schoolid.message);
											} else {
												$scope.schoolid = schoolid;
												$scope.partnerSchool.autoGenerated = $scope.schoolid.autoGenerated;
												if ($scope.partnerSchool.examDetailList) {
													$scope.examlist = $scope.schoolid.examDetailList;
													$scope.getExamByYear();
												}

												if ($scope.selectedPSchoolId != undefined) {
													$scope.showUpdateToast();
												} else {
													$scope.showAddToast();
												}
												$scope.addPaymentFlag = false;
												$location.hash('topRight');
												$anchorScroll();
											}

										});
						$scope.waitForServiceLoad2();
						/*
						 * console.log("$state.current : " +
						 * angular.toJson($state.current));
						 */// $state.reload($state.current);
					}
					$scope.resetState = function() {
						// $state.reload({});
						$state.transitionTo($state.current, {}, {
							reload : true,
							inherit : false,
							notify : true
						});
					}
					$scope.addPaymentFlag = false;
					$scope.enableAddPaymentFlag = function() {
						$scope.addPaymentFlag = true;
					}

					if ($scope.selectedPSchoolId
							&& $scope.selectedPSchoolId != "") {
						$scope.loading = true;
					} else {
						$scope.loading = false;
					}

					$scope.getPSchoolByPSID = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						if ($scope.selectedPSchoolId != "") {
							PartnerSchoolService
									.getPSchoolByPSID($scope.selectedPSchoolId)
									.then(
											function(pSchool) {
												$scope.partnerSchool = pSchool;
												$scope.partnerSchool.formNumber = parseInt($scope.partnerSchool.formNumber);

												$scope.contactDetail = $scope.partnerSchool.contactDetail;
												$scope.partnerSchool.address.pin = parseInt($scope.partnerSchool.address.pin);
												$scope.Address = $scope.partnerSchool.address;
												$scope.partnerSchool.address.pin = parseInt($scope.partnerSchool.address.pin);

												$scope.partnerSchool.contactDetail.headMasterMobile = parseInt($scope.partnerSchool.contactDetail.headMasterMobile);

												for (var i = 0; i < $scope.partnerSchool.contactDetail.coordinatorDetail.length; i++) {
													$scope.partnerSchool.contactDetail.coordinatorDetail[i].coordinatorMobileNum = parseInt($scope.partnerSchool.contactDetail.coordinatorDetail[i].coordinatorMobileNum);
												}
												$scope.a;
												$scope.getDistricts($scope.a,
														$scope.Address.state);
												$scope.getTalukas($scope.a,
														$scope.Address.dist);
												if ($scope.partnerSchool.examDetailList) {
													$scope.examlist = $scope.partnerSchool.examDetailList;
												}
												if ($scope.partnerSchool.address.otherAddressFlag == true) {
													var temp = $scope.partnerSchool.address.state;
													$scope.partnerSchool.address.state = "Other";
													$scope.partnerSchool.address.otherState = temp;
													$scope.partnerSchool.address.otherDist = $scope.partnerSchool.address.dist;
													$scope.partnerSchool.address.otherTaluka = $scope.partnerSchool.address.tal;
													$scope.partnerSchool.address.otherAddressFlag = true;
												}
												$scope.getExamByYear();
												$scope.waitForServiceLoad2();

												$scope.loading = false;
											});
						}

					}

					$scope.examlist = [];

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							if ($scope.selectedPSchoolId != undefined) {
								$scope.getPSchoolByPSID();
							}

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
					// -----------get Exam by Year------------
					$scope.getExamByYear = function(year1) {
						if (year1 == undefined) {
							var date1 = new Date();
							var year1 = date1.getFullYear();
							year1 = year1.toString().substr(2, 2);
							year1 = date1.getFullYear() + "-"
									+ (Number(year1) + 1);
						}
						var k = 0;
						for (q = 0; q < $scope.examlist.length; q++) {
							if ($scope.examlist[q].yearOfExam == year1) {
								$scope.examDetail = $scope.examlist[q];
								$scope.bookSummary = $scope.examlist[q].bookSummary;
								if ($scope.examlist[q].paymentDetail != undefined) {
									$scope.PaymentDet = $scope.examlist[q].paymentDetail;
								}
								k = 1;
							}

						}
						if (k == 0) {
							$scope.PaymentDet = [];
							$scope.bookSummary = {
								bookDetail : [ {
									standard : "",
									bookName : "",
									bookPrise : 0,
									totalStud : 0,
									totalFees : 0
								} ],
								total : 0,
								amtForInst20per : 0,
								amtForGRF80per : 0
							}
							$scope.examDetail = {
								totalStudent : "",
								male : "",
								female : "",
								total : "",
								/* examMedium : [], */
								yearOfExam : $scope.yearOfExam,
								bookRequired : 'OffLine',
								modeOfExam : 'OffLine',
								bookSummary : $scope.bookSummary,
								paymentDetail : $scope.PaymentDet,
							};

							$scope.examlist.push($scope.examDetail);
							$scope.examDetail = $scope.examlist[$scope.examlist.length - 1];
						}

					}
					$scope.PaymentDet = [];

					$scope.cancelButton = function() {
						$state.go('^', {});
					};

					$scope.back = function() {
						window.history.back();
						// $state.go("^", {});
					};

					$scope.getGFBookStockByInstituteId = function() {
						var gfBookStockService = appEndpointSF
								.getGFBookStockService();
						gfBookStockService.getGFBookByInstituteId(
								$scope.curUser.instituteID).then(
								function(tempBooks) {
									$scope.bookStocks = tempBooks;
								});
					}
					$scope.bookStocks = [];

					$scope.waitForServiceLoad1 = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getGFBookStockByInstituteId();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad1, 1000);
						}
					}

					$scope.waitForServiceLoad1();
					// -----------add book--------------
					$scope.addBook = function() {
						$scope.BookDetail = {
							standard : "",
							bookName : "",
							bookPrise : 0,
							totalStud : 0,
							totalFees : 0
						}
						$scope.bookSummary.bookDetail.push($scope.BookDetail);
					}

					$scope.removeBook = function(index) {
						$scope.calculate(index, 0);
						$scope.bookSummary.bookDetail.splice(index, 1);

					};

					$scope.books = [];

					// -----------------calculate book detail---------------

					$scope.calculate = function(index, val) {

						$scope.bookSummary.bookDetail[index].totalStud = val;

						$scope.bookSummary.bookDetail[index].totalFees = $scope.bookSummary.bookDetail[index].totalStud
								* $scope.bookSummary.bookDetail[index].bookPrise;

						$scope.bookSummary.total = 0;
						for (count = 0; count < $scope.bookSummary.bookDetail.length; count++) {
							$scope.bookSummary.total += $scope.bookSummary.bookDetail[count].totalFees;
						}
						$scope.bookSummary.amtForInst20per = Math
								.round(($scope.bookSummary.total / 100) * 20);
						$scope.bookSummary.amtForGRF80per = Math
								.round(($scope.bookSummary.total / 100) * 80);

						$scope.calculatepaidandpending();
					}

					// -----------add coordinator--------------
					$scope.addCoordinator = function() {
						if ($scope.contactDetail.coordinatorDetail == undefined) {
							$scope.contactDetail = {
								headMasterName : "",
								headMasterMobile : "",
								headMasterPhone : "",
								headMasterEmailId : "",
								coordinatorDetail : [ {
									srno : 1,
									coordinatorName : "",
									coordinatorPhoneNum : "",
									coordinatorMobileNum : "",
									coordinatorEmailId : "",
								} ]

							}
							$scope.contactDetail.coordinatorDetail;

						} else {
							$scope.CoordinatorDetail = {
								srno : $scope.contactDetail.coordinatorDetail.length + 1,
								coordinatorName : "",
								coordinatorPhoneNum : "",
								coordinatorEmailId : "",
							}
							$scope.contactDetail.coordinatorDetail
									.push($scope.CoordinatorDetail);
						}
					}

					$scope.removeCoordinator = function(index) {
						$scope.contactDetail.coordinatorDetail.splice(index, 1);
					};

					// --------calculate pending & total paid amount----

					$scope.calculatepaidandpending = function() {
						// ---------calculate pending amount---------

						$scope.PaymentDetail.tPaid = 0;

						if ($scope.PaymentDet.length != 0) {

							for (i = 0; i < $scope.PaymentDet.length; i++) {

								$scope.PaymentDetail.tPaid += $scope.PaymentDet[i].payAmount;

							}
							$scope.PaymentDetail.tPaid += $scope.PaymentDetail.payAmount;
							$scope.PaymentDetail.pAmount = $scope.bookSummary.amtForGRF80per
									- $scope.PaymentDetail.tPaid;
						} else {

							$scope.PaymentDetail.tPaid = $scope.PaymentDetail.payAmount;
							$scope.PaymentDetail.pAmount = $scope.bookSummary.amtForGRF80per
									- $scope.PaymentDetail.tPaid;
						}

					}

					$scope.PaymentDetailArray = [];

					$scope.waitForServiceLoad2 = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.calculatepaidandpending();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad2, 1000);
						}
					}

					$scope.waitForServiceLoad2();

					$scope.setfees = function(id, ind) {

						$log.debug("name=" + angular.toJson(id) + "index="
								+ ind);
						for (i = 0; i < $scope.bookStocks.length; i++) {
							if ($scope.bookStocks[i].id == id) {
								$scope.bookSummary.bookDetail[ind].bookPrise = $scope.bookStocks[i].bookPrice;
							}
						}
						$scope.calculate(ind, 0);
					}

					$scope.temp = {
						tempDistricts : [],
						tempTalukas : [],
						tempVillages : []
					}

					$scope.Address = {
						line1 : "",
						dist : "",
						city : "",
						state : "",
						country : "India",
						pin : "",
						tal : ""
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

					$scope.getaddress = function(postcode) {

						$
								.getJSON(
										'https://maps.googleapis.com/maps/api/geocode/json?address='
												+ postcode + '&sensor=false',
										function(data) {

											$scope.data = data.results[0].address_components;
											var city = $scope.data[1].long_name;
											var tal = $scope.data[1].long_name;
											var dist = $scope.data[2].long_name;
											var state = $scope.data[3].long_name;
											var country = $scope.data[4].long_name;

											$scope.partnerSchool.address.city = city;
											$scope.partnerSchool.address.tal = tal;
											$scope.partnerSchool.address.dist = dist;
											$scope.partnerSchool.address.state = state;
											$scope.partnerSchool.address.country = country;
											$scope.partnerSchool.address.pin = postcode;

											$scope.getTalukas(0, dist);
											/*
											 * var lat =
											 * data.results[0].geometry.location.lat;
											 * var lng =
											 * data.results[0].geometry.location.lng;
											 */});
					}

					$scope.stateQuerySearch = function(query) {
						var results = query ? $scope.Country.states
								.filter(createFilterFor(query))
								: $scope.Country.states;
						$scope.partnerSchool.address.dist = results[0].districts;
						var deferred = $q.defer();
						$timeout(function() {
							deferred.resolve(results);

						}, Math.random() * 1000, false);

						return deferred.promise;
					}

					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(state) {
							var a = state.name;
							return (angular.lowercase(a)
									.indexOf(lowercaseQuery) >= 0);
						};
					}
					/*
					 * $scope.DistQuerySearch = function(query) { var results =
					 * query ? $scope.partnerSchool.address.dist
					 * .filter(createFilterFor(query)) :
					 * $scope.partnerSchool.address.dist;
					 * $scope.partnerSchool.address.tal = results.talukas; var
					 * deferred = $q.defer(); $timeout(function() {
					 * deferred.resolve(results); }, Math.random() * 1000,
					 * false);
					 * 
					 * 
					 * return deferred.promise; }
					 * 
					 * function createFilterFor(query) { var lowercaseQuery =
					 * angular.lowercase(query); return function
					 * filterFn(taluka) { var a = taluka.name; return
					 * (angular.lowercase(a).indexOf( lowercaseQuery) >= 0); }; }
					 */
				});
