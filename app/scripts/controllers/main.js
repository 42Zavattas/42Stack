'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($http, $scope, $location, data) {

	$scope.questions = data;

	$scope.viewQuestion = function (question) {
		$location.path('/questions/' + question.id);
	};

});
