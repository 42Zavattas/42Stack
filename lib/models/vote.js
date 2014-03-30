'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/*
** Vote Schema
*/

var VoteSchema = new Schema({
	sender    : Number,
	receiver  : Number,
	obj       : Schema.Types.ObjectId,
	objtype   : String,
	timestamp : Date,
	type      : Number
});

mongoose.model('Vote', VoteSchema);
