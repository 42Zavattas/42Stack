'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Answer Schema
*/
var AnswerSchema = new Schema({
	question   : Schema.Types.ObjectId,
	qtitle     : String,
	msg        : String,
	markdown   : String,
	author     : Number,
	upvotes    : Number,
	downvotes  : Number,
	accepted   : Boolean,
	dateaccept : Date,
	timestamp  : Date
});

mongoose.model('Answer', AnswerSchema);
