
angular.module("prostudyApp").controller(
		"studentInstallmentListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state,$stateParams) {

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			
			$scope.selectedPaymentId= $stateParams.selectedPaymentId;
			
			$log.debug("$stateParams.selectedPaymentId" +$stateParams.selectedPaymentId);
			
	
			$scope.getPaymentByID = function() {
				$scope.payment=[];
				var PaymentService = appEndpointSF.getPaymentService();
			
				PaymentService.getPaymentByID($scope.selectedPaymentId).then(function(paymentList) {
							$scope.payment = paymentList;
							$log.debug("$scope.installments " + angular.toJson($scope.payment.installments));
						});
			}
			$scope.getPaymentByID();
	
			$scope.query = {
				order : 'description',
				limit : 5,
				page : 1
			};

			$scope.onpagechange = function(page, limit) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};

			$scope.onorderchange = function(order) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};
			
		});
