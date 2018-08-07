
angular.module("prostudyApp").controller(
		"questionListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$mdDialog,Upload, $mdMedia,
				$log, $q, appEndpointSF, $state,ajsCache) {

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tempQuestion = {
				id : "",
				description : "",
				note : "",
				option1 : "",
				option2 : "",
				option3 : "",
				option4 : "",
				correctAns : ""
			};

			$scope.questions = [];
			$scope.qcategory = [];
		
			
			$scope.getQuestionsByInstitute=function(refresh){
				  
				  var QuestionServiceCacheKey = "getQuestions";
				       
				       if (!angular.isUndefined(ajsCache.get(QuestionServiceCacheKey)) && !refresh)
				       {
				        $log.debug("Found List in Cache, return it.");
				        $scope.questions = ajsCache.get(QuestionServiceCacheKey);
				        return;
				       }
				  
				       var QuestionService = appEndpointSF.getQuestionService();
						QuestionService.getQuestionsByInstitute($scope.curUser.instituteID).then(
								function(questionsList) {
									$scope.questions = questionsList;
									ajsCache.put(QuestionServiceCacheKey,$scope.questions);
								});
				       
				 };
			
			
			$scope.addQuestion = function(tempQuestion) {

				
				tempQuestion.instituteID = $scope.curUser.instituteID;
				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.addQuestion(tempQuestion)
						.then(
								function(addedQ) {

									$scope.showSavedToast();

								});

			}
	$scope.downloadQuestionList=function(){
				
				$log.debug("in download ");
				
				document.location.href="DownloadQuestionListServlet?InstituteId="+$scope.curUser.instituteID ;
					
			}

			$scope.uploadExcel = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog
						.show(
								{
									controller : DialogController,
									templateUrl : '/app/exam/practiceExam_uploadQuestionList.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen,
									locals : {
										curUser:$scope.curUser ,
										addQuestion:$scope.addQuestion
										
									}										
									
								})
						.then(
								function(answer) {
									$scope.status = 'You said the information was "'
											+ answer + '".';
								},
								function() {
									$scope.status = 'You cancelled the dialog.';
								});

			};

			function DialogController($scope, $mdDialog,curUser,addQuestion) {

				$scope.csvFile;
				$scope.uploadProgressMsg = null;
				
				$scope.uploadQuestionListCSV = function() {
					var csvFile = $scope.csvFile;
					Upload
							.upload(
									{
										url : 'UploadQuestionListServlet',
										data : {
											file : csvFile,
											'instituteID' : curUser.instituteID
										}
									})
							.then(
									function(resp) {
										$log.debug('Successfully uploaded '
														+ resp.config.data.file.name
														+ '.'
														+ angular
																.toJson(resp.data));
										$scope.uploadProgressMsg = 'Successfully uploaded '
												+ resp.config.data.file.name
												+ '.';
										$mdToast.show($mdToast.simple()
														.content('QuestionList Uploaded Sucessfully.')
														.position("top")
														.hideDelay(3000));
										$scope.QuestionList=resp.data;
					                    console.log('Success '+angular.toJson($scope.QuestionList));
					                  			                    
					                    
					                    for(var i=0; i< $scope.QuestionList.length;i++)
					                    	{
					                    	   console.log('Success '+angular.toJson($scope.QuestionList[i]));
					                    	   addQuestion($scope.QuestionList[i]);
					                    	}
					                    $mdDialog.hide();			                    
										$scope.csvFile = null;				
										
									},
									function(resp) {
										$log.debug('Error Ouccured, Error status: '
														+ resp.status);
										$scope.uploadProgressMsg = 'Error: '
												+ resp.status;
									},
									function(evt) {
										var progressPercentage = parseInt(100.0
												* evt.loaded
												/ evt.total);
										$log.debug('Upload progress: '
														+ progressPercentage
														+ '% '
														+ evt.config.data.file.name);
										$scope.uploadProgressMsg = 'Upload progress: '
												+ progressPercentage
												+ '% '
												+ evt.config.data.file.name;
										+'...'
									});
				};

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
			
			$scope.getQuestionsByInstitute();

		});
