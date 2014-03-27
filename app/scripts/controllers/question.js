'use strict';

angular.module('42StackApp').controller('QuestionCtrl', function ($http, $scope, question, $location) {

	$scope.question = question;

	$scope.viewTag = function (tag) {
		$location.url('/questions?tags=' + tag);
	};
});
