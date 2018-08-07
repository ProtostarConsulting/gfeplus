angular.module("prostudyApp").controller(
		"setLogoCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory) {

			$scope.logoURL;
			$scope.selectedInstituteID = $stateParams.selectedInstituteID;	
			$scope.currUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			function showLogo() {

				$log.debug("$scope.currUser.instituteObj.logBlobKey==="
						+ $scope.currUser.instituteObj.logBlobKey);
				$scope.logoURL = '//' + window.location.host+ '/serve?blob-key='+ $scope.currUser.instituteObj.logBlobKey;
				$log.debug("$scope.logoURL==" + $scope.logoURL);
				

			}
			
			$scope.logBaseURL = '//' + window.location.host + '/serve?blob-key='+ $scope.curUser.instituteObj.logBlobKey;
			
			$scope.curUser;
			$scope.getLogUploadURL = function() {
				var uploadUrlService = appEndpointSF.getuploadURLService();
				uploadUrlService.getLogUploadURL().then(function(url) {
					$scope.logUploadURL = url.msg;
					$scope.instID = $scope.curUser.instituteID;
				});

			}
			$scope.logUploadURL;

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					showLogo();
					$scope.getLogUploadURL();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}
			$scope.waitForServiceLoad();

			$scope.uplodeimage = function() {
				/* action="{{logUploadURL}}" */
				document.imageform.action = $scope.logUploadURL;
				// calling servlet action
				document.imageform.submit();

				// $scope.getBusinessById();
			}

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple()
						.content('Institute User Saved!').position("top")
						.hideDelay(3000));
			};
		});
