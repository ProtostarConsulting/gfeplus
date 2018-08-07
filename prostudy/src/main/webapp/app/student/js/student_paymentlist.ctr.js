angular.module("prostudyApp").controller(
		"studentPaymentListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$log.debug(".........$scope.curUser.id" + $scope.curUser.id);
			$scope.getPayments = function() {

				var PaymentService = appEndpointSF.getPaymentService();
				PaymentService.getPayments().then(function(paymentList) {
					$scope.payments = paymentList;

				});
			}
			$scope.getPayments();
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
