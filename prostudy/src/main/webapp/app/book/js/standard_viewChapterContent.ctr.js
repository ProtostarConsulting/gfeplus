angular.module("prostudyApp")
		.controller(
				"standard_viewChapterContentCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF, $state,
						$sce) {
					
					console.log("Inside standard_viewChapterContentCtr");

					$scope.selectedChapterId = $stateParams.selectedChapterId;
					$scope.chapters = [];
					
					$scope.showChapterContent = function() {
					
						var ChapterService = appEndpointSF.getChapterService();
						ChapterService.getChaptersByID($scope.selectedChapterId).then(
										function(chapterList) {

											$scope.chapters.push(chapterList);
											
										});

					};
			
				    $scope.showChapterContent();

					$("#viewChapterContent").show();
					$("#TotalChapters").hide();

					$scope.selectedBookId = $stateParams.selectedBookId;
					
					$scope.viewChapterContent = function() {
						var BookService = appEndpointSF.getBookService();
						
						BookService.getBookbyID($scope.selectedBookId)
								.then(
										function(bookList) {

										$scope.book_ChapterDetails = bookList.chapters;
											
										$scope.selectedChapter = $scope.book_ChapterDetails;
										$scope.totalPages = Math.round($scope.selectedChapter.length/ $scope.itemsPerPage);

											$scope.onNextChapter();
											$("#viewChapterContent").hide();
											$("#TotalChapters").show();

										});

					};
					
					$scope.book_ChapterDetails=[];
					
					$scope.currentPage = 0;
					$scope.totalPages = 0;
					$scope.itemsPerPage = 1;
					$scope.count = 0;
					$scope.isDisabledPrevious = false;
					$scope.isDisabledNext = false;

					$scope.onNextChapter = function() {
						$log.debug("Inside onNextChapter");

						$scope.currentPage++;
						$scope.count = $scope.currentPage;

						for (i = 0; i < $scope.selectedChapter.length; i++) {
							$scope.chaptersOnButton = $scope.selectedChapter
									.slice(
											($scope.currentPage * $scope.itemsPerPage)
													- $scope.itemsPerPage,
											($scope.currentPage * $scope.itemsPerPage));
							
						}
						
						if ($scope.currentPage == $scope.totalPages) {
							$scope.isDisabledNext = true;
							alert("No more questions. Please use previous button.");
							return false;

						} else {
							$scope.isDisabledPrevious = false;
							return true;
						}

					}// end of onNextChapter

					$scope.onPreviousChapter = function() {
						$scope.currentPage--;
						for (i = 0; i < $scope.selectedChapter.length; i++) {
							$scope.chaptersOnButton = $scope.selectedChapter
									.slice(
											($scope.currentPage * $scope.itemsPerPage)
													- $scope.itemsPerPage,
											($scope.currentPage * $scope.itemsPerPage));
							
						}
						
						if ($scope.currentPage <= 1) {
							$scope.isDisabledPrevious = true;
							alert("No more questions. Please use next button.");
							return false;

						} else {
							$scope.isDisabledNext = false;
							return true;
						}

					}

				});

