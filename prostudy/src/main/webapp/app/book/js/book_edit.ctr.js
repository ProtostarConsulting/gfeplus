angular.module("prostudyApp").controller(
		"bookEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF, $sce,
				boardList, $stateParams) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.selectedBookId = $stateParams.selectedBookId;
			$scope.selectedStd = $stateParams.standard;
			$scope.selectedDiv = $stateParams.division;
			$scope.selectedSub = $stateParams.subject;

			$scope.book = [];
			
			$scope.showToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Updated Successfully!').position("top").hideDelay(
						3000));
			};

			$scope.getChaptersByClass = function() {

				var ChapterService = appEndpointSF.getChapterService();
				ChapterService.getChaptersByClass($scope.curUser.instituteID,
						$scope.selectedStd, $scope.selectedDiv,
						$scope.selectedSub).then(function(list) {
							
							$scope.existingChapters = list;

				});
			}

			$scope.getBookbyID = function() {
				var BookService = appEndpointSF.getBookService();

				BookService.getBookbyID($scope.selectedBookId).then(
						function(bookList) {
							$scope.b1 = bookList;
							$scope.book.push(bookList);
							$scope.chapters = bookList.chapters;

						});

			}

			$scope.getBookbyID();
			$scope.getChaptersByClass();
			
			
			$scope.updateBook = function() {
			
				var BookService = appEndpointSF.getBookService();
				BookService.updateBook($scope.book[0]).then(
						function(msgBean) {
							$scope.b2 = $scope.book;
							$scope.showToast();
							
						});

			}
			
			$scope.moveItem = function(item, from, to) {

				console.log('Move item   Item: ' + item + ' From:: ' + from
						+ ' To:: ' + to);

				var idx = from.indexOf(item);
				if (idx != -1) {
					from.splice(idx, 1);
					to.push(item);
				}
			};

			$scope.moveAll = function(from, to) {
				console.log('Move all  From:: ' + from + ' To:: ' + to);
				angular.forEach(from, function(item) {
					to.push(item);
				});
				from.length = 0;
			};

		});
