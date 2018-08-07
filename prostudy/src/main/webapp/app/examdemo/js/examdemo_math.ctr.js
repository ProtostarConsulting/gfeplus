angular.module("prostudyApp").controller(
		"examDemoMathCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory) {

			$log.debug("Inside examDemoMathCtr");
			$scope.currentPage = 0;
			$scope.totalPages = 0;
			$scope.itemsPerPage = 4;
			$scope.count = 0;
			$scope.isDisabledPrevious = false;
			$scope.isDisabledNext = false;

			$scope.loadQuestionsList = function() {

				tableTestDataFactory.getQuestionMathList().then(
						function(data) {
							$scope.questions = [];
							$scope.questions = data;

							$scope.buttonLimit = function(count) {
								$scope.totalPages = Math
										.round($scope.questions.length
												/ $scope.itemsPerPage);
								return Array.apply(0, Array(+count)).map(
										function(value, index) {
											return index;
										});
							}// end of buttonlimit
							
							$scope.onNext();
							$scope.isDisabledPrevious = true;
							

						});// end of tableTestDataFactory
				
			};// end of loadQuestionsList

			$scope.onNext = function() {
				$scope.currentPage++;
				$scope.count = $scope.currentPage;

				$scope.array = $scope.questions.slice(
						($scope.currentPage * $scope.itemsPerPage)
								- $scope.itemsPerPage,
						($scope.currentPage * $scope.itemsPerPage));
				$log.debug("$scope.currentPage=" + $scope.currentPage);

			

				if ($scope.currentPage == $scope.totalPages) {
					$scope.isDisabledNext = true;

				} else {
					$scope.isDisabledPrevious = false;
				}
				
			}// end of onNext

			$scope.onButtonClick = function(index) {
				$log.debug("$index" + index);
				$scope.currentPage = index;
				$scope.count = $scope.currentPage;

				$scope.array = $scope.questions.slice(
						($scope.currentPage * $scope.itemsPerPage)
								- $scope.itemsPerPage,
						($scope.currentPage * $scope.itemsPerPage));
				$log.debug("$scope.currentPage=" + $scope.currentPage);

				

				if ($scope.currentPage == $scope.totalPages)
				{
					$scope.isDisabledNext = true;
					
				} else 
				{					
					$scope.isDisabledNext = false;
				
				}
				
				if ($scope.currentPage == 1)
				{
					$scope.isDisabledPrevious = true;


				} else 
				{
					$scope.isDisabledPrevious = false;
				}
				
			

			};// end of onPage

			$scope.onPrevious = function() 
			{
				$scope.currentPage--;
				$log.debug("Previous"+$scope.currentPage);
				$scope.array = $scope.questions.slice(
						($scope.currentPage * $scope.itemsPerPage)
								- $scope.itemsPerPage,
						($scope.currentPage * $scope.itemsPerPage));
				$log.debug("$scope.currentPage=" + $scope.currentPage);

				if ($scope.currentPage <= 1) {
					$scope.isDisabledPrevious = true;

				} else {
					$scope.isDisabledNext = false;
				}

			}// end of onPrevious

			$scope.selected = [];
			$scope.toggle = function(question, list) {
				var idx = list.indexOf(question);
				if (idx > -1)
					list.splice(idx, 1);
				else
					list.push(question);

			};

			$scope.exists = function(question, list) {
				return list.indexOf(question) > -1;
			};
			$scope.loadQuestionsList();
			
			$log.debug("currentPage: "+$scope.currentPage);
		

		});// end of examDemoMathCtr

