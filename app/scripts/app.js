'use strict';

angular.module('42StackApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'ngTagsInput',
	'monospaced.elastic'
])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
		resolve: {
			data: function ($rootScope, $q, $timeout, Question) {
				var deferred = $q.defer();
				Question.load().then(function (res) {
					deferred.resolve(res);
				}, function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
		}
	})
	.when('/ask', {
		templateUrl: 'views/ask.html',
		controller: 'AskCtrl'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.when('/questions/:id', {
		templateUrl: 'views/question.html',
		controller: 'QuestionCtrl',
		resolve: {
			data: function ($rootScope, $q, $timeout) {
				$rootScope.$broadcast('loading');
				var deferred = $q.defer();
				$timeout(function () {
					deferred.resolve({ question : { title : 'Timeout' } });
				}, 100);
				return deferred.promise;
			}
		}
	})
	.when('/questions', {
		templateUrl: 'views/questions.html',
		controller: 'QuestionsCtrl',
		resolve: {
			data: function ($http, $rootScope, $q) {
				$rootScope.$broadcast('loading');
				var deferred = $q.defer();
				$http.get('/api/questions').then(function(res){
					deferred.resolve(res);
				});
				return deferred.promise;
			}
		}
	})
	.when('/users', {
		templateUrl: 'views/users.html',
		controller: 'UsersCtrl',
		resolve: {
			data: function ($http, $rootScope, $q) {
				$rootScope.$broadcast('loading');
				var deferred = $q.defer();
				$http.get('/api/users').then(function(res) {
					deferred.resolve(res);
				});
				return deferred.promise;
			}
		}
	})
	.when('/users/:id', {
		templateUrl: 'views/user.html',
		controller: 'UserCtrl'
	})
	.when('/user', {
		templateUrl: 'views/user.html',
		controller: 'UserCtrl'
	})
	.when('/chat', {
		templateUrl: 'views/chat.html',
		controller: 'ChatCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
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

