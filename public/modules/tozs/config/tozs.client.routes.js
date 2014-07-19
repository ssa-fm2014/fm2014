'use strict';

//Setting up route
angular.module('tozs').config(['$stateProvider',
	function($stateProvider) {
		// Tozs state routing
		$stateProvider.
		state('listTozs', {
			url: '/tozs',
			templateUrl: 'modules/tozs/views/list-tozs.client.view.html'
		}).
		state('createToz', {
			url: '/tozs/create',
			templateUrl: 'modules/tozs/views/create-toz.client.view.html'
		}).
		state('viewToz', {
			url: '/tozs/:tozId',
			templateUrl: 'modules/tozs/views/view-toz.client.view.html'
		}).
		state('editToz', {
			url: '/tozs/:tozId/edit',
			templateUrl: 'modules/tozs/views/edit-toz.client.view.html'
		});
	}
]);