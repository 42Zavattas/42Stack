'use strict';

angular.module('42StackApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'ngTagsInput',
	'ngMarkdown',
	'restangular',
	'btford.socket-io'
])
.config(function (RestangularProvider, $httpProvider) {
	RestangularProvider.setBaseUrl("/api");
	RestangularProvider.setRestangularFields({
		id: "_id"
	})
	$httpProvider.interceptors.push('authInterceptor');
})
.factory('socket', function (socketFactory) {
	return socketFactory();
})
.factory('authInterceptor', function ($rootScope, $q, $cookies, Flash) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($cookies.token) {
				config.headers.Authorization = 'Bearer ' + $cookies.token;
			}
			return config;
		},
		response: function (res) {
			return res || $q.when(res);
		},
		responseError: function (res) {
			if (typeof res.data === "string") {
				Flash.set('<strong>' + res.config.url + '</strong> ' + res.status + ' ' + res.data, 'error');
			}
			return res || $q.when(res);
		}
	};
});

angular.module('42StackApp').controller('AppCtrl', function ($scope, $location, Flash, $cookies) {

	$scope.msgs = Flash.msgs;
	$scope.$root.logged = !!$cookies.token;

	$scope.$on('$routeChangeStart', function (event, current, previous) {
		$scope.$broadcast('loading');
	});

	$scope.$on('$routeChangeSuccess', function () {
		$scope.$broadcast('loadingStop');
		$scope.newLocation = $location.path();
	});

	$scope.$on('$routeChangeError', function (event, current, previous, rejection) {
		$scope.$broadcast('loadingStop');
		if (rejection) {
			if (rejection.status && rejection.status === 401) {
				Flash.set('You are not logged', 'error');
				$location.path('/login');
				return;
			}
			Flash.set(rejection, 'error');
		}
		$location.path(previous ? previous.$$route.originalPath : '/');
	});

	$scope.logout = function () {
		delete $cookies.token;
		$scope.$root.logged = false;
		$location.path('/login');
		Flash.set('You have successfully logged out ;)', 'success');
	};

	$scope.isLogged = function () {
		return $scope.$root.logged;
	};

});
