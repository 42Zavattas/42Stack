'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($scope, $location, questions) {

	$scope.questions = questions;

	$scope.viewQuestion = function (question) {
		$location.path('/questions/' + question._id);
	};

});
