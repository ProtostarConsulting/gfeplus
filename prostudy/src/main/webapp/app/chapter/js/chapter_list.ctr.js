angular.module("prostudyApp").controller(
		"chapterListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, appEndpointSF, $state, $sce, $stateParams, $q) {

			$scope.selectedChapterId = $stateParams.selectedChapterId;
			$scope.chapter = [];
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Chapter Updated!').position("top").hideDelay(
						3000));
			};
			
			$scope.getChaptersByInstitute = function() {

				var ChapterService = appEndpointSF.getChapterService();
				ChapterService.getChaptersByInstitute(
						$scope.curUser.instituteID).then(function(chapterList) {
					$scope.chapters = chapterList;

				});
			}
			$scope.getChaptersByInstitute();
			
			$scope.getChaptersByID = function() {

				var ChapterService = appEndpointSF.getChapterService();
				ChapterService.getChaptersByID($scope.selectedChapterId)
						.then(
								function(chapterData) {
									$scope.chapter.push(chapterData);		
											
									
								});
			}
			
			$scope.updateChapter = function() {

				var ChapterService = appEndpointSF.getChapterService();
				ChapterService.updateChapter($scope.chapter[0]).then(
						function(msgBean) {

							$scope.showSavedToast();
							$state.go('chapter.list');
						});

			}
			
			$scope.cancel = function() {
				$state.go('chapter.list');
			}
			
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