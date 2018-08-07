angular.module("prostudyApp").factory('tableTestDataFactory',
		tableTestDataFactoryFn);

function tableTestDataFactoryFn($log, $q, $http) {
	return {
		getStudentList : function() {
			// var items;
			var deferred = $q.defer();

			$http.get("/app/test/student_data1.json").success(function(data) {
				// items = data.items;
				deferred.resolve(data.items);
				$log.debug("inside service data.items:" + data.items);

			});
			// return items;
			return deferred.promise;
		},
		getInstituteList : function() {
			// var items;
			var deferred = $q.defer();

			$http.get("/app/institute/institute_data1.json").success(function(data) {
				// items = data.items;
				deferred.resolve(data.items);
				$log.debug("inside service data.items:" + data.items);

			});
			// return items;
			return deferred.promise;
		},
		getusernameList : function() {
			// var items;
			var deferred = $q.defer();

			$http.get("/app/login/app.user_data1.json").success(function(data) {
				// items = data.items;
				deferred.resolve(data.items);
				$log.debug("inside service data.items:" + data.items);

			});
			// return items;
			return deferred.promise;
		},

		getDessertList : function() {
			var deferred = $q.defer();
			$http.get("/app/test/table_demo_data1.json").success(function(data) {
				deferred.resolve(data.data);
				$log.debug("inside service data.data:" + data.data);
			});
			return deferred.promise;
		},
		getQuestionstList : function() {
			var deferred = $q.defer();
			$http.get("/app/test/question_science_data1.json").success(function(data) {
				$log.debug("inside getQuestionstList data.items:" + data.items);
				deferred.resolve(data.items);				
			});
			return deferred.promise;
		},
		getQuestionScienceList : function() {
			var deferred = $q.defer();
			$http.get("/app/test/question_science_data1.json").success(function(data) {
				$log.debug("inside getQuestionScienceList data.items:" + data.items);
				deferred.resolve(data.items);				
			});
			return deferred.promise;
		},
		getQuestionMathList : function() {
			var deferred = $q.defer();
			$http.get("/app/test/question_math_data2.json").success(function(data) {
				$log.debug("inside getQuestionMathList data.items:" + data.items);
				deferred.resolve(data.items);				
			});
			return deferred.promise;
		},getMyProfileList : function() {
			var deferred = $q.defer();
			$http.get("/app/test/myprofile.json").success(function(data) {
				$log.debug("inside getMyProfileList data.items:" + data.items);
				deferred.resolve(data.items);				
			});
			return deferred.promise;
		}
	}
}