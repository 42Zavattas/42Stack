'use strict';

var mongoose = require('mongoose'),
	Question = mongoose.model('Question'),
	User = mongoose.model('User'),
	Tag = mongoose.model('Tag');

/**
 * Get all users
 */
exports.usersAll = function (req, res) {
	return User.find(function (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	});
};

/**
 * Get all questions
 */
exports.questionsAll = function (req, res) {
	return Question.find(function (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	});
};

/**
 * Get all tags
 */
exports.tagsAll = function (req, res) {
	return Tag.find(function (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	});
};
