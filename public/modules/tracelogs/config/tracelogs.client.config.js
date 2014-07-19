'use strict';

// Configuring the Articles module
angular.module('tracelogs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('Trace', 'Tracelogs', 'tracelogs', 'dropdown', '/tracelogs(/create)?');
		Menus.addSubMenuItem('Trace', 'tracelogs', 'List Tracelogs', 'tracelogs');
		Menus.addSubMenuItem('Trace', 'tracelogs', 'New Tracelog', 'tracelogs/create');
	}
]);