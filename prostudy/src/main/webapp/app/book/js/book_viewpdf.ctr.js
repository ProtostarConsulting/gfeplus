angular.module("prostudyApp").controller(
		"viewPDFBookCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce, $q) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$scope.blobKey = $stateParams.blobKey;	
			
			$scope.getBook = function() {
				$scope.ServeBookPDFServletURL  ='//' + window.location.host + '/ServeBookPDFServlet?blob-key='+$scope.blobKey;
				
			};
			$scope.ServeBookPDFServletURL;
			$scope.getBook();
		});