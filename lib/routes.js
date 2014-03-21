'use strict';

var api = require('./controllers/api'),
	index = require('./controllers');

module.exports = function (app) {

	app.get('/api/questions', api.questionsAll);
	app.get('/api/users', api.usersAll);
	app.get('/api/users/:id', api.usersOne);
	app.get('/api/tags', api.tagsAll);

	app.get('/api/*', function (req, res) {
		res.send(404);
	});

	app.get('/partials/*', index.partials);
	app.get('/*', index.index);
};
