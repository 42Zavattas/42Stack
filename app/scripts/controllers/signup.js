'use strict';

angular.module('42StackApp')
.controller('SignupCtrl', function ($scope, $http, $location, Flash) {

	$scope.login = '';

	$scope.send = function () {
		if ($scope.login) {
			console.log("pute");

			$http.post('/signup', $scope.login)
			.success(function (data, status, headers, config) {
				Flash.set('Welcome to 42Stack <strong>' + $scope.login + '</strong> !', 'success');
				console.log("oooo");
				$location.url('/login');
			})
			.error(function (data, status, headers, config) {
				$scope.login = '';
				Flash.set('Error processing your login', 'error');
			});
		}
	}
});
