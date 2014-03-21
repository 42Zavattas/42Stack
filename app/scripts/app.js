'use strict';

angular.module('42StackApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'ngTagsInput',
	'monospaced.elastic',
	'restangular'
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
})
.config(function (RestangularProvider) {
	RestangularProvider.setBaseUrl("/api");
});

angular.module('42StackApp').controller('AppCtrl', function ($scope, $location) {

	$scope.$on('$routeChangeStart', function () {
		$scope.$broadcast('loading');
	});

	$scope.$on('$routeChangeSuccess', function () {
		$scope.$broadcast('loadingStop');
		$scope.newLocation = $location.path();
	});

	$scope.$on('$routeChangeError', function (event, current, previous, rejection) {
		console.log('ROUTE CHANGE ERROR: ' + rejection);
	});

});
