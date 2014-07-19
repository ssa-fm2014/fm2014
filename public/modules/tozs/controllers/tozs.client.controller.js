'use strict';

// Tozs controller
angular.module('tozs').controller('TozsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tozs',
	function($scope, $stateParams, $location, Authentication, Tozs ) {
		$scope.authentication = Authentication;

		// Create new Toz
		$scope.create = function() {
			// Create new Toz object
			var toz = new Tozs ({
				name: this.name
			});

			// Redirect after save
			toz.$save(function(response) {
				$location.path('tozs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Toz
		$scope.remove = function( toz ) {
			if ( toz ) { toz.$remove();

				for (var i in $scope.tozs ) {
					if ($scope.tozs [i] === toz ) {
						$scope.tozs.splice(i, 1);
					}
				}
			} else {
				$scope.toz.$remove(function() {
					$location.path('tozs');
				});
			}
		};

		// Update existing Toz
		$scope.update = function() {
			var toz = $scope.toz ;

			toz.$update(function() {
				$location.path('tozs/' + toz._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tozs
		$scope.find = function() {
			$scope.tozs = Tozs.query();
		};

		// Find existing Toz
		$scope.findOne = function() {
			$scope.toz = Tozs.get({ 
				tozId: $stateParams.tozId
			});
		};
	}
]);