'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Question Schema
*/
var QuestionSchema = new Schema({
	title     : String,
	author    : Number,
	category  : Number,
	tags      : [Number],
	timestamp : Date,
	upvotes   : Number,
	downvotes : Number,
	content   : String
});

mongoose.model('Question', QuestionSchema);
