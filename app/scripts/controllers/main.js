'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($scope, $location, $routeParams, data, Socket, Flash) {

	$scope.questions = data.questions;

	Socket.on('send:newQuestion', function (question) {
		question.author = data.users[question.author];
		question.category = data.categories[question.category].name;
		$scope.questions.push(question);
		Flash.set('A <strong><a href="/questions/'+question._id+'">new question</a></strong> has been posted !');
	});

	$scope.viewQuestion = function (question) {
		$location.path('/questions/' + question._id);
	};

	$scope.viewCateg = function ($event, category) {
		$event.stopPropagation();
		$location.url('/questions?categ=' + category);
	};

	$scope.viewTag = function ($event, tag) {
		$event.stopPropagation();
		$location.url('/questions?tags=' + tag);
	};

	$scope.viewUser = function ($event, user) {
		$event.stopPropagation();
		$location.url('/users/' + user._id);
	};

});
