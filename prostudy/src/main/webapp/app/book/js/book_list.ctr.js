angular
		.module("prostudyApp")
		.controller(
				"bookListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF, $state,
						$sce, $q) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Added Book to MyBooks!').position("top")
								.hideDelay(3000));
					};

					$scope.books = [];
					$scope.getBooksByInstitute = function() {

						var BookService = appEndpointSF.getBookService();
						BookService.getBooksByInstitute(
								$scope.curUser.instituteID).then(
								function(bookList) {
									$scope.books = bookList;
									$log.debug("list:"
											+ angular.toJson($scope.books));
								});
					}
					$scope.getBooksByInstitute();

					$scope.isContainsBook = function(bookid) {
						if (typeof $scope.curUser.myBooks === 'undefined') {
							$scope.curUser.myBooks = [];
						} else {
							for (var i = 0; i < $scope.curUser.myBooks.length; i++) {
								if (angular.equals(
										$scope.curUser.myBooks[i].id, bookid)) {
									return true;
								}
							}
						}
						return false;
					};

					if (typeof $scope.curUser.myBooks === 'undefined') {
						$scope.curUser.myBooks = [];
					}
					$scope.isContainsBook = appEndpointSF.getUtilityService().objectArrayContains;

					$scope.addBookToMyList = function(selectedBookId) {
						var selectedBook = null;
						if (typeof $scope.curUser.myBooks === 'undefined')
							$scope.curUser.myBooks = [];

						for (var i = 0; i < $scope.books.length; i++) {
							if ($scope.books[i].id == selectedBookId) {
								selectedBook = $scope.books[i];
								break;
							}
						}

						$scope.curUser.myBooks.push(selectedBook);
						$scope.updateUser();
					}

					$scope.updateUser = function() {

						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.curUser).then(
								function(msgBean) {

									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSavedToast();
								});

					}

					$scope.assignBookToStudent = function(book) {

						var gfStudentService = appEndpointSF
								.getGFStudentService();
						gfStudentService.addBookToStudent(book).then(
								function(resp) {
									$mdToast.show($mdToast.simple().content(
											'Assigned Book To Student..!')
											.position("top").hideDelay(3000));
								});

					}

					$scope.like = function(selectedBookId) {

						for (i = 0; i < $scope.books.length; i++) {
							if ($scope.books[i].id == selectedBookId) {
								$scope.books[i].likes++;
								$scope.newBook = $scope.books[i];
								break;
							}
						}
						$scope.updateLikeCount();
					}

					$scope.updateLikeCount = function() {
						var BookService = appEndpointSF.getBookService();
						BookService.likeCount($scope.newBook).then(
								function(msgBean) {
									$log.debug("msgBean.msg:" + msgBean.msg);
								});
					}

					$scope.dislike = function(selectedBookId) {

						for (i = 0; i < $scope.books.length; i++) {
							if ($scope.books[i].id == selectedBookId) {
								$scope.books[i].dislikes++;
								$scope.newBook = $scope.books[i];
								break;
							}
						}
						$scope.updateDislikeCount()
					}

					$scope.updateDislikeCount = function() {
						var BookService = appEndpointSF.getBookService();
						BookService.dislikeCount($scope.newBook).then(
								function(msgBean) {
									$log.debug("msgBean.msg:" + msgBean.msg);
								});
					}

					$scope.cancelButton = function() {
						$log.debug("inside cancelButton");
						$state.go('^', {});
					};

					$scope.ServeBookPDFServletURL;
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
