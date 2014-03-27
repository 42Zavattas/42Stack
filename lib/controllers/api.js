'use strict';

var mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
Question = mongoose.model('Question'),
User = mongoose.model('User'),
Category = mongoose.model('Category'),
Tag = mongoose.model('Tag');

/**
* Get one user
*/
exports.usersOne = function (req, res) {
	return User.findOne({ _id : req.params.id }, function (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	});
};

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
* Get one question
*/
exports.questionsOne = function (req, res) {
	return Question.findOne({ _id : req.params.id }, function (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	});
};

/**
* Get all categories
*/
exports.categoriesAll = function (req, res) {
	return Category.find(function (err, things) {
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

/**
* Authentication
*/
exports.authenticate = function (req, res) {
	var secret = 'Are you a zavatta ?';
	console.log(req.body);
	User.findOne({ login : req.body.login }, function (err, user) {
		if (!err) {
			if (!user) {
				res.send(401, 'Unknown login');
			} else if (req.body.password != user.password) {
				res.send(401, 'Wrong password');
			} else {
				var token = jwt.sign(user, secret, { expiresInMinutes: 60*5 });
				res.json({ user : user, token: token });
			}
		} else {
			res.send(401, 'Auth failed');
		}
	});
};

/**
* Add question
*/
exports.postQuestion = function (req, res) {
	console.log(req.body);
	Question.create({
		title     : req.body.title,
		upvotes   : 0,
		downvotes : 0,
		content   : req.body.content,
		tags      : req.body.tags,
		author    : 3,
		category  : 1
	}, function (err) {
		if (err) {
			res.send(500, err.message);
		} else {
			res.send(200);
		}
	});
};

/*
** Signup
*/
exports.signup = function (req, res) {
	console.log(req.body);
};
