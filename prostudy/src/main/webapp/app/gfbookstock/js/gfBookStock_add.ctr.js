angular
		.module("prostudyApp")
		.controller(
				"gfBookStockAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, objectFactory) {

					$scope.answerOfMediumList = [ "Marathi", "Hindi",
							"English", ];

					$scope.tempStockAddData = {
							feedStockDate : new Date()
					};
					
					$scope.getTempBookStock = function() {
						return {
							book : '',
							bookQty : '',
							feedStockDate : new Date(),
							transactionType : 'Cr',
							instituteID : parseInt($scope.curUser.instituteID),
							modifiedDate : new Date(),
							modifiedBy : $scope.curUser.email_id
						};
					}

					$scope.tempBookStocks = [];
					$scope.newBookStockList = [];
					$scope.newBookStockList.push($scope.getTempBookStock());

					$scope.addNewEntry = function() {
						$scope.newBookStockList.push($scope.getTempBookStock());
					}
					 
					$scope.addGFBookStock = function() {
						
						var gfBookStockService = appEndpointSF
								.getGFBookStockService();

						$scope.newBookStockList
								.forEach(function(bookStockEntry) {
									bookStockEntry.feedStockDate = $scope.tempStockAddData.feedStockDate;
									gfBookStockService
											.addGFBookStock(bookStockEntry)
											.then(
													function(resp) {
														if (bookStockEntry.book.id == $scope.newBookStockList[$scope.newBookStockList.length - 1].book.id) {
															$scope
																	.showUpdateToast();															
														}
													});
								});						
						$state.reload();
					}

					$scope.getGFBookByInstituteId = function() {

						var gfBookStockService = appEndpointSF
								.getGFBookStockService();
						gfBookStockService.getGFBookByInstituteId(
								$scope.curUser.instituteID).then(
								function(tempBookStocks) {
									$scope.tempBookStocks = tempBookStocks;
								});
					}

					$scope.cancel = function() {
						$state.go('gandhifoundation');
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

					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};

				});
