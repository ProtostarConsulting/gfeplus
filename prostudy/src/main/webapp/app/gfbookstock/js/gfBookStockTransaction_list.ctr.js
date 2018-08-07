angular
		.module("prostudyApp")
		.controller(
				"gfBookstockTransactionListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $mdDialog, $mdMedia,
						tableTestDataFactory, appEndpointSF) {
					console.log("Inside studentListPageCtr");

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Assigned to Student!')
								.position("top").hideDelay(3000));
					};
					$scope.query = {
						order : '-transactionDate',
						limit : 60,
						page : 1
					};


					$scope.getGFBookStockTransactionByInstituteId = function() {

						var gfBookStockService = appEndpointSF.getGFBookStockService();
						gfBookStockService.getGFBookStockTransactionByInstituteId($scope.curUser.instituteID)
								.then(function(tempBooks) {
									
									$scope.bookStocks = tempBooks;
								
								});
					}
					
					$scope.downloadBookTranscation = function(){
						
						document.location.href="DownloadBookStockTransaction?BookStockTransactionByInstituteId="+$scope.curUser.instituteID;
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getGFBookStockTransactionByInstituteId();
								
							
							
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				
				});