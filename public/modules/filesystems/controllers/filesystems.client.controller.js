'use strict';

// Filesystems controller
angular.module('filesystems').controller('FilesystemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Filesystems',
	function($scope, $stateParams, $location, Authentication, Filesystems ) {
		$scope.authentication = Authentication;

		// Create new Filesystem
		$scope.create = function() {
			// Create new Filesystem object
			var filesystem = new Filesystems ({
				name: this.name
			});

			// Redirect after save
			filesystem.$save(function(response) {
				$location.path('filesystems/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Filesystem
		$scope.remove = function( filesystem ) {
			if ( filesystem ) { filesystem.$remove();

				for (var i in $scope.filesystems ) {
					if ($scope.filesystems [i] === filesystem ) {
						$scope.filesystems.splice(i, 1);
					}
				}
			} else {
				$scope.filesystem.$remove(function() {
					$location.path('filesystems');
				});
			}
		};

		// Update existing Filesystem
		$scope.update = function() {
			var filesystem = $scope.filesystem ;

			filesystem.$update(function() {
				$location.path('filesystems/' + filesystem._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Filesystems
		$scope.find = function() {
			$scope.filesystems = Filesystems.query();
		};

		// Find existing Filesystem
		$scope.findOne = function() {
			$scope.filesystem = Filesystems.get({ 
				filesystemId: $stateParams.filesystemId
			});
		};
	}
]);