'use strict';

//Setting up route
angular.module('filesystems').config(['$stateProvider',
	function($stateProvider) {
		// Filesystems state routing
		$stateProvider.
		state('listFilesystems', {
			url: '/filesystems',
			templateUrl: 'modules/filesystems/views/list-filesystems.client.view.html'
		}).
		state('createFilesystem', {
			url: '/filesystems/create',
			templateUrl: 'modules/filesystems/views/create-filesystem.client.view.html'
		}).
		state('viewFilesystem', {
			url: '/filesystems/:filesystemId',
			templateUrl: 'modules/filesystems/views/view-filesystem.client.view.html'
		}).
		state('editFilesystem', {
			url: '/filesystems/:filesystemId/edit',
			templateUrl: 'modules/filesystems/views/edit-filesystem.client.view.html'
		});
	}
]);