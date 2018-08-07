angular
		.module("prostudyApp")
		.controller("standard_chapterListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF, $state,
						$sce, $q) {
					console.log("Inside standard_chapterListCtr");

					$scope.book_ChapterDetails = [];
					$scope.chapters = [];
					
					$scope.selectedChapter = {
						id : "",
						chapterId :"",
						chapter_name : "",
						chapter_content : "",
						board : "",
						student_class : "",
						subject : "",
					};

					$scope.selectedBookId = $stateParams.selectedBookId;
					$scope.selectedBookBlobKey = $stateParams.selectedBookBlobKey;
					
					$scope.showBookContents = function() {
						var BookService = appEndpointSF.getBookService();
						
						BookService.getBookbyID($scope.selectedBookId)
								.then(
										function(bookList) {
										if(bookList.isPDF != true){
											$scope.book_ChapterDetails = bookList.chapters;
											//$scope.selectedChapter = $scope.book_ChapterDetails;
											for (var i = 0; i < bookList.chapters.length; i++) {
												$scope.chapters.push($scope.book_ChapterDetails[i]);
											}
										}
										else{
											//window.location.href = 'app/book/book_viewpdf.html?blobKey='+$scope.selectedBookBlobKey;
											$state.go('book.viewbookpdf', {blobKey: $scope.selectedBookBlobKey });
										}
										
										

										});

					};

					
					$scope.showBookContents();

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

