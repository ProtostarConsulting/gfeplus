angular.module("prostudyApp").controller(
		"gfBookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $mdDialog, $mdMedia, tableTestDataFactory, $state,
				appEndpointSF) {
			console.log("Inside studentListPageCtr");

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Scheduled Exam Assigned to Student!').position("top")
						.hideDelay(3000));
			};
			$scope.query = {
				order : 'description',
				limit : 10,
				page : 1
			};

			$scope.courierTypelist = [ "Book", "Certificate",
					"Error Certificate", "Error books", "Prize Certificate" ];

			$scope.getGFBookByInstituteId = function() {

				var gfBookStockService = appEndpointSF.getGFBookStockService();
				gfBookStockService.getGFBookByInstituteId(
						$scope.curUser.instituteID).then(function(tempBooks) {

					$scope.bookStocks = tempBooks;

				});
			}

			$scope.UplodeExcel = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogController,
					templateUrl : '/app/gfbookstock/uploadBulkBooks.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
					locals : {
						curuser : $scope.curUser
					}
				}).then(
						function(answer) {
							$scope.status = 'You said the information was "'
									+ answer + '".';
						}, function() {
							$scope.status = 'You cancelled the dialog.';
						});

			};

			function DialogController($scope, $mdDialog, curuser) {

				$scope.insId = curuser.instituteID;
				$scope.loding = false;

				$scope.UplodeBookCSV = function() {
					$scope.loding = true;
					document.excelform.action = $scope.BulkBookUploadURL;
					// calling servlet action
					document.excelform.submit();
				}

				$scope.BulkBookUploadURL;

				$scope.getBulkBookUploadURL = function() {
					var uploadUrlService = appEndpointSF.getuploadURLService();
					uploadUrlService.getBulkBookUploadURL().then(
							function(url) {
								$scope.BulkBookUploadURL = url.msg;
								$log.debug("$scope.BulkBookUploadURL"
										+ $scope.BulkBookUploadURL);
							});

				}

				$scope.waitForServiceLoad = function() {
					if (appEndpointSF.is_service_ready) {

						$scope.getBulkBookUploadURL();

					} else {
						$log.debug("Services Not Loaded, watiting...");
						$timeout($scope.waitForServiceLoad, 1000);
					}
				}

				$scope.waitForServiceLoad();

			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {

					$scope.getGFBookByInstituteId();

				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}

			$scope.waitForServiceLoad();

			$scope.downloadData = function() {

				document.location.href = "DownloadGFBooks?InstituteId="
						+ $scope.curUser.instituteID;

			}

			$scope.threshold = false;
			$scope.bookStocks1 = [];
			$scope.showThresholdBooks = function(index, selected) {

				if ($scope.threshold == true) {
					for (var i = 0; i < $scope.bookStocks.length; i++) {

						if($scope.bookStocks[i].bookQty <  $scope.bookStocks[i].bookThreshold){
							
						$scope.bookStocks1.push($scope.bookStocks[i]);
						
						$scope.bookStocks = $scope.bookStocks1;
						}
					}

				}else{
					$state.reload();
				}

			}

		});