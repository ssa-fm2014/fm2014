'use strict';

//Tozs service used to communicate Tozs REST endpoints
angular.module('tozs').factory('Tozs', ['$resource',
	function($resource) {
		return $resource('tozs/:tozId', { tozId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);