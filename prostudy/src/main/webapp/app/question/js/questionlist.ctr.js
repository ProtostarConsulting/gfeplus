
angular.module("prostudyApp").controller(
		"questionListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tempQuestion = {
				quesId : "",
				description : "",
				note : "",
				option1 : "",
				option2 : "",
				option3 : "",
				option4 : "",
				correctAns : ""
			};
			
			$scope.questions = [];

			$scope.getQuestion = function() {

				var QuestionService = appEndpointSF.getQuestionService();

				QuestionService.getQuestion().then(function(questionList) {
					$log.debug("Inside Ctr getInstitutes");
					$scope.questions = questionList;
					$log.debug("$scope.questions.option1:" + $scope.questions.option1);
				});
			}

			$scope.modify = function(selectedQuestion) {
				$scope.editingData[selectedQuestion.description] = true;
				$scope.question = selectedQuestion;
			};

			$scope.updateQuestion = function(toUpdateQObject) {

				$log.debug("$scope.updateQuestion");
				var QuestionService = appEndpointSF.getQuestionService();

				QuestionService.updateQuestion(toUpdateQObject).then(
						function(msgBean) {
							$scope.showSavedToast();

						});
			};// end of update

			$scope.removeQuestion = function(index) {
				$scope.questions.splice(index, 1);
			}; // end of removeQuestion

			$scope.clickCancelButton = function() {

				console.log("inside cancelButton");
				$state.go('^', {});

			};// end of cancelButton

			$scope.selected = [];

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
			$scope.getQuestion();

		});
