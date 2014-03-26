'use strict';

angular.module('42StackApp')
.controller('LoginCtrl', function ($scope, $http, $location, Flash, $cookies, $timeout) {

	$scope.user = { name : '', mdp : '' };
	$scope.uiLogged = true;
	$timeout(function () {
		$scope.uiLogged = false;
	}, 500);

	$scope.login = function() {
		if ($scope.user.name != '' && $scope.user.mdp != '') {
			$http.post('/authentificate', $scope.user)
			.success(function (data, status, headers, config) {
				$cookies.token = data.token;
				$scope.$root.logged = true;
				$scope.uiLogged = true;
				Flash.set('Welcome to the awesome', 'success');
				$timeout(function () {
					$location.url('/');
				}, 500);
			})
			.error(function (data, status, headers, config) {
				delete $cookies.token;
				Flash.set('Authentification failed.', 'error');
				$scope.user.mdp = '';
			});
		}
	}
});
