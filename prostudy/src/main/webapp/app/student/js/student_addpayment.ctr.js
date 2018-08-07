angular
		.module("prostudyApp")
		.controller(
				"studentAddPaymentCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,
						$state, $stateParams, installmentList) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Payment Saved!').position("top").hideDelay(
								3000));
					};
					$scope.flag = false;
					$scope.installmentList = [];
					$scope.installmentList = installmentList;
					$scope.selectedStud = $stateParams.selectedStud;
					
					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.createInstallments = function() {

						$scope.installments = [];
						for (var i = 0; i < $scope.tempPayment.noofinstallments; i++) {

							$scope.installments
									.push($scope
											.getTempInstallment(
													i,
													parseInt($scope.tempPayment.totalFees)
															/ parseInt($scope.tempPayment.noofinstallments)));
						}

						$scope.flag = true;
					}

					$scope.makeInstallment = function(id, date, notes, status) {

						for (var i = 0; i < $scope.installments.length; i++) {
							if ($scope.installments[i].instid == id) {

								$scope.installments[i].date = date;
								$scope.installments[i].notes = notes;
								$scope.installments[i].status = status;
							
								/*if ($scope.installments[i].status == true) {
									$scope.installments[i].paiddate = new Date();
								}*/
								
							}
						}
					}
					$scope.getTempInstallment = function(id, amt) {
						return {
							instid : id + 1,
							amount : amt,
							status : false,
							notes : "",
							date : "",
							//paiddate : ""
						};
					}
					$scope.tempPayment = {
						studId : $scope.selectedStud.id,
						paymentDescription : "",
						totalFees : "",
						paymentYear : new Date().getFullYear(),
						noofinstallments : "",
						installments : [],
					};

					$scope.addStudentPayment = function() {		
						$log.debug("$scope.installments***"+angular.toJson($scope.installments));
						$scope.tempPayment.installments = $scope.installments;
						var PaymentService = appEndpointSF.getPaymentService();
						PaymentService.addStudentPayment($scope.tempPayment)
								.then(function(inst) {
									$scope.showSavedToast();
									$scope.tempPayment = {};

								});
						$state.go("student.list", {});
					}
					
					$scope.cancelButton = function() {
						$state.go("^", {});
					}

				});
