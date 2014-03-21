'use strict';

var mongoose = require('mongoose'),
	Question = mongoose.model('Question'),
	Tag = mongoose.model('Tag'),
	Thing = mongoose.model('Thing');

/**
 * Get awesome things
 */
exports.awesomeThings = function (req, res) {
	return Thing.find(function (err, things) {
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
