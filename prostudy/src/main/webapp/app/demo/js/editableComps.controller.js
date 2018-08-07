function init() {
	// alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

var app = angular.module("myapp", [ "xeditable", "ui.bootstrap", "datatables"]);

app.run(function(editableOptions, editableThemes) {
	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	editableOptions.theme = 'bs3';
});

app.controller("editableController", [ '$scope', '$window',
		function($scope, $window)

		{
			$scope.msg = "Default Msg"

			$scope.testFn = function() {
				alert("Hi, dear!");

			};

			$window.initGAPI = function() {
				// $scope.$apply($scope.initgapi);
				$scope.$apply($scope.loadCustomServices);
				// alert("Inside window.initGAPI");

			};

			$scope.loadCustomServices = function() {
				var apiRoot = '//' + window.location.host + '/_ah/api';

				// Loads the OAuth and helloworld APIs
				// asynchronously, and
				// triggers login
				// when they have completed.
				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()
				gapi.client.load('taxServices', 'v0.1', function() {
					$scope.is_backend_ready = true;
					//$scope.getAllTaxServices();

				}, apiRoot);

			};

		} ]);

app.controller('TextCustomizeCtrl', function($scope) {
	$scope.user = {
		name : 'awesome user'
	};
});

app.controller('TypeaheadCtrl',
		function($scope) {
			$scope.user = {
				state : 'Arizona'
			};

			$scope.states = [ 'Alabama', 'Alaska', 'Arizona', 'Arkansas',
					'California', 'Colorado', 'Connecticut', 'Delaware',
					'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
					'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
					'Maine', 'Maryland', 'Massachusetts', 'Michigan',
					'Minnesota', 'Mississippi', 'Missouri', 'Montana',
					'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
					'New Mexico', 'New York', 'North Dakota', 'North Carolina',
					'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
					'Rhode Island', 'South Carolina', 'South Dakota',
					'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
					'Washington', 'West Virginia', 'Wisconsin', 'Wyoming' ];
		});

app.controller('EditableFormCtrl', function($scope, $filter, $http) {
	$scope.user = {
		id : 1,
		name : 'awesome user',
		status : 2,
		group : 4,
		groupName : 'admin'
	};

	$scope.statuses = [ {
		value : 1,
		text : 'status1'
	}, {
		value : 2,
		text : 'status2'
	}, {
		value : 3,
		text : 'status3'
	}, {
		value : 4,
		text : 'status4'
	} ];

	$scope.groups = [ {
		value : 1,
		text : 'Group1'
	}, {
		value : 2,
		text : 'Group2'
	}, {
		value : 3,
		text : 'Group3'
	}, {
		value : 4,
		text : 'Group4'
	} ];

	$scope.loadGroups = function() {
		return $scope.groups;

	};

	$scope.showGroup = function() {
		if ($scope.groups.length) {
			var selected = $filter('filter')($scope.groups, {
				id : $scope.user.group
			});
			return selected.length ? selected[0].text : 'Not set';
		} else {
			return $scope.user.groupName;
		}
	};

	$scope.checkName = function(data) {
		if (data !== 'awesome' && data !== 'error') {
			return "Username should be `awesome` or `error`";
		}
	};

	$scope.saveUser = function() {

	};
});

app.controller('EditableTableCtrl', function($scope, $filter, $http, $q) {
	$scope.users = [ {
		id : 1,
		name : 'awesome user1',
		status : 2,
		group : 4,
		groupName : 'admin'
	}, {
		id : 2,
		name : 'awesome user2',
		status : undefined,
		group : 3,
		groupName : 'vip'
	}, {
		id : 3,
		name : 'awesome user3',
		status : 2,
		group : null
	} ];

	$scope.statuses = [ {
		value : 1,
		text : 'status1'
	}, {
		value : 2,
		text : 'status2'
	}, {
		value : 3,
		text : 'status3'
	}, {
		value : 4,
		text : 'status4'
	} ];

	$scope.groups = [ {
		value : 1,
		text : 'Group1'
	}, {
		value : 2,
		text : 'Group2'
	}, {
		value : 3,
		text : 'Group3'
	}, {
		value : 4,
		text : 'Group4'
	} ];
	$scope.loadGroups = function() {
		return $scope.groups;
	};

	$scope.showGroup = function(user) {
		if (user.group && $scope.groups.length) {
			var selected = $filter('filter')($scope.groups, {
				id : user.group
			});
			return selected.length ? selected[0].text : 'Not set';
		} else {
			return user.groupName || 'Not set';
		}
	};

	$scope.showStatus = function(user) {
		var selected = [];
		if (user.status) {
			selected = $filter('filter')($scope.statuses, {
				value : user.status
			});
		}
		return selected.length ? selected[0].text : 'Not set';
	};

	$scope.checkName = function(data, id) {
		if (id === 2 && data !== 'awesome') {
			return "Username 2 should be `awesome`";
		}
	};

	// filter users to show
	$scope.filterUser = function(user) {
		return user.isDeleted !== true;
	};

	// mark user as deleted
	$scope.deleteUser = function(id) {
		var filtered = $filter('filter')($scope.users, {
			id : id
		});
		if (filtered.length) {
			filtered[0].isDeleted = true;
		}
	};

	// add user
	$scope.addUser = function() {
		$scope.users.push({
			id : $scope.users.length + 1,
			name : '',
			status : null,
			group : null,
			isNew : true
		});
	};

	// cancel all changes
	$scope.cancel = function() {
		for (var i = $scope.users.length; i--;) {
			var user = $scope.users[i];
			// undelete
			if (user.isDeleted) {
				delete user.isDeleted;
			}
			// remove new
			if (user.isNew) {
				$scope.users.splice(i, 1);
			}
		}
		;
	};

	// save edits
	$scope.saveTable = function() {
		var results = [];
		for (var i = $scope.users.length; i--;) {
			var user = $scope.users[i];
			// actually delete user
			if (user.isDeleted) {
				$scope.users.splice(i, 1);
			}
			// mark as not new
			if (user.isNew) {
				user.isNew = false;
			}

			// send on server
			// results.push($http.post('/saveUser', user));
		}

		return $q.all(results);
	};
});

app.controller('ModalDemoCtrl', function($scope, $modal, $log) {

	$scope.items = [ 'item1', 'item2', 'item3' ];

	$scope.animationsEnabled = true;

	$scope.open = function(size) {

		var modalInstance = $modal.open({
			animation : $scope.animationsEnabled,
			templateUrl : 'myModalContent.html',
			controller : 'ModalInstanceCtrl',
			size : size,
			resolve : {
				items : function() {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.toggleAnimation = function() {
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};

});

// Please note that $modalInstance represents a modal window (instance)
// dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item : $scope.items[0]
	};

	$scope.ok = function() {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});

app
		.controller(
				'DatepickerDemoCtrl',
				function($scope) {
					$scope.today = function() {
						$scope.dt = new Date();
					};
					$scope.today();

					$scope.clear = function() {
						$scope.dt = null;
					};

					// Disable weekend selection
					$scope.disabled = function(date, mode) {
						return (mode === 'day' && (date.getDay() === 0 || date
								.getDay() === 6));
					};

					$scope.toggleMin = function() {
						$scope.minDate = $scope.minDate ? null : new Date();
					};
					$scope.toggleMin();

					$scope.open = function($event) {
						$event.preventDefault();
						$event.stopPropagation();

						$scope.opened = true;
					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd',
							'dd.MM.yyyy', 'shortDate' ];
					$scope.format = $scope.formats[0];

					var tomorrow = new Date();
					tomorrow.setDate(tomorrow.getDate() + 1);
					var afterTomorrow = new Date();
					afterTomorrow.setDate(tomorrow.getDate() + 2);
					$scope.events = [ {
						date : tomorrow,
						status : 'full'
					}, {
						date : afterTomorrow,
						status : 'partially'
					} ];

					$scope.getDayClass = function(date, mode) {
						if (mode === 'day') {
							var dayToCheck = new Date(date)
									.setHours(0, 0, 0, 0);

							for (var i = 0; i < $scope.events.length; i++) {
								var currentDay = new Date($scope.events[i].date)
										.setHours(0, 0, 0, 0);

								if (dayToCheck === currentDay) {
									return $scope.events[i].status;
								}
							}
						}

						return '';
					};
				});


app.controller('AngularWayChangeDataCtrl', AngularWayChangeDataCtrl);

function AngularWayChangeDataCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder) {
    var vm = this;
    //vm.persons = $resource('/demo/data1.json').query();
    
    vm.persons =[{
        "id": 860,
        "firstName": "Superman2",
        "lastName": "Yoda"
    }, {
        "id": 870,
        "firstName": "Foo",
        "lastName": "Whateveryournameis"
    }, {
        "id": 590,
        "firstName": "Toto",
        "lastName": "Titi"
    }];
    
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];
    vm.person2Add = _buildPerson2Add(1);
    vm.addPerson = addPerson;
    vm.modifyPerson = modifyPerson;
    vm.removePerson = removePerson;

    function _buildPerson2Add(id) {
        return {
            id: id,
            firstName: 'Foo' + id,
            lastName: 'Bar' + id
        };
    }
    function addPerson() {
        vm.persons.push(angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function modifyPerson(index) {
        vm.persons.splice(index, 1, angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function removePerson(index) {
        vm.persons.splice(index, 1);
    }
}
