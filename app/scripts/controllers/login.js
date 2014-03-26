'use strict';

angular.module('42StackApp')
.controller('LoginCtrl', function ($scope, $http, $location, Flash, $cookies) {

	$scope.user = { name : '', mdp : '' };

	$scope.login = function() {
		if ($scope.user.name != '' && $scope.user.mdp != '') {
			$http.post('/authentificate', $scope.user)
			.success(function (data, status, headers, config) {
				$cookies.token = data.token;
				Flash.set('Welcome to the awesome');
				$location.url('/');
			})
			.error(function (data, status, headers, config) {
				delete $cookies.token;
				Flash.set('Authentification failed.', 'error');
				$scope.user.mdp = '';
			});
		}
	}
});
