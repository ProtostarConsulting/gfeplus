angular
		.module("prostudyApp")
		.controller(
				"chapterViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF, $state, $sce, $stateParams) {
					console.log("Inside chapterViewCtr");

					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
				
				
					$scope.selectedChapterId = $stateParams.selectedChapterId;
					$log.debug("$scope.selectedChapterId :"+$scope.selectedChapterId);
					
					$scope.chapters = [];

					
					$scope.getChaptersByID = function() {

						var ChapterService = appEndpointSF.getChapterService();
						ChapterService.getChaptersByID($scope.selectedChapterId)
								.then(
										function(chapterList) {
											$scope.chapters.push(chapterList);
											$log.debug("$scope.chapters :"+ angular.toJson($scope.chapters));
											

										});
					}
					$scope.getChaptersByID();

					$scope.cancelButton = function() {
						
						$state.go('^', {});
					}; 

					

				});
