'use strict';

angular.module('42StackApp')
.controller('SignupCtrl', function ($scope, $http, $location, Flash, Socket) {

	$scope.login = null;

	$scope.send = function () {
		if ($scope.login) {
			$http.post('/signup', { login : $scope.login }).then(function (user) {
				Flash.set('Welcome to 42Stack <strong>' + $scope.login + '</strong> ! Your password has been sent to your mail adress.', 'success');
				Socket.emit('newUser', user);
				$location.url('/login');
			}, function (err) {
				Flash.set(err.data, 'error');
				$scope.login = null;
			});
		}
	};
});
