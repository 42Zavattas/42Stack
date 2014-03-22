'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($scope, $location, $routeParams, questions) {

	$scope.questions = questions;

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
