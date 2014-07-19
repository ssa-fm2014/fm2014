'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bene Schema
 */
var BeneSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Bene name',
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

mongoose.model('Bene', BeneSchema);