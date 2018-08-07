angular.module("prostudyApp")
		.controller(
				"examResultCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory) {
					console.log("Inside examResultCtr");
					
				  $scope.isShowTable = true;
				  $scope.isShowRecord = false;
				 
					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Result Saved!').position("top").hideDelay(
								3000));
					};

					
					$log.debug("inside ctr before service get $scope.items:"
							+ $scope.items);
				
					$scope.examresult = [];
					$scope.selected = [];
					tableTestDataFactory.getExamResult().then(
							function(data) {
								$scope.examresult = data;
							
							});// end of tableTestDataFactory
					

					$log.debug("inside ctr after service get $scope.items:"
							+ $scope.items);

					$scope.selected = [];

					$scope.query = {
						order : 'name',
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

					/* Setup menu */
					$scope.toggleRight = buildToggler('rightListPage');
					/**
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
					 */
					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};
					
				//	$scope.editRecord = create copy of selected[0]; 
					$scope.details = function() {
						
						 $scope.isShowTable = false;
						  $scope.isShowRecord = true;
						  $scope.editRecord = angular.copy($scope.selected[0]);			  
					}
					$scope.cancel = function() {
						
						 $scope.isShowTable = true;
						  $scope.isShowRecord = false;
							
					}
					 
				
					
					$scope.save = function()
					{
						for(var i=0; i<$scope.examresult.length;i++)
						{
						
							if($scope.examresult[i].exam_id==$scope.editRecord.exam_id)
								{
								$scope.examresult[i]=$scope.editRecord;
								$scope.selected=$scope.editRecord;
								break;
								}
							
						}
					
						$scope.isShowTable = true;
						 $scope.isShowRecord = false;
						
					}

				});

