'use strict';

angular.module('42StackApp').controller('QuestionsCtrl', function ($scope, $routeParams, Question, data) {

	/*
	Question.load().then(function () {
		Question.getQuestionsByCategory($routeParams.categ).then(function(res) {
			$scope.questions = res;
		}, function (err) {
			console,log(err);
		});

	});
	*/
	console.log(data);
	Question.load().then(function (res) {
		$scope.questions = res;
	});
});
