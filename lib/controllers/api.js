'use strict';

var mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
pagedown = require("pagedown"),
safeConverter = pagedown.getSanitizingConverter(),
Question = mongoose.model('Question'),
User = mongoose.model('User'),
Answer = mongoose.model('Answer'),
Tag = mongoose.model('Tag'),
Vote = mongoose.model('Vote'),
bcrypt = require('bcrypt');

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
	return User.find({ active : 1 }, function (err, things) {
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
	function callback (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	}
	if (req.query.limit) {
		return Question.find().limit(req.query.limit).exec(callback);
	}
	else if (req.query.ofUser) {
		return Question.find({ author : req.query.ofUser }).exec(callback);
	}
	return Question.find(callback);
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

/*
** Votes purpose
*/
exports.votesAll = function (req, res) {
	function callback (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	}
	if (req.query.onQuestion) {
		return Vote.find({ obj : req.query.onQuestion }).exec(callback);
	}
	else if (req.query.fromUser) {
		return Vote.find({ sender : req.query.fromUser }).exec(callback);
	}
	else if (req.query.toUser) {
		return Vote.find({ receiver : req.query.toUser }).exec(callback);
	}
	else if (req.query.range && req.query.user) {
		var today = new Date();
		var twoWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
		return Vote.find({ receiver : req.query.user, timestamp : {$gte : twoWeeks} }).exec(callback);
	}
	return Vote.find(callback);
};

exports.voteAction = function (req, res) {

	var vote = new Vote({
		sender    : req.user._id,
		receiver  : -1,
		obj       : mongoose.Types.ObjectId(req.body.object),
		objtype   : 'undefined',
		timestamp : new Date(),
		type      : req.body.type
	});

	var simpleUpdate = function (idUser, reputChange) {
		User.findOne({ _id : idUser }, function (err, user) {
			if (!err) {
				user.reputation += reputChange;
				user.save(function(err, res) {
					if (!err) {

					}
				});
			}
		});
	};

	var updateUsersReput = function (idReceiver, idSender, objType, value, changed) {
		var rep;
		if (changed) {
			if (value === -1) {
				rep = (objType === 'answer') ? -10 : -5;
				rep -= 2;
			}
			else {
				rep = (objType === 'answer') ? 10 : 5;
				rep += 2;
			}
			simpleUpdate(idReceiver, rep);
		}
		else {
			rep = value * 2;
			if (rep !== -2) {
				rep = (objType === 'answer') ? 10 : 5;
			}
			simpleUpdate(idReceiver, rep);
		}

		if (value === -1) {
			simpleUpdate(idSender, -1);
		}
		else if (changed) {
			simpleUpdate(idSender, 1);
		}
	};

	var savingvote = function (vote, object) {
		Vote.findOne({ sender : vote.sender, obj : vote.obj }, function (err, result) {
			if (!err) {
				if (!result) {
					vote.save(function (err, vote) {
						if (err) {
							res.send(500, err.message);
						}
						else {
							if (req.body.type === 1)
								object.upvotes += 1;
							else
								object.downvotes += 1;
							object.save(function(err, object) {
								if (!err) {
								updateUsersReput(vote.receiver, vote.sender, vote.objtype, vote.type, 0);
									res.send(200, { msg : 'Voted !', sender : vote.sender, receiver : vote.receiver, obj : vote.obj });
								}
								else {
									res.send(500, err.message);
								}
							});
						}
					});
				}
				else {
					if (req.body.type === result.type) {
						res.send(500, 'Already voted');
					}
					else {
						result.type = req.body.type;
						result.save(function (err, result) {
							if (err) {
								res.send(500, err.message);
							}
							else {
								if (req.body.type === 1) {
									object.downvotes -= 1;
									object.upvotes += 1;
								}
								else {
									object.downvotes += 1;
									object.upvotes -= 1;
								}
								object.save(function(err, object) {
									if (!err) {
										updateUsersReput(vote.receiver, vote.sender, vote.objtype, vote.type, 1);
										res.send(200, { msg : 'You change your vote', sender : vote.sender, receiver : vote.receiver, obj : vote.obj });
									}
									else {
										res.send(500, err.message);
									}
								});
							}
						});
					}
				}
			}
			else {
				res.send(500, err.message);
			}
		});
	};

	if (req.body.type !== 1 && req.body.type !== -1) {
		res.send(500, 'Oh snap, a hacker ! Your login has been recorded');
	}

	Question.findOne({ _id : vote.obj }, function (err, question) {
		if (!err) {
			if (!question) {
				Answer.findOne({ _id : vote.obj }, function (err, answer) {
					if (!err) {
						if (!answer) {
							res.send(500, 'Something bad happend, your login has been recorded');
						}
						else {
							if (vote.sender === answer.author) {
								res.send(500, 'Sorry, you can vote for your own post');
							}
							else {
								vote.receiver = answer.author;
								vote.objtype = 'answer';
								savingvote(vote, answer);
							}
						}
					}
					else {
						res.send(500, err.message);
					}
				});
			}
			else {
				if (vote.sender === question.author) {
					res.send(500, 'Sorry, you can vote for your own post');
				}
				else {
					vote.receiver = question.author;
					vote.objtype = 'question';
					savingvote(vote, question);
				}
			}
		}
		else {
			res.send(500, err.message);
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
			}
			else if (!user.active) {
				res.send(401, 'This account has not been activated yet.');
			}
			else {
				bcrypt.compare(req.body.password, user.password, function(err, result) {
					if (result === true) {
						var token = jwt.sign(user, secret, { expiresInMinutes: 60*5 });
						res.json({ user : user, token: token });
					}
					else {
						res.send(401, 'Wrong password');
					}
				});
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
	var question = new Question({
		title     : req.body.title,
		upvotes   : 0,
		downvotes : 0,
		content   : safeConverter.makeHtml(req.body.content),
		tags      : req.body.tags,
		author    : req.user._id,
		timestamp : new Date()
	});
	question.save(function (err, question) {
		if (err) {
			res.send(500, err.message);
		} else {
			res.send(200, question);
		}
	});
};

/**
* Get answers
*/
exports.getAnswers = function (req, res) {
	function callback (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	}
	if (req.query.question) {
		return Answer.find({ question : mongoose.Types.ObjectId(req.query.question) }, callback).limit(req.query.limit);
	}
	else if (req.query.ofUser) {
		return Answer.find({ author : req.query.ofUser }).exec(callback);
	}
	return Answer.find(callback);
};

/*
** One answer
*/
exports.answersOne = function (req, res) {
	return Answer.findOne({ _id : req.params.id }, function (err, things) {
		if (!err) {
			return res.json(things);
		}
		else {
			return res.send(err);
		}
	});
};

/**
* Add answer
*/
exports.postAnswer = function (req, res) {
	var answer = new Answer({
		question  : mongoose.Types.ObjectId(req.body.question),
		msg       : safeConverter.makeHtml(req.body.msg),
		author    : req.user._id,
		upvotes   : 0,
		downvotes : 0,
		timestamp : new Date()
	});
	answer.save(function (err, answer) {
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
				else if (user.active === 1) {
					res.send(401, 'Already registered');
				}
				else {
					/*mail.message({
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
						*/
						user.active = 1;
						user.upvotes = 0;
						user.downvotes = 0;
						user.save(function (err, user) {
							if (err) {
								console.log(err);
								res.send(500);
							} else {
								res.json({ status : 'ok' });
							}
						});
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
