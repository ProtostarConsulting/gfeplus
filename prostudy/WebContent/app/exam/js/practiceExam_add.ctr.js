angular.module("prostudyApp").controller(
		"addPracticeExamCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $sce, $filter) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Practice Exam Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tempPracticeExam = {
				examId : "",
				examtitle : "",
				board : "",
				standard : "",
				subject : "",
				questions : [],
				date : ""
			};
			$scope.questions = [];

			$scope.getQuestion = function() {

				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.getQuestion().then(function(questionList) {
					$log.debug("Inside Ctr getQuestion");
					$scope.questions = questionList;
				});
			}

			$scope.getQuestion();

			$scope.getSelected = function() {
				$scope.tempPracticeExam.examtitle = $scope.examtitle;
				$scope.tempPracticeExam.board = $scope.board;
				$scope.tempPracticeExam.standard = $scope.standard;
				$scope.tempPracticeExam.subject = $scope.subject;
				$scope.tempPracticeExam.date = new Date();

			}

			$scope.addPracticeExam = function() {
				$log.debug("No1");
				var practiceExamService = appEndpointSF
						.getPracticeExamService();
				for (var i = 0; i < $scope.selected.length; i++) {
					$scope.tempPracticeExam.questions.push($scope.selected[i]);
				}

				practiceExamService.addPracticeExam($scope.tempPracticeExam)
						.then(function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addInstitute");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempPracticeExam = {
								examId : "",
								examtitle : "",
								board : "",
								standard : "",
								subject : "",
								questions : [],
								date : ""
							};
						});
				$log.debug("No4");
				$state.go('exam.listpracticeexam', {});
			}
			// $scope.getPracticeExams();
			// $scope.showselectedExam();

		});