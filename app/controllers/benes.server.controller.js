'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Bene = mongoose.model('Bene'),
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
				message = 'Bene already exists';
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
 * Create a Bene
 */
exports.create = function(req, res) {
	var bene = new Bene(req.body);
	bene.user = req.user;

	bene.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bene);
		}
	});
};

/**
 * Show the current Bene
 */
exports.read = function(req, res) {
	res.jsonp(req.bene);
};

/**
 * Update a Bene
 */
exports.update = function(req, res) {
	var bene = req.bene ;

	bene = _.extend(bene , req.body);

	bene.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bene);
		}
	});
};

/**
 * Delete an Bene
 */
exports.delete = function(req, res) {
	var bene = req.bene ;

	bene.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(bene);
		}
	});
};

/**
 * List of Benes
 */
exports.list = function(req, res) { Bene.find().sort('-created').populate('user', 'displayName').exec(function(err, benes) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(benes);
		}
	});
};

/**
 * Bene middleware
 */
exports.beneByID = function(req, res, next, id) { Bene.findById(id).populate('user', 'displayName').exec(function(err, bene) {
		if (err) return next(err);
		if (! bene) return next(new Error('Failed to load Bene ' + id));
		req.bene = bene ;
		next();
	});
};

/**
 * Bene authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bene.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};