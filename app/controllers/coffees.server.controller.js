'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Coffee = mongoose.model('Coffee'),
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
				message = 'Coffee already exists';
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
 * Create a Coffee
 */
exports.create = function(req, res) {
	var coffee = new Coffee(req.body);
	coffee.user = req.user;

	coffee.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(coffee);
		}
	});
};

/**
 * Show the current Coffee
 */
exports.read = function(req, res) {
	res.jsonp(req.coffee);
};

/**
 * Update a Coffee
 */
exports.update = function(req, res) {
	var coffee = req.coffee ;

	coffee = _.extend(coffee , req.body);

	coffee.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(coffee);
		}
	});
};

/**
 * Delete an Coffee
 */
exports.delete = function(req, res) {
	var coffee = req.coffee ;

	coffee.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(coffee);
		}
	});
};

/**
 * List of Coffees
 */
exports.list = function(req, res) { Coffee.find().sort('-created').populate('user', 'displayName').exec(function(err, coffees) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(coffees);
		}
	});
};

/**
 * Coffee middleware
 */
exports.coffeeByID = function(req, res, next, id) { Coffee.findById(id).populate('user', 'displayName').exec(function(err, coffee) {
		if (err) return next(err);
		if (! coffee) return next(new Error('Failed to load Coffee ' + id));
		req.coffee = coffee ;
		next();
	});
};

/**
 * Coffee authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.coffee.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};