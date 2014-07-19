'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Filesystem Schema
 */
var FilesystemSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Filesystem name',
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

mongoose.model('Filesystem', FilesystemSchema);