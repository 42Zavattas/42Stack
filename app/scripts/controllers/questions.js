'use strict';

angular.module('42StackApp')
.controller('QuestionsCtrl', function ($scope, questions, $routeParams) {
	$scope.questions = questions;
	console.log($routeParams);
});
