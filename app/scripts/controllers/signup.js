'use strict';

angular.module('42StackApp')
.controller('SignupCtrl', function ($scope, $http, $location, Flash) {

	$scope.login = null;

	$scope.send = function () {
		if ($scope.login) {
			$http.post('/signup', { login : $scope.login }).then(function (res) {
				Flash.set('Welcome to 42Stack <strong>' + $scope.login + '</strong> !', 'success');
				$location.url('/login');
			}, function (err) {
				Flash.set(err.data, 'error');
				$scope.login = null;
			});
		}
	}
});
