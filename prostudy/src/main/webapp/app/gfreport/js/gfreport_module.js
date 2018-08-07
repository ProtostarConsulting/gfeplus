angular.module("prostudyApp").controller(
		"gfReportModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF, $sce,
				boardList) {
			
			
			$scope.back = function() {
				window.history.back();
				// $state.go("^", {});
			};
			
			
			
			
		});