angular.module("prostudyApp").controller(
		"book_chapterListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce, $q) {

			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();
			
			$scope.flag = $stateParams.flag;
			
			$log.debug("flag :"+$scope.flag);
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Book added in My Books!').position("top").hideDelay(
						3000));
			};

			$scope.Chapters = [];

			$scope.selectedBookId = $stateParams.selectedBookId;

			$scope.showBookContents = function() {
				var BookService = appEndpointSF.getBookService();

				BookService.getBookbyID($scope.selectedBookId).then(
						function(bookList) {
							$scope.Chapters = bookList.chapters;

						});

			};

			$scope.showBookContents();

			$scope.cancelButton = function() {

				$state.go('^', {});
			};
			
			$scope.query = {
					order : 'description',
					limit : 5,
					page : 1
				};

				$scope.onpagechange = function(page, limit) {
					var deferred = $q.defer();

					$timeout(function() {
						deferred.resolve();
					}, 2000);

					return deferred.promise;
				};

				$scope.onorderchange = function(order) {
					var deferred = $q.defer();

					$timeout(function() {
						deferred.resolve();
					}, 2000);

					return deferred.promise;
				};

		});
