angular.module("prostudyApp").controller(
		"bookCommentAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $stateParams, $state) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Comment Saved!')
						.position("top").hideDelay(3000));
			};
			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();

			$scope.selectedBookId = $stateParams.selectedBookId;

			$scope.tempComment = {
				userID : $scope.curUser.id,
				desc : ""
			}

			$scope.addComments = function() {

				var BookService = appEndpointSF.getBookService();
				BookService.getBookbyID($scope.selectedBookId).then(
						function(BookList) {
							$scope.book = BookList;
							if (typeof $scope.book.comment === 'undefined')
								$scope.book.comment = [];

							$scope.book.comment.push($scope.tempComment);
							$scope.updateBook();
						});
			}

			$scope.updateBook = function() {
				$log.debug("No1");
				var BookService = appEndpointSF.getBookService();
				BookService.updateBook($scope.book).then(function(msgBean) {

					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSavedToast();
					$scope.tempComment =
					{
						
					}
					;

				});

			}

		});
