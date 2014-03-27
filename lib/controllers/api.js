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

/*
** Signup
*/
exports.signup = function (req, res) {

	var mail = require('mail').Mail({
		host: 'smtp.gmail.com',
		username: 'me@gmail.com',
		password: 'password'
	});

	if (req.body.login)
	{
		User.findOne({ login : req.body.login }, function (err, user) {
			if (!err) {
				if (!user) {
					res.send(401, 'Bad user');
				}
				else if (user.active == 1) {
					res.send(401, 'Already registered');
				}
				else {
					mail.message({
						from: '42Stack@forpurpose.io',
						to: [user.email],
						subject: 'Welcome to 42Stack'
					})
					.body('Your password is : PASS')
					.send(function(err) {
						if (err) throw err;
						console.log('Mail Sent');
					});
					//pass activate of the user to true
					res.json({ status : 'ok' });
				}
			}
			else {
				res.send(401, 'Bad request');
			}
		});
	}
	else {
		res.send(401, 'Bad request');
	}
};
