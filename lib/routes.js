'use strict';

var api = require('./controllers/api'),
	index = require('./controllers');

module.exports = function (app) {

	app.get('/api/questions', api.questionsAll);
	app.get('/api/questions/:id', api.questionsOne);
	app.get('/api/users', api.usersAll);
	app.get('/api/users/:id', api.usersOne);
	app.get('/api/tags', api.tagsAll);
	app.get('/api/categories', api.categoriesAll);

	app.post('/authentificate', api.authenticate);
	app.post('/signup', api.signup);
	app.post('/api/questions', api.postQuestion);

	/*app.get('/api/questions', function (req, res) {
		res.send([{ _id : 4, title   : 'choix d\'editeur', upvotes : 1, downvotes : 160, content : 'vim est il reellement mieux, ou est ce sublime text ?', tags : [0, 4], author : 3, category : 1 }]);
		});

		app.get('/api/questions/:id', function (req, res) {
		res.send({ _id : 4, title   : 'choix d\'editeur', upvotes : 1, downvotes : 160, content : 'vim est il reellement mieux, ou est ce sublime text ?', tags : [0, 4], author : 3, category : 1 });
		});

		app.get('/api/users', function (req, res) {
		res.send([{ _id : 1, name : 'aperçu', email : 'bgronon@zavatta.fr' },
		{ _id : 2, name : 'dawuut', email : 'dawuut@zavatta.fr' },
		{ _id : 3, name : 'gongon', email : 'admin@shitter.fr' }]);
		});

		app.get('/api/users/:id', function (req, res) {
		res.send({ _id : 1, name : 'aperçu', email : 'bgronon@zavatta.fr' });
		});

		app.get('/api/tags', function (req, res) {
		res.send([{ _id : 0, name : 'C',             description : 'General-purpose computer programming language.' },
		{ _id : 1, name : 'Configuration', description : 'Tips and HOWTOs for a perfect config' },
		{ _id : 2, name : 'JavaScript',    description : 'Dynamic, object-oriented and prototype-based language.' },
		{ _id : 3, name : 'jQuery',        description : 'A cross-browser JavaScript library.' },
		{ _id : 4, name : 'HTML',          description : 'Markup language for creating web pages.' },
		{ _id : 5, name : 'CSS',           description : 'Control the visual presentation of documents written in a markup language.' }]);
		});

		app.get('/api/categories', function (req, res) {
		res.send([{ _id : 0, name : 'UNIX' },
		{ _id : 1, name : 'ALGO' }]);
		});*/

	app.get('/api/*', function (req, res) {
		res.send(404);
	});

	app.get('/partials/*', index.partials);
	app.get('/*', index.index);
};
