'use strict';

angular.module('42StackApp')
.controller('QuestionCtrl', function ($scope, $routeParams, Question, data) {

	$scope.content = 'Ecrivez la réponse a cette question ici.\n';

	console.log(data);

	Question.load().then(function () {
		Question.getQuestion($routeParams.id).then(function (res) {
			$scope.question = res;
		}, function (err) {
			console.log(err);
		});
	});
});
