'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($q, $http, $scope, $location) {

	$scope.questions = { $obj: {}, $tab: [] };
	$scope.tags = { $obj: {}, $tab: [] };

	$q.all([
		$http.get('/api/questions'),
		$http.get('/api/tags')
	]).then(function (res) {
		$scope.questions.$tab = res[0].data;
		$scope.tags.$tab = res[1].data;
	}, function (err) {
		console.log(err);
	});

	$scope.viewQuestion = function (question) {
		$location.path('/questions/' + question.id);
	};

});
