'use strict';

// Tracelogs controller
angular.module('tracelogs').controller('TracelogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tracelogs',
	function($scope, $stateParams, $location, Authentication, Tracelogs ) {
		$scope.authentication = Authentication;

		// Create new Tracelog
		$scope.create = function() {
			// Create new Tracelog object
			var tracelog = new Tracelogs ({
				name: this.name
			});

			// Redirect after save
			tracelog.$save(function(response) {
				$location.path('tracelogs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Tracelog
		$scope.remove = function( tracelog ) {
			if ( tracelog ) { tracelog.$remove();

				for (var i in $scope.tracelogs ) {
					if ($scope.tracelogs [i] === tracelog ) {
						$scope.tracelogs.splice(i, 1);
					}
				}
			} else {
				$scope.tracelog.$remove(function() {
					$location.path('tracelogs');
				});
			}
		};

		// Update existing Tracelog
		$scope.update = function() {
			var tracelog = $scope.tracelog ;

			tracelog.$update(function() {
				$location.path('tracelogs/' + tracelog._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tracelogs
		$scope.find = function() {
			$scope.tracelogs = Tracelogs.query();
		};

		// Find existing Tracelog
		$scope.findOne = function() {
			$scope.tracelog = Tracelogs.get({ 
				tracelogId: $stateParams.tracelogId
			});
		};
	}
]);