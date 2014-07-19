'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tracelog Schema
 */
var TracelogSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Tracelog name',
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

mongoose.model('Tracelog', TracelogSchema);