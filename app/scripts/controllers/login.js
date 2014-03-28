'use strict';

angular.module('42StackApp')
.controller('LoginCtrl', function (Cache, $scope, $http, $location, Flash, $cookies, $timeout) {

	$scope.user = { login : null, password : null };
	$scope.uiLogged = true;
	$timeout(function () {
		$scope.uiLogged = false;
	}, 500);

	$scope.login = function() {
		if ($scope.user.login && $scope.user.password) {
			$http.post('/authenticate', $scope.user)
			.success(function (data, status, headers, config) {
				Cache.cleanAll();
				$cookies.token = data.token;
				$scope.$root.logged = true;
				$scope.uiLogged = true;
				Flash.set('Hello, <strong>'+data.user.login+'</strong>.', 'success');
				$timeout(function () {
					$location.url('/');
				}, 500);
			})
			.error(function (data, status, headers, config) {
				delete $cookies.token;
				Flash.set(data, 'error');
				$scope.user.password = null;
			});
		}
	}
});
