'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var filesystems = require('../../app/controllers/filesystems');

	// Filesystems Routes
	app.route('/filesystems')
		.get(filesystems.list)
		.post(users.requiresLogin, filesystems.create);

	app.route('/filesystems/:filesystemId')
		.get(filesystems.read)
		.put(users.requiresLogin, filesystems.hasAuthorization, filesystems.update)
		.delete(users.requiresLogin, filesystems.hasAuthorization, filesystems.delete);

	// Finish by binding the Filesystem middleware
	app.param('filesystemId', filesystems.filesystemByID);
};