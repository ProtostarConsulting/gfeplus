angular.module("prostudyApp").controller(
		"bookAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF, $sce,
				boardList) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.boards = [ {} ];
			$scope.boards = boardList;

			$scope.standards = [];
			$scope.divisions = [];
			$scope.subjects = [];

			$scope.selectedStdID;
			$scope.stdList;
			$scope.divList;
			$scope.subList;

			$scope.comment = {
				userID : "",
				desc : ""
			}
			$scope.tempBook = {

				id : "",
				instituteID : $scope.curUser.instituteID,
				book_name : "",
				author : "",
				board : "",
				standard : "",
				division : "",
				subject : "",
				chapters : [],
				user : "",
				comment : [],
				likes : 0,
				dislikes : 0,
				isPDF : false,
			// blobKey :""
			};// end of tempBook object

			$scope.getStandardByInstitute = function() {

				var StudentService = appEndpointSF.getStudentService();
				StudentService.getStandardByInstitute(
						$scope.curUser.instituteID).then(
						function(standardList) {
							for (var i = 0; i < standardList.length; i++) {
								$scope.standards.push(standardList[i].name);

							}
							$scope.stdList = standardList;

						});
			}

			$scope.getStandardByInstitute();

			$scope.getDivisionByStandard = function() {

				for (var i = 0; i < $scope.stdList.length; i++) {
					if ($scope.tempBook.standard == $scope.stdList[i].name) {
						$scope.selectedStdID = $scope.stdList[i].id;
					}
				}
				var StudentService = appEndpointSF.getStudentService();
				StudentService.getDivisionByStandard($scope.selectedStdID)
						.then(function(divisionList) {
							for (var i = 0; i < divisionList.length; i++) {
								$scope.divisions.push(divisionList[i].name);
							}
							$scope.divList = divisionList;
						});
				$scope.divisions.splice(0, $scope.divisions.length);
			}

			$scope.getSubjectByDivision = function() {

				for (var i = 0; i < $scope.divList.length; i++) {
					if ($scope.tempBook.division == $scope.divList[i].name) {
						$scope.selectedDivID = $scope.divList[i].id;
					}
				}
				var StudentService = appEndpointSF.getStudentService();
				StudentService.getSubjectByDivision($scope.selectedDivID).then(
						function(subjectList) {
							for (var i = 0; i < subjectList.length; i++) {
								$scope.subjects.push(subjectList[i].name);
							}

						});
				$scope.subjects.splice(0, $scope.subjects.length);
			}

			$scope.addBook = function() {
				if ($scope.tempBook.isPDF != true) {
					
					$scope.tempBook.user = $scope.curUser;
					for (i = 0; i < $scope.selectedChapters.length; i++) {
						$scope.tempBook.chapters
								.push($scope.selectedChapters[i]);
					}
					var BookService = appEndpointSF.getBookService();
					BookService.addBook($scope.tempBook).then(
							function(msgBean) {

								$scope.showSavedToast();
								$scope.bookForm.$setPristine();
								$scope.bookForm.$setValidity();
								$scope.bookForm.$setUntouched();

								$scope.tempBook = {};

							});
				}else
					{
					$log.debug("$scope.curUser.instituteID;"+$scope.curUser.instituteID);
						document.bookForm.action = $scope.logUploadURL;
						// calling servlet action
						document.bookForm.submit();
						
				
					}

			}

			$scope.chapters = [];

			$scope.getChaptersByClass = function() {

				var ChapterService = appEndpointSF.getChapterService();
				ChapterService.getChaptersByClass($scope.curUser.instituteID,
						$scope.tempBook.standard, $scope.tempBook.division,
						$scope.tempBook.subject).then(function(chapterList) {
					$scope.chapters = chapterList;

				});
			}

			$scope.selectedChapters = [];

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Book Saved!')
						.position("top").hideDelay(3000));
			};

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

			$scope.cancelButton = function() {
				$state.go('^', {});
			};

			$scope.uploadBookPDF = function() {
				document.bookForm.action = $scope.logUploadURL;
				// calling servlet action
				document.bookForm.submit();

			}

			$scope.getBookPDFUrl = function() {
				var uploadUrlService = appEndpointSF.getuploadURLService();
				uploadUrlService.getBookPDFUrl().then(function(url) {
					$scope.logUploadURL = url.msg;

				});

			}
			$scope.logUploadURL;

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getBookPDFUrl();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}
			$scope.waitForServiceLoad();

		});// end of bookAddCtr

