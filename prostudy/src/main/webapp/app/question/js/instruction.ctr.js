function init() {
	console.log("Inside init");
	window.initGAPI(); 

}

app = angular.module("instructionApp", ['ngMaterial', 'ngMessages']);

app.controller("instructionCtr", ['$scope',
	                              '$window',
		                          '$mdToast',
		
		function($scope, $window,$mdToast)
		{
			
			console.log("Inside newQuestionCtr");
			$window.initGAPI = function() {
				console.log("Came to initGAPI");
				$scope.$apply($scope.loadCustomService);
			
			};

			$scope.loadCustomService = function() {
				console.log("Inside window.loadCustomServices");
				var apiRoot = '//' + window.location.host + '/_ah/api';

				// Loads the OAuth and helloworld APIs
				// asynchronously, and
				// triggers login
				// when they have completed.
				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()
			}

			
		
} ]);

