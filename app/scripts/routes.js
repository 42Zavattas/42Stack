'use strict';

angular.module('42StackApp')
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
	.when('/ask', {
		templateUrl: 'partials/ask',
		controller: 'AskCtrl'
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
						deferred.reject('user '+$route.current.params.id+' not found');
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
	.when('/chat', {
		templateUrl: 'partials/chat',
		controller: 'ChatCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(true);
});

function indexify(tab) {
	var res = {};
	angular.forEach(tab, function (el) {
		res[el._id] = el;
	});
	return res;
}
