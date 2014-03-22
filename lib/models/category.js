'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Category Schema
*/
var CategorySchema = new Schema({
	_id       : Number,
	name      : String
});

mongoose.model('Category', CategorySchema);
