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
.config(function (RestangularProvider) {
	RestangularProvider.setBaseUrl("/api");
	RestangularProvider.setRestangularFields({
		id: "_id"
	});
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
		$scope.$broadcast('loadingStop');
		console.log('ROUTE CHANGE ERROR: ' + rejection);
		$location.path(previous ? previous.$$route.originalPath : '/');
	});

});
