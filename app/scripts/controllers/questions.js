'use strict';

angular.module('42StackApp')
.controller('QuestionsCtrl', function ($scope, questions, $routeParams, $location) {
	$scope.questions = questions;
	console.log($routeParams);

	$scope.viewQuestion = function (question) {
		$location.path('/questions/' + question._id);
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
