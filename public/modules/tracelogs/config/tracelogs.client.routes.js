'use strict';

//Setting up route
angular.module('tracelogs').config(['$stateProvider',
	function($stateProvider) {
		// Tracelogs state routing
		$stateProvider.
		state('listTracelogs', {
			url: '/tracelogs',
			templateUrl: 'modules/tracelogs/views/list-tracelogs.client.view.html'
		}).
		state('createTracelog', {
			url: '/tracelogs/create',
			templateUrl: 'modules/tracelogs/views/create-tracelog.client.view.html'
		}).
		state('viewTracelog', {
			url: '/tracelogs/:tracelogId',
			templateUrl: 'modules/tracelogs/views/view-tracelog.client.view.html'
		}).
		state('editTracelog', {
			url: '/tracelogs/:tracelogId/edit',
			templateUrl: 'modules/tracelogs/views/edit-tracelog.client.view.html'
		});
	}
]);