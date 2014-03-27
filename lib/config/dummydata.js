'use strict';

var mongoose = require('mongoose'),
Question = mongoose.model('Question'),
Tag = mongoose.model('Tag'),
User = mongoose.model('User'),
Category = mongoose.model('Category'),
Thing = mongoose.model('Thing');

Question.find({}).remove(function () {
	Question.create({
		title     : 'choix d\'editeur',
		upvotes   : 1,
		downvotes : 160,
		content   : 'vim est il reellement mieux, ou est ce sublime text ?',
		tags      : ['editeur'],
		author    : 3,
		category  : 1
	}, function () {
		console.log('finished populating things');
	}
	);
});

Tag.find({}).remove(function () {
	Tag.create(
		{ _id : 0, name : 'C',             description : 'General-purpose computer programming language.' },
		{ _id : 1, name : 'Configuration', description : 'Tips and HOWTOs for a perfect config' },
		{ _id : 2, name : 'JavaScript',    description : 'Dynamic, object-oriented and prototype-based language.' },
		{ _id : 3, name : 'jQuery',        description : 'A cross-browser JavaScript library.' },
		{ _id : 4, name : 'HTML',          description : 'Markup language for creating web pages.' },
		{ _id : 5, name : 'CSS',           description : 'Control the visual presentation of documents written in a markup language.' }
		, function () {
			console.log('finished populating things');
		}
	);
});

Category.find({}).remove(function () {
	Category.create(
		{ _id : 0, name : 'UNIX' },
		{ _id : 1, name : 'ALGO' }
		, function () {
			console.log('finished populating things');
		}
	);
});
