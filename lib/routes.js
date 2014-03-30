'use strict';

var api = require('./controllers/api'),
	index = require('./controllers');

module.exports = function (app) {

	app.get('/api/users', api.usersAll);
	app.get('/api/users/:id', api.usersOne);

	app.get('/api/questions', api.questionsAll);
	app.post('/api/questions', api.postQuestion);
	app.get('/api/questions/:id', api.questionsOne);

	app.post('/api/answers', api.postAnswer);
	app.get('/api/answers', api.getAnswers);

	app.post('/authenticate', api.authenticate);
	app.post('/signup', api.signup);

	app.get('/api/votes', api.votesAll);
	app.get('/api/votes/:objectid', api.votesOnQuestion);
	app.post('/api/votes', api.voteAction);

	app.get('/api/*', function (req, res) {
		res.send(404);
	});

	app.get('/partials/*', index.partials);
	app.get('/*', index.index);
};
