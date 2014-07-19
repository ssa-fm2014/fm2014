'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var tracelogs = require('../../app/controllers/tracelogs');

	// Tracelogs Routes
	app.route('/tracelogs')
		.get(tracelogs.list)
		.post(users.requiresLogin, tracelogs.create);

	app.route('/tracelogs/:tracelogId')
		.get(tracelogs.read)
		.put(users.requiresLogin, tracelogs.hasAuthorization, tracelogs.update)
		.delete(users.requiresLogin, tracelogs.hasAuthorization, tracelogs.delete);

	// Finish by binding the Tracelog middleware
	app.param('tracelogId', tracelogs.tracelogByID);
};