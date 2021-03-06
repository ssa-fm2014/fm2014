'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Coffee Schema
 */
var CoffeeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Coffee name',
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

mongoose.model('Coffee', CoffeeSchema);