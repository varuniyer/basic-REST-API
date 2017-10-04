'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
	name: {
		type: String,
		required: 'Input Content'
	},
	date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'ongoing', 'completed'],
			default: ['pending']
		}]
	}
});

module.exports = mongoose.model('Content', ContentSchema);
