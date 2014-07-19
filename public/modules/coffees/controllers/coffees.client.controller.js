'use strict';

// Coffees controller
angular.module('coffees').controller('CoffeesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Coffees',
	function($scope, $stateParams, $location, Authentication, Coffees ) {
		$scope.authentication = Authentication;

		// Create new Coffee
		$scope.create = function() {
			// Create new Coffee object
			var coffee = new Coffees ({
				name: this.name
			});

			// Redirect after save
			coffee.$save(function(response) {
				$location.path('coffees/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Coffee
		$scope.remove = function( coffee ) {
			if ( coffee ) { coffee.$remove();

				for (var i in $scope.coffees ) {
					if ($scope.coffees [i] === coffee ) {
						$scope.coffees.splice(i, 1);
					}
				}
			} else {
				$scope.coffee.$remove(function() {
					$location.path('coffees');
				});
			}
		};

		// Update existing Coffee
		$scope.update = function() {
			var coffee = $scope.coffee ;

			coffee.$update(function() {
				$location.path('coffees/' + coffee._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Coffees
		$scope.find = function() {
			$scope.coffees = Coffees.query();
		};

		// Find existing Coffee
		$scope.findOne = function() {
			$scope.coffee = Coffees.get({ 
				coffeeId: $stateParams.coffeeId
			});
		};
	}
]);