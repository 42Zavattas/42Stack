'use strict';

angular.module('42StackApp')
.controller('LoginCtrl', function ($scope, $http, $location, Flash, $cookies) {

	$scope.user = { name : '', mdp : '' };

	$scope.login = function() {
		if ($scope.user.name != '' && $scope.user.mdp != '') {
			$http.post('/authentificate', $scope.user)
			.success(function (data, status, headers, config) {
				$cookies.token = data.token;
				$location.url('/');
			})
			.error(function (data, status, headers, config) {
				delete $window.sessionStorage.token;
				Flash.set('Authentification failed.', 'error');
				$scope.user.mdp = '';
			});
		}
	}
});