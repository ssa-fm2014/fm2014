'use strict';

// Configuring the Articles module
angular.module('benes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Benes', 'benes', 'dropdown', '/benes(/create)?');
		Menus.addSubMenuItem('topbar', 'benes', 'List Benes', 'benes');
		Menus.addSubMenuItem('topbar', 'benes', 'New Bene', 'benes/create');
	}
]);