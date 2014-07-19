'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Toz = mongoose.model('Toz'),
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
				message = 'Toz already exists';
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
 * Create a Toz
 */
exports.create = function(req, res) {
	var toz = new Toz(req.body);
	toz.user = req.user;

	toz.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(toz);
		}
	});
};

/**
 * Show the current Toz
 */
exports.read = function(req, res) {
	res.jsonp(req.toz);
};

/**
 * Update a Toz
 */
exports.update = function(req, res) {
	var toz = req.toz ;

	toz = _.extend(toz , req.body);

	toz.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(toz);
		}
	});
};

/**
 * Delete an Toz
 */
exports.delete = function(req, res) {
	var toz = req.toz ;

	toz.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(toz);
		}
	});
};

/**
 * List of Tozs
 */
exports.list = function(req, res) { Toz.find().sort('-created').populate('user', 'displayName').exec(function(err, tozs) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tozs);
		}
	});
};

/**
 * Toz middleware
 */
exports.tozByID = function(req, res, next, id) { Toz.findById(id).populate('user', 'displayName').exec(function(err, toz) {
		if (err) return next(err);
		if (! toz) return next(new Error('Failed to load Toz ' + id));
		req.toz = toz ;
		next();
	});
};

/**
 * Toz authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.toz.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};