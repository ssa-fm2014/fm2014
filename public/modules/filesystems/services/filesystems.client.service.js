'use strict';

//Filesystems service used to communicate Filesystems REST endpoints
angular.module('filesystems').factory('Filesystems', ['$resource',
	function($resource) {
		return $resource('filesystems/:filesystemId', { filesystemId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);