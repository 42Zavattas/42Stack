'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Question Schema
*/
var QuestionSchema = new Schema({
	title   : String,
	author  : Number,
	content : String,
	tags    : [Number]
});

mongoose.model('Question', QuestionSchema);
