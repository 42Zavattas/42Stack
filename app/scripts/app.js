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
		controller : 'MainCtrl',
		resolve : {
			questions : function ($q, Restangular) {
				var deferred = $q.defer();
				$q.all([
					Restangular.all('questions').getList(),
					Restangular.all('tags').getList(),
					Restangular.all('users').getList()
				]).then(function (res) {
					var questions = res[0];
					var tags = indexify(res[1]);
					var users = indexify(res[2]);
					angular.forEach(questions, function (question, _id) {
						question.author = users[question.author];
						angular.forEach(question.tags, function (_id, i) {
							question.tags[i] = tags[_id];
						});
					});
					deferred.resolve(questions);
				}, function (err) {
					deferred.reject();
				});
				return deferred.promise;
			}
		}
	})
	.when('/users', {
		templateUrl: 'partials/users',
		controller: 'UsersCtrl',
		resolve: {
			users: function (Restangular) {
				return Restangular.all('users').getList();
			}
		}
	})
	.when('/users/:id', {
		templateUrl: 'partials/user',
		controller: 'UserCtrl',
		resolve: {
			user: function ($route, $q, Restangular) {
				var deferred = $q.defer();
				Restangular.one('users', $route.current.params.id).get().then(function (res) {
					if (!res._id) {
						deferred.reject("No such user");
					} else {
						deferred.resolve(res);
					}
				}, function (err) {
					deferred.reject(err);
				})
				return deferred.promise;
			}
		}
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(true);
})
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
	});

});

function indexify(tab) {
	var res = {};
	angular.forEach(tab, function (el) {
		res[el._id] = el;
	});
	return res;
}
