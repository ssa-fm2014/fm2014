'use strict';

// Benes controller
angular.module('benes').controller('BenesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Benes',
	function($scope, $stateParams, $location, Authentication, Benes ) {
		$scope.authentication = Authentication;

		// Create new Bene
		$scope.create = function() {
			// Create new Bene object
			var bene = new Benes ({
				name: this.name
			});

			// Redirect after save
			bene.$save(function(response) {
				$location.path('benes/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Bene
		$scope.remove = function( bene ) {
			if ( bene ) { bene.$remove();

				for (var i in $scope.benes ) {
					if ($scope.benes [i] === bene ) {
						$scope.benes.splice(i, 1);
					}
				}
			} else {
				$scope.bene.$remove(function() {
					$location.path('benes');
				});
			}
		};

		// Update existing Bene
		$scope.update = function() {
			var bene = $scope.bene ;

			bene.$update(function() {
				$location.path('benes/' + bene._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Benes
		$scope.find = function() {
			$scope.benes = Benes.query();
		};

		// Find existing Bene
		$scope.findOne = function() {
			$scope.bene = Benes.get({ 
				beneId: $stateParams.beneId
			});
		};
	}
]);