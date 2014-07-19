'use strict';

//Setting up route
angular.module('coffees').config(['$stateProvider',
	function($stateProvider) {
		// Coffees state routing
		$stateProvider.
		state('listCoffees', {
			url: '/coffees',
			templateUrl: 'modules/coffees/views/list-coffees.client.view.html'
		}).
		state('createCoffee', {
			url: '/coffees/create',
			templateUrl: 'modules/coffees/views/create-coffee.client.view.html'
		}).
		state('viewCoffee', {
			url: '/coffees/:coffeeId',
			templateUrl: 'modules/coffees/views/view-coffee.client.view.html'
		}).
		state('editCoffee', {
			url: '/coffees/:coffeeId/edit',
			templateUrl: 'modules/coffees/views/edit-coffee.client.view.html'
		});
	}
]);