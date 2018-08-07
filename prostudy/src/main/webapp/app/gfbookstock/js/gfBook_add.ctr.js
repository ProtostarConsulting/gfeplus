angular.module("prostudyApp").controller(
		"gfBookAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory, standardList) {

			$scope.loading = true;
			$scope.answerOfMediumList = [ "Marathi", "Hindi", "English", "Kannada"];
			$scope.tempBook = {
				bookName : '',
				bookAuther : '',
				weight : 0,
				bookPrice : 0,
				bookQty : 0,
				bookMedium : '',
				bookPublication : '',
				bookThreshold : 0,
				bookFeedDate : new Date(),
				standard:''
			}

			$scope.standardList = standardList;

			$scope.selectedGFBookID = $stateParams.selectedGFBookID;

			$scope.addGFBook = function(update) {
				$scope.tempBook.instituteID = $scope.curUser.instituteID;
				if ($scope.tempBook.id != undefined) {
					$scope.update = "update";
					$scope.tempBook.flag = $scope.update;
				}
				
				$scope.tempBook.modifiedDate = new Date();	
				$scope.tempBook.modifiedBy = $scope.curUser.email_id;
				
				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.addGFBook($scope.tempBook).then(
						function(resp) {
							$scope.backObj = resp;
							$scope.addTranAfterAddBook();

							if ($scope.selectedGFBookID != undefined
									&& $scope.selectedGFBookID != "") {
								$scope.showUpdateToast();
							} else {
								$scope.showAddToast();
								/*$scope.gfBookStockForm.$setPristine();
								$scope.gfBookStockForm.$setValidity();
								$scope.gfBookStockForm.$setUntouched();*/
								$scope.tempBook = {};
								$state.reload();
							}

						});

			}

			$scope.addTranAfterAddBook = function() {
				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.addTranAfterAddBook($scope.backObj).then(
						function(resp) {

						});
			}

			$scope.getGFBookById = function() {

				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.getGFBookById($scope.selectedGFBookID).then(
						function(tempBook) {
							$scope.tempBook = tempBook;
							$scope.loading = false;
						});
			}

			$scope.getPartnerByInstitute = function() {

				var PartnerSchoolService = appEndpointSF
						.getPartnerSchoolService();
				PartnerSchoolService.getPartnerByInstitute(
						$scope.curUser.instituteID).then(function(pSchoolList) {
					$scope.pSchoolList = pSchoolList;

				});
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {

					if ($scope.selectedGFBookID != undefined
							&& $scope.selectedGFBookID != "") {
						$scope.getGFBookById();
					} else {
						$scope.loading = false;
					}
					// $scope.getPartnerByInstitute();

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

			$scope.showFailToast = function() {
				$mdToast.show($mdToast.simple().content(
						'This book is Already Added.').position("top")
						.hideDelay(3000));
			};

			$scope.cancelButton = function() {
				$scope.back();
			}
		});
