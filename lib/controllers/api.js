'use strict';

var mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
pagedown = require("pagedown"),
safeConverter = new pagedown.Converter(),
//safeConverter = pagedown.getSanitizingConverter(), <- cette merde sanitize les liens
Question = mongoose.model('Question'),
User = mongoose.model('User'),
Category = mongoose.model('Category'),
Answer = mongoose.model('Answer'),
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
	console.log(req.query);
	if (req.query.limit) {
		return Question.find(callback).limit(req.query.limit);
	}
	return Question.find(callback);
	function callback (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	}
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
	User.findOne({ login : req.body.login }, function (err, user) {
		if (!err) {
			if (!user) {
				res.send(404, 'Unknown login <strong>'+req.body.login+'</strong>');
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
	Question.create({
		title     : req.body.title,
		upvotes   : 0,
		downvotes : 0,
		content   : safeConverter.makeHtml(req.body.content),
		tags      : req.body.tags,
		author    : req.user._id,
		category  : 1,
		timestamp : new Date()
	}, function (err) {
		if (err) {
			res.send(500, err.message);
		} else {
			res.send(200);
		}
	});
};

/**
* Get answers
*/
exports.getAnswers = function (req, res) {
	console.log(req.query);
	if (req.query.question) {
		return Answer.find({ question : mongoose.Types.ObjectId(req.query.question) }, callback).limit(req.query.limit);
	}
	return Answer.find(callback);
	function callback (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	}
};

/**
* Add answer
*/
exports.postAnswer = function (req, res) {
	var answer = new Answer({
		question  : mongoose.Types.ObjectId(req.body.question),
		msg       : req.body.msg,
		author    : req.user._id,
		timestamp : new Date()
	});
	answer.save(function (err, answer) {
		console.log(answer);
		if (err) {
			res.send(500, err.message);
		} else {
			res.send(200, answer);
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
						//to: [user.email],    <-- seriously ?
						to: 'test@test.test',
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
