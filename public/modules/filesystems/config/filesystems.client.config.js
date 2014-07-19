'use strict';

// Configuring the Articles module
angular.module('filesystems').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Filesystems', 'filesystems', 'dropdown', '/filesystems(/create)?');
		Menus.addSubMenuItem('topbar', 'filesystems', 'List Filesystems', 'filesystems');
		Menus.addSubMenuItem('topbar', 'filesystems', 'New Filesystem', 'filesystems/create');
	}
]);