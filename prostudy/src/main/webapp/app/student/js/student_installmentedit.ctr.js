
angular.module("prostudyApp").controller(
		"studentInstallmentEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state,$stateParams) {

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
						
			$scope.selectedInstallment = $stateParams.selectedInstallment;
			$scope.selectedInstallment.date=new Date($scope.selectedInstallment.date);
			
			$scope.selectedPaymentId = $stateParams.selectedPaymentId;
			
			$scope.getPaymentByID = function() {
				
				var PaymentService = appEndpointSF.getPaymentService();			
				PaymentService.getPaymentByID($scope.selectedPaymentId).then(function(payment) {
					
							$scope.payment = payment;
							for(var i=0;i<$scope.payment.installments.length;i++)
							{
							if($scope.selectedInstallment.instid==$scope.payment.installments[i].instid){
								$scope.payment.installments[i]=$scope.selectedInstallment;
								
							}
						}
							
				});
			}
			$scope.getPaymentByID();
			
			$scope.updatePayment = function() {
			
				var PaymentService = appEndpointSF.getPaymentService();
			
				PaymentService.updatePayment($scope.payment).then(function(payment) {
							
					$state.go("student.studentpaymentlist", {});
					});
				}
			$scope.cancelButton = function() {
				$state.go("student.studentpaymentlist", {});
			}
					
			
		});
