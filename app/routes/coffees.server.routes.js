'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var coffees = require('../../app/controllers/coffees');

	// Coffees Routes
	app.route('/coffees')
		.get(coffees.list)
		.post(users.requiresLogin, coffees.create);

	app.route('/coffees/:coffeeId')
		.get(coffees.read)
		.put(users.requiresLogin, coffees.hasAuthorization, coffees.update)
		.delete(users.requiresLogin, coffees.hasAuthorization, coffees.delete);

	// Finish by binding the Coffee middleware
	app.param('coffeeId', coffees.coffeeByID);
};