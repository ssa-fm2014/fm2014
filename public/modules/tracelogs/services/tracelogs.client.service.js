'use strict';

//Tracelogs service used to communicate Tracelogs REST endpoints
angular.module('tracelogs').factory('Tracelogs', ['$resource',
	function($resource) {
		return $resource('tracelogs/:tracelogId', { tracelogId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);