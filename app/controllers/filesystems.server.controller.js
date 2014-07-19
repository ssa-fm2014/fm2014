'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Filesystem = mongoose.model('Filesystem'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Filesystem already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Filesystem
 */
exports.create = function(req, res) {
	var filesystem = new Filesystem(req.body);
	filesystem.user = req.user;

	filesystem.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(filesystem);
		}
	});
};

/**
 * Show the current Filesystem
 */
exports.read = function(req, res) {
	res.jsonp(req.filesystem);
};

/**
 * Update a Filesystem
 */
exports.update = function(req, res) {
	var filesystem = req.filesystem ;

	filesystem = _.extend(filesystem , req.body);

	filesystem.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(filesystem);
		}
	});
};

/**
 * Delete an Filesystem
 */
exports.delete = function(req, res) {
	var filesystem = req.filesystem ;

	filesystem.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(filesystem);
		}
	});
};

/**
 * List of Filesystems
 */
exports.list = function(req, res) { Filesystem.find().sort('-created').populate('user', 'displayName').exec(function(err, filesystems) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(filesystems);
		}
	});
};

/**
 * Filesystem middleware
 */
exports.filesystemByID = function(req, res, next, id) { Filesystem.findById(id).populate('user', 'displayName').exec(function(err, filesystem) {
		if (err) return next(err);
		if (! filesystem) return next(new Error('Failed to load Filesystem ' + id));
		req.filesystem = filesystem ;
		next();
	});
};

/**
 * Filesystem authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.filesystem.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};