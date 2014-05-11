'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* User Schema
*/
var UserSchema = new Schema({
	login     : String,
	name      : String,
	firstname : String,
	email     : String,
	dn        : String,
	misc      : {
		description : String,
		image       : String
	},
	upvotes   : Number,
	downvotes : Number,
	reputation: Number,
	joined    : Date
});

mongoose.model('User', UserSchema);
