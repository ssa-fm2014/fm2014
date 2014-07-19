'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var benes = require('../../app/controllers/benes');

	// Benes Routes
	app.route('/benes')
		.get(benes.list)
		.post(users.requiresLogin, benes.create);

	app.route('/benes/:beneId')
		.get(benes.read)
		.put(users.requiresLogin, benes.hasAuthorization, benes.update)
		.delete(users.requiresLogin, benes.hasAuthorization, benes.delete);

	// Finish by binding the Bene middleware
	app.param('beneId', benes.beneByID);
};