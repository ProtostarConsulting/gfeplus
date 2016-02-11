angular.module("stockApp").controller(
		"setup",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
			// ////////////////////////////////////////////////////////////////////////////////////////////////
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};
			$scope.selecteduserNo = $stateParams.selecteduserNo;
			$scope.id;

			$scope.business={
					businessName:"",
					adminGmailId:"",
					adminFirstName:"",
					adminLastName:""
						
			}
			$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();

			$scope.getCurUserByEmailId = function() {
				var setupService = appEndpointSF.getsetupService();
				setupService.getCurUserByEmailId($scope.curuser.email_id).then(
						function(user) {
							$scope.business = user.items[0];
							$scope.id = $scope.business.id;
							$log.debug("$scope.business.id"
									+ $scope.business.id);
						});
			}
			
			$scope.getCurUserByEmailId();

			$scope.updateBusiness = function() {
				var setupService = appEndpointSF.getsetupService();
				setupService.updateBusiness($scope.business).then(
						function(msgBean) {
							$scope.showSimpleToast(msgBean);
						});
			}

			$scope.getAllUserOfOrg = function() {
				var setupService = appEndpointSF.getsetupService();
				if (typeof $scope.id != undefined) {
				setupService.getAllUserOfOrg($scope.id).then(function(users) {
					$scope.userslist = users.items;

				});
				}
			}
			$scope.userslist = [];
			$scope.getAllUserOfOrg();

		

		
			// /////////////////////////////////////////////////////////////////////////////////////////////////////

			/*
			 * $scope.items = ["stock","sales","hr","crm"]; $scope.selection=[];
			 * 
			 * 
			 * $scope.toggleSelection = function toggleSelection(itemName) { var
			 * idx = $scope.selection.indexOf(itemName);
			 *  // is currently selected if (idx > -1) {
			 * $scope.selection.splice(idx, 1); }
			 *  // is newly selected else { $scope.selection.push(itemName); }
			 * 
			 * $log.debug("$scope.selection==="+ $scope.selection);
			 *  };
			 * 
			 * 
			 * $scope.user={ id:"", email:"", fName:"", lName:"", password:"",
			 * authority:[] }
			 * 
			 * 
			 * $scope.adduser = function() {
			 * $scope.user.authority=$scope.selection; var setupService =
			 * appEndpointSF.getsetupService();
			 * setupService.adduser($scope.user).then(function(msgBean) {
			 * 
			 * $log.debug("Inside Ctr adduser"); $log.debug("msgBean.msg:" +
			 * msgBean.msg); $scope.showSimpleToast(msgBean.msg);
			 * $scope.getAlluser(); });
			 * 
			 * $scope.user = {}; }
			 *  // return
			 * "http://localhost:8888/img/images/erpag_document_footer.JPG"
			 * 
			 * 
			 * $scope.getAlluser = function() { var setupService =
			 * appEndpointSF.getsetupService();
			 * setupService.getAlluser().then(function(userList) {
			 * $log.debug("Inside Ctr getAlluserList"); $scope.users = userList;
			 * $scope.cleadid = $scope.users.length + 1; $scope.user.id =
			 * $scope.cleadid;
			 * 
			 * }); } $scope.users = []; $scope.getAlluser();
			 * 
			 * $scope.getuserById = function() { $log.debug("Inside Ctr
			 * $scope.getuserById"); var setupService =
			 * appEndpointSF.getsetupService();
			 * 
			 * setupService.getuserById($scope.selecteduserNo).then(
			 * function(userList) { $log.debug("Inside Ctr getAllleads");
			 * $scope.userL = userList[0]; //$scope.ctaskid =
			 * $scope.leads.tasks.length + 1; // $scope.task.id =
			 * $scope.ctaskid; }); }
			 * 
			 * $scope.userL = []; // $scope.activetask = [];
			 * $scope.getuserById();
			 * 
			 * $scope.updateuser = function() {
			 * $scope.userL.authority=$scope.selection; var setupService =
			 * appEndpointSF.getsetupService();
			 * setupService.updateuser($scope.userL).then( function(msgBean) {
			 * $log.debug("Inside Ctr userL"); $log.debug("msgBean.msg:" +
			 * msgBean.msg); $scope.showSimpleToast(msgBean.msg); //
			 * $scope.empDetail = []; }); }
			 */

			$scope.toggleRight = buildToggler('right');

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

		});
