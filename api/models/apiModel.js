'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema({}, { strict: false });

module.exports = mongoose.model('Content', contentSchema);
