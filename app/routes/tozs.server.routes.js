'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var tozs = require('../../app/controllers/tozs');

	// Tozs Routes
	app.route('/tozs')
		.get(tozs.list)
		.post(users.requiresLogin, tozs.create);

	app.route('/tozs/:tozId')
		.get(tozs.read)
		.put(users.requiresLogin, tozs.hasAuthorization, tozs.update)
		.delete(users.requiresLogin, tozs.hasAuthorization, tozs.delete);

	// Finish by binding the Toz middleware
	app.param('tozId', tozs.tozByID);
};