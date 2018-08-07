angular
		.module("prostudyApp")
		.controller(
				"printBookDtailCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF, $state, $sce,
						$stateParams, $q, $mdDialog, $mdMedia) {

					$scope.loading = true;
					// $scope.selectedPSchoolId = $stateParams.PSchoolId;
					$scope.selectedSchoolObj = $stateParams.selectedSchoolObj;
					$scope.bookStocks = $stateParams.bookStocks;
					$scope.yearOfExam = $stateParams.yearOfExam;
					$scope.date = new Date();
					$scope.receiptNumber = 0;

					$log.debug("$scope.yearOfExam=" + $scope.yearOfExam);

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

					$scope.printBookDetailDiv = function(bookDetailDiv) {

						/*
						 * document.getElementById('hidetr').style.display =
						 * 'block';
						 */
						window.frames["print_frame"].document.body.innerHTML = printDivCSS
								+ document.getElementById(bookDetailDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						/*
						 * document.getElementById('hidetr').style.display =
						 * 'none';
						 */
						window.frames["print_frame"].window.print();

					}

					/*
					 * $scope.printDiv = function(divName) { var printContents =
					 * document.getElementById(divName).innerHTML; var popupWin =
					 * window .open( '', '_blank',
					 * 'width=1200,height=750,location=no,menubar=no,scrollbars=no,resizable=no,fullscreen=no');
					 * popupWin.document.open();
					 * 
					 * popupWin.document .write('<html><head><link
					 * rel="stylesheet" type="text/css"
					 * href="/css/printstyle.css" /></head><body>' +
					 * printContents + '</body></html>');
					 * popupWin.document.close(); }
					 */

					/*
					 * $scope.getPSchoolByPSID = function() { var
					 * PartnerSchoolService = appEndpointSF
					 * .getPartnerSchoolService(); if ($scope.selectedPSchoolId !=
					 * "") { PartnerSchoolService.getPSchoolByPSID(
					 * $scope.selectedPSchoolId).then( function(pSchool) {
					 * initBookDetails(pSchool); }); } }
					 */
					function initBookDetails(pSchool) {
						$scope.examList = pSchool.examDetailList;
						$scope.add = pSchool.address;
						$scope.ContactDetail = pSchool.contactDetail;
						if ($scope.ContactDetail.coordinatorDetail != undefined
								&& $scope.ContactDetail.coordinatorDetail.length > 0) {
							$scope.coordinatorName = $scope.ContactDetail.coordinatorDetail[0].coordinatorName;
							$scope.coordinatorMobileNum = $scope.ContactDetail.coordinatorDetail[0].coordinatorMobileNum;
						} else {
							$scope.coordinatorName = '';
							$scope.coordinatorMobileNum = '';
						}
						$scope.school = pSchool;
						$scope.receiptNumber = parseInt($scope.school.autoGenerated
								.split("-")[2])
								+ ($scope.date.getFullYear() - 2000);
						$scope.getPrintDetail();
						$scope.loading = false;
					}

					$scope.examList = [];
					$scope.ContactDetail;
					$scope.add;
					$scope.school;

					$scope.getPrintDetail = function() {

						for (i = 0; i < $scope.examList.length; i++) {
							if ($scope.examList[i].yearOfExam == $scope.yearOfExam) {

								$scope.bookSummary = $scope.examList[i].bookSummary;
								$scope.BookDetail = $scope.examList[i].bookSummary.bookDetail;
								$scope.PaymentDet = $scope.examList[i].paymentDetail;
								$scope.totalStudents = 0;
								$scope.totalPaidFees = 0;
								if ($scope.BookDetail != undefined) {
									for (var k = 0; k < $scope.BookDetail.length; k++) {
										$scope.totalStudents += $scope.BookDetail[k].totalStud;
									}
								}
								if($scope.PaymentDet != undefined){
									for (var j = 0; j < $scope.PaymentDet.length; j++) {
										$scope.totalPaidFees += $scope.PaymentDet[j].payAmount;
									}
								}
							}
						}

					}
					$scope.bookSummary;
					$scope.BookDetail = [];
					$scope.PaymentDet = [];

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							if ($scope.selectedSchoolObj != undefined
									&& $scope.selectedSchoolObj != null) {
								initBookDetails($scope.selectedSchoolObj);
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					/*
					 * $scope.getGFBookStockByInstituteId = function() { var
					 * gfBookStockService = appEndpointSF
					 * .getGFBookStockService();
					 * gfBookStockService.getGFBookByInstituteId(
					 * $scope.curUser.instituteID).then( function(tempBooks) {
					 * $scope.bookStocks = tempBooks; }); } //$scope.bookStocks =
					 * [];
					 * 
					 * $scope.waitForServiceLoad1 = function() { if
					 * (appEndpointSF.is_service_ready) {
					 * 
					 * $scope.getGFBookStockByInstituteId(); } else {
					 * $log.debug("Services Not Loaded, watiting...");
					 * $timeout($scope.waitForServiceLoad1, 1000); } }
					 * 
					 * $scope.waitForServiceLoad1();
					 */

				});

angular.module("prostudyApp").filter('range', function() {
	return function(val, range) {
		range = parseInt(range);
		for (var i = 0; i < range; i++)
			val.push(i);
		return val;
	};
});