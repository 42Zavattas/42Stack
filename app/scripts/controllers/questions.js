'use strict';

angular.module('42StackApp')
.controller('QuestionsCtrl', function ($scope, data, $routeParams, $location, Socket) {

	$scope.questions = data.questions;

	Socket.on('send:newQuestion', function (question) {
		console.log('jsut received that: ', question);
		question.author = data.users[question.author];
//		question.category = data.categories[question.category].name;
		$scope.questions.push(question);
	});

	$scope.viewQuestion = function (question) {
		$location.url('/questions/' + question._id);
	};

	$scope.viewCateg = function ($event, category) {
		$event.stopPropagation();
		$location.url('/questions?categ=' + category);
	}

	$scope.viewTag = function ($event, tag) {
		$event.stopPropagation();
		$location.url('/questions?tags=' + tag);
	}
});
