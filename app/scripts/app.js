'use strict';

angular.module('42StackApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute'
])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main',
		controller : 'MainCtrl'
	})
.when('/users', {
  templateUrl: 'partials/users',
  controller: 'UsersCtrl'
})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
});
