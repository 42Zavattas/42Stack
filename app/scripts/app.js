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
	'btford.socket-io',
	'highcharts-ng'
])
.config(function (RestangularProvider, $httpProvider) {
	RestangularProvider.setBaseUrl("/api");
	RestangularProvider.setRestangularFields({
		id: "_id"
	})
	RestangularProvider.setDefaultHttpFields({cache: true});
	$httpProvider.interceptors.push('authInterceptor');
})
.factory('socket', function (socketFactory) {
	return socketFactory();
})
.factory('authInterceptor', function ($rootScope, $q, $cookies, Flash, $location) {
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
				$location.url('/login');
				return;
			}
			Flash.set('Something bad occured. Your login has been recorded.', 'error');
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
