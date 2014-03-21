'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($q, $http, $scope, $location, Restangular) {

	var questions = Restangular.all('questions');

	questions.getList().then(function (res) {
		$scope.questions = res;
		console.log(res);
	}, function (err) {
		console.log(err);
	});

	$scope.viewQuestion = function (question) {
		$location.path('/questions/' + question.id);
	};

});
