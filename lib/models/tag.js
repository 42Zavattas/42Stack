'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Tag Schema
*/
var TagSchema = new Schema({
	_id         : Number,
	name        : String,
	description : String
});

mongoose.model('Tag', TagSchema);
