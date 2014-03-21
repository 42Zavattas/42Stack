'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* User Schema
*/
var UserSchema = new Schema({
	_id       : Number,
	name      : String,
	email     : String,
	upvotes   : Number,
	downvotes : Number
});

mongoose.model('User', UserSchema);
