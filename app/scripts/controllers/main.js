'use strict';

angular.module('42StackApp').controller('MainCtrl', function ($q, $http, $scope, $location) {

	$scope.data = {
		questions : { $obj: {}, $tab: [] },
		users : { $obj: {}, $tab: [] },
		tags : { $obj: {}, $tab: [] }
	};

	$q.all([
		$http.get('/api/questions'),
		$http.get('/api/tags')
	]).then(function (res) {
		$scope.data.questions.$tab = res[0].data;
		$scope.data.tags.$tab = res[1].data;
	}, function (err) {
		console.log(err);
	});

	$scope.viewQuestion = function (question) {
		$location.path('/questions/' + question.id);
	};

});
