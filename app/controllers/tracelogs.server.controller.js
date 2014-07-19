'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Tracelog = mongoose.model('Tracelog'),
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
				message = 'Tracelog already exists';
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
 * Create a Tracelog
 */
exports.create = function(req, res) {
	var tracelog = new Tracelog(req.body);
	tracelog.user = req.user;

	tracelog.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tracelog);
		}
	});
};

/**
 * Show the current Tracelog
 */
exports.read = function(req, res) {
	res.jsonp(req.tracelog);
};

/**
 * Update a Tracelog
 */
exports.update = function(req, res) {
	var tracelog = req.tracelog ;

	tracelog = _.extend(tracelog , req.body);

	tracelog.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tracelog);
		}
	});
};

/**
 * Delete an Tracelog
 */
exports.delete = function(req, res) {
	var tracelog = req.tracelog ;

	tracelog.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tracelog);
		}
	});
};

/**
 * List of Tracelogs
 */
exports.list = function(req, res) { Tracelog.find().sort('-created').populate('user', 'displayName').exec(function(err, tracelogs) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tracelogs);
		}
	});
};

/**
 * Tracelog middleware
 */
exports.tracelogByID = function(req, res, next, id) { Tracelog.findById(id).populate('user', 'displayName').exec(function(err, tracelog) {
		if (err) return next(err);
		if (! tracelog) return next(new Error('Failed to load Tracelog ' + id));
		req.tracelog = tracelog ;
		next();
	});
};

/**
 * Tracelog authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.tracelog.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};