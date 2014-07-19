'use strict';

// Configuring the Articles module
angular.module('tozs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tozs', 'tozs', 'dropdown', '/tozs(/create)?');
		Menus.addSubMenuItem('topbar', 'tozs', 'List Tozs', 'tozs');
		Menus.addSubMenuItem('topbar', 'tozs', 'New Toz', 'tozs/create');
	}
]);