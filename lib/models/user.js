'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* User Schema
*/
var UserSchema = new Schema({
	_id       : Number,
	login     : String,
	password  : String,
	name      : String,
	email     : String,
	misc      : {
		description : String,
		image       : String
	},
	upvotes   : Number,
	downvotes : Number,
	reputation: Number,
	active    : Number
});

mongoose.model('User', UserSchema);
