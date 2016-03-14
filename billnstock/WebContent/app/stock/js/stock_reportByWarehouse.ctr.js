angular.module("stockApp").controller(
		"stockReportByWarehouseCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$http, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");
			
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
	$log.debug("$scope.curUser++++++++"
			+ angular.toJson($scope.curUser));
	
			
			$scope.getReportByThreshold = function(){
				$log.debug("Inside Ctr $scope.getReportByThreshold");
				
				var stockService = appEndpointSF.getStockService();
				
				stockService.getReportByThreshold($scope.curUser.businessAccount.id).then(
						function(stockByThreshold) {
							$scope.thresholdStock = stockByThreshold;
							$log.debug("$scope.thresholdStock:"
									+ angular.toJson($scope.thresholdStock));							
						})
				
			}
			
			$scope.thresholdStock = [];
			$scope.getReportByThreshold();
				
			
			$scope.getAllStock = function() {
				var stockService = appEndpointSF.getStockService();
				stockService.getAllStock($scope.curUser.businessAccount.id).then(
						function(stockList) {
							$scope.stockData = stockList;
							$log.debug("Inside Ctr $scope.stockData:"
									+ angular.toJson($scope.stockData));

						});
			}
			$scope.getAllStock();
			
			
			$scope.getAllWarehouseByBusiness = function() {
				$log.debug("Inside function $scope.getAllWarehouseByBusiness");
				var warehouseService = appEndpointSF.getWarehouseManagementService();

				warehouseService.getAllWarehouseByBusiness($scope.curUser.businessAccount.id).then(
						function(warehouseList) {
							$scope.warehouses = warehouseList;
							$log.debug("Inside Ctr $scope.warehouses:"
									+ angular.toJson($scope.warehouses));
						});
			}

			$scope.getAllWarehouseByBusiness();
			$scope.filteredWarehouseData = [];
			
			$scope.warehouseDDLChange = function(index, selectedWarehouse) {
				$log.debug("##Came to warehouseDDLChange...");

//				$scope.stock.warehouseId = selectedWarehouse;
	
				for(var i=0; i<$scope.stockData.length;i++){
					if($scope.stockData[i].warehouseId.id == selectedWarehouse.id){
						$scope.filteredWarehouseData.push($scope.stockData[i]);
						$log.debug("$scope.stockData[i]"+$scope.stockData[i]);
					}
					else{
						$log.debug("else part");
					}
				}
				
			};
			
//			 Setup menu 
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