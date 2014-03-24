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
.config(function (RestangularProvider) {
	RestangularProvider.setBaseUrl("/api");
	RestangularProvider.setDefaultHttpFields({cache: true});
	RestangularProvider.setRestangularFields({
		id: "_id"
	})
})
.factory('socket', function (socketFactory) {
	return socketFactory();
});

angular.module('42StackApp').controller('AppCtrl', function ($scope, $location, Flash) {

	$scope.msgs = Flash.msgs;

	$scope.$on('$routeChangeStart', function (event, current, previous) {
		$scope.$broadcast('loading');
	});

	$scope.$on('$routeChangeSuccess', function () {
		$scope.$broadcast('loadingStop');
		$scope.newLocation = $location.path();
	});

	$scope.$on('$routeChangeError', function (event, current, previous, rejection) {
		console.log(event, rejection);
		$scope.$broadcast('loadingStop');
		if (rejection.status && rejection.status === 401) {
			Flash.set('U mad bro ?', 'error');
			$location.path('/login');
			return;
		}
		Flash.set(rejection, 'error');
		$location.path(previous ? previous.$$route.originalPath : '/');
	});

});
