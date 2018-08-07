angular.module("prostudyApp").controller(
		"homeCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $timeout, $interval, Upload) {
			$scope.loginCheck();
			
			$scope.loading = true;
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.myDate = new Date();

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('X Saved!').position(
						"top").hideDelay(3000));
			};

			$scope.showDateValue = function() {
				console.log("in side showDateValue");
				$log.debug("$scope.myDate:" + $scope.myDate);

			};

			$scope.submit = function() {
				if ($scope.form.file.$valid && $scope.file) {
					$scope.upload($scope.file);
				}
			};

			function getSchoolStudentCount() {
				$scope.loading = true;
				var PartnerSchoolService = appEndpointSF
						.getPartnerSchoolService();
				
				/*PartnerSchoolService.getCurrentYearSchoolAndStudentCount()
						.then(function(resp) {
							$scope.schoolStudCount = {
								schoolCount : 0,
								studentcount : 0,
								lastModifiedDate : "NA"
							};

							if (resp.schoolCount != undefined) {
								$scope.schoolStudCount = resp;
								$scope.schoolStudCount.totalSchoolColleges = parseInt(resp.schoolCount) + parseInt(resp.collegeCount);
								$scope.schoolStudCount.totalStudents = parseInt(resp.schoolStudentcount) + parseInt(resp.collegeStudentcount);
							}
							
							$scope.loading = false;
						});*/
			}

			$scope.waitForServiceLoad = function(authResult) {
				if (!appEndpointSF.is_service_ready) {
					$log.debug("Home Ctr: Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);

				} else {
					getSchoolStudentCount();
				}
			}
			$scope.waitForServiceLoad();

			// Test upload file code
			$scope.username = "testuser220";

			// upload on file select or drop
			$scope.upload = function(file) {
				Upload.upload({
					url : 'uploadtestngfile',
					data : {
						file : file,
						'username' : $scope.username,
						'instituteId' : $scope.curUser.instituteID
					}
				}).then(
						function(resp) {
							console.log('Successfully '
									+ resp.config.data.file.name
									+ 'uploaded. Response from Servlet: '
									+ angular.toJson(resp.data));
							$scope.uploadProgressMsg = 'Successfully '
									+ resp.config.data.file.name + 'uploaded.';
							$mdToast.show($mdToast.simple().content(
									'Students Data Uploaded Sucessfully.')
									.position("top").hideDelay(3000));
						},
						function(resp) {
							console.log('Error Ouccured, Error status: '
									+ resp.status);
							$scope.uploadProgressMsg = 'Error: ' + resp.status;
						},
						function(evt) {
							var progressPercentage = parseInt(100.0
									* evt.loaded / evt.total);
							console.log('progress: ' + progressPercentage
									+ '% ' + evt.config.data.file.name);
							$scope.uploadProgressMsg = 'progress: '
									+ progressPercentage + '% '
									+ evt.config.data.file.name;
						});
			};

			$scope.csvFile;
			$scope.uploadProgressMsg = null;
			$scope.uploadBooksCSV = function() {
				var csvFile = $scope.csvFile;
				Upload.upload({
					url : 'UploadBulkBookServlet',
					data : {
						file : csvFile,
						'username' : $scope.username,
						'instituteId' : $scope.curUser.instituteID
					}
				}).then(
						function(resp) {
							console.log('Successfully uploaded '
									+ resp.config.data.file.name + '.'
									+ angular.toJson(resp.data));
							$scope.uploadProgressMsg = 'Successfully uploaded '
									+ resp.config.data.file.name + '.';
							$mdToast.show($mdToast.simple().content(
									'Students Data Uploaded Sucessfully.')
									.position("top").hideDelay(3000));
							$scope.csvFile = null;
						},
						function(resp) {
							console.log('Error Ouccured, Error status: '
									+ resp.status);
							$scope.uploadProgressMsg = 'Error: ' + resp.status;
						},
						function(evt) {
							var progressPercentage = parseInt(100.0
									* evt.loaded / evt.total);
							console.log('Upload progress: '
									+ progressPercentage + '% '
									+ evt.config.data.file.name);
							$scope.uploadProgressMsg = 'Upload progress: '
									+ progressPercentage + '% '
									+ evt.config.data.file.name;
							+'...'
						});
			};

			// END Test upload file code

		});
