'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Answer Schema
*/
var AnswerSchema = new Schema({
	question  : Schema.Types.ObjectId,
	msg       : String,
	author    : Number,
	upvotes   : Number,
	downvotes : Number,
	timestamp : Date
});

mongoose.model('Answer', AnswerSchema);
