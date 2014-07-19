'use strict';

//Coffees service used to communicate Coffees REST endpoints
angular.module('coffees').factory('Coffees', ['$resource',
	function($resource) {
		return $resource('coffees/:coffeeId', { coffeeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);