angular
		.module("prostudyApp")
		.controller(
				"gfBookStockListCtr",
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
						order : 'description',
						limit : 10,
						page : 1
					};

					$scope.courierTypelist = [ "Book", "Certificate",
					       					"Error Certificate", "Error books", "Prize Certificate" ];

					$scope.getGFBookStockByInstituteId = function() {

						var gfBookStockService = appEndpointSF.getGFBookStockService();
						gfBookStockService.getGFBookStockByInstituteId($scope.curUser.instituteID)
								.then(function(tempBooks) {
									
									$scope.bookStocks = tempBooks;
								
								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getGFBookStockByInstituteId();
								
							
							
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				
				});