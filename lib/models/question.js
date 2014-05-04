'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Question Schema
*/
var QuestionSchema = new Schema({
	title     : String,
	author    : Number,
	tags      : [String],
	timestamp : Date,
	upvotes   : Number,
	downvotes : Number,
	resolved  : Schema.Types.ObjectId,
	content   : String,
	markdown  : String
});

mongoose.model('Question', QuestionSchema);
