'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($q, $http, $scope, $location, Restangular) {

	var questions = Restangular.all('questions');

	questions.getList().then(function (res) {
		console.log(res);
		$scope.questions = res;
	}, function (err) {
		console.log(err);
	});

	$scope.viewQuestion = function (question) {
		$location.path('/questions/' + question.id);
	};

});
