angular.module("prostudyApp").controller(
		"viewCertificateCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside viewCertificateCtr");
		
			$scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();
			
			
			$scope.getCertificateById = function() {

				var CertificateService = appEndpointSF.getCertificateService();
				CertificateService.getCertificateById($scope.curUser.id)
						.then(
								function(CertificateList) {
									$scope.certificates = CertificateList;
									$log.debug("$scope.certificates :"+ angular.toJson($scope.certificates));
									

								});
			}
			$scope.getCertificateById();

		});