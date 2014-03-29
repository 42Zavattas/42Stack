'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/*
** Vote Schema
*/

var VoteSchema = new Schema({
	_id       : Number,
	sender    : Number,
	receiver  : Number,
	obj       : Number,
	objtype   : String,
	timestamp : Date,
	type      : Number
});

mongoose.model('Vote', VoteSchema);
