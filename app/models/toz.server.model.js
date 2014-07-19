'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Toz Schema
 */
var TozSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Toz name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Toz', TozSchema);