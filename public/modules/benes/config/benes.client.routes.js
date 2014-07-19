'use strict';

//Setting up route
angular.module('benes').config(['$stateProvider',
	function($stateProvider) {
		// Benes state routing
		$stateProvider.
		state('listBenes', {
			url: '/benes',
			templateUrl: 'modules/benes/views/list-benes.client.view.html'
		}).
		state('createBene', {
			url: '/benes/create',
			templateUrl: 'modules/benes/views/create-bene.client.view.html'
		}).
		state('viewBene', {
			url: '/benes/:beneId',
			templateUrl: 'modules/benes/views/view-bene.client.view.html'
		}).
		state('editBene', {
			url: '/benes/:beneId/edit',
			templateUrl: 'modules/benes/views/edit-bene.client.view.html'
		});
	}
]);