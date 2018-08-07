angular
		.module("prostudyApp")
		.controller(
				"generateTemplateCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF,
						$stateParams) {

					$log.debug("Inside generateTemplateCtr");

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Certificate Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.selectedStudID = $stateParams.selectedStudID;
					$scope.firstName = $stateParams.selectedfirstName;
					$scope.lastName = $stateParams.selectedlastName;
					$scope.selectedExam = $stateParams.selectedExam;
					$scope.selectedScore = $stateParams.selectedScore;
					
					$log.debug("$scope.selectedScore :"+$stateParams.selectedScore);
					$scope.date = new Date();
					$scope.students = [];
					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.certificate = {
						studID : $scope.selectedStudID,
						firstName : $scope.firstName,
						lastName : $scope.lastName,
						exam : $scope.selectedExam,
						score : $scope.selectedScore,
						date : new Date()
					};

					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

					$scope.printCertificate = function(myDiv) {
						window.frames["print_frame"].document.body.innerHTML = printDivCSS
								+ document.getElementById(myDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						window.frames["print_frame"].window.print();

					}

					$scope.addCertificate = function() {
						var CertificateService = appEndpointSF
								.getCertificateService();

						CertificateService.addCertificate($scope.certificate)
								.then(
										function(msgBean) {
											$log.debug("msgBean.msg:"+ angular.toJson(msgBean));
											$scope.showSavedToast();

										});

					}

				});