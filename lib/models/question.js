'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Question Schema
*/
var QuestionSchema = new Schema({
	title   : String,
	author  : Schema.Types.ObjectId,
	content : String
});

mongoose.model('Question', QuestionSchema);
