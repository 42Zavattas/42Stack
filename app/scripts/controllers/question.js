'use strict';

angular.module('42StackApp')
.controller('QuestionCtrl', function ($scope, question) {
	$scope.question = question;
});
