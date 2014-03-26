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
	RestangularProvider.setDefaultHttpFields({cache: true});
	RestangularProvider.setRestangularFields({
		id: "_id"
	})

	$httpProvider.interceptors.push('authInterceptor');
})
.factory('socket', function (socketFactory) {
	return socketFactory();
})
.factory('authInterceptor', function ($rootScope, $q, $cookies) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($cookies.token) {
				config.headers.Authorization = 'Bearer ' + $cookies.token;
			}
			return config;
		},
		response: function (response) {
			if (response.status === 401) {
				// handle the case where the user is not authenticated
				console.log(response);
			}
			return response || $q.when(response);
		}
	};
});

angular.module('42StackApp').controller('AppCtrl', function ($scope, $location, Flash, $cookies) {

	$scope.msgs = Flash.msgs;

	$scope.$on('$routeChangeStart', function (event, current, previous) {
		$scope.$broadcast('loading');
	});

	$scope.$on('$routeChangeSuccess', function () {
		$scope.$broadcast('loadingStop');
		$scope.newLocation = $location.path();
	});

	$scope.$on('$routeChangeError', function (event, current, previous, rejection) {
		$scope.$broadcast('loadingStop');
		if (rejection.status && rejection.status === 401) {
			Flash.set('Unauthorized', 'error');
			$location.path('/login');
			return;
		}
		Flash.set(rejection, 'error');
		$location.path(previous ? previous.$$route.originalPath : '/');
	});

	$scope.logout = function () {
		delete $cookies.token;
		$location.path('/login');
		Flash.set('You have successfully logged out ;)');
	};

});
