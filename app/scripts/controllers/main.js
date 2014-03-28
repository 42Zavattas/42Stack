'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($scope, $location, $routeParams, data, Socket) {

	$scope.questions = data.questions;

	Socket.on('send:newQuestion', function (question) {
		question.author = data.users[question.author];
		question.category = data.categories[question.category].name;
		$scope.questions.push(question);
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
