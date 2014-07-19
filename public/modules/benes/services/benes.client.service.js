'use strict';

//Benes service used to communicate Benes REST endpoints
angular.module('benes').factory('Benes', ['$resource',
	function($resource) {
		return $resource('benes/:beneId', { beneId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);