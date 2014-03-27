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
					Restangular.all('questions').getList({ limit : 10 }),
					Restangular.all('users').getList(),
					Restangular.all('categories').getList()
				]).then(function (res) {
					var questions = res[0];
					var users = indexify(res[1]);
					var categories = indexify(res[2]);
					angular.forEach(questions, function (question, _id) {
						question.author = users[question.author];
						question.category = categories[question.category].name;
					});
					deferred.resolve(questions);
				}, function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
		}
	})
	.when('/ask', {
		templateUrl: 'partials/ask',
		controller: 'AskCtrl',
		resolve : {
			categories : function (Restangular) {
				return Restangular.all('categories').getList();
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
		controller: 'ChatCtrl',
		resolve: {
			user: function (Restangular) {
				return Restangular.all('users').getList();
			}
		}
	})
	.when('/questions/:id', {
		templateUrl: 'partials/question',
		controller: 'QuestionCtrl',
		resolve: {
			question: function ($route, $q, Restangular) {
				var deferred = $q.defer();
				$q.all([
					Restangular.one('questions', $route.current.params.id).get(),
					Restangular.all('users').getList(),
					Restangular.all('answers').getList({ question : $route.current.params.id })
				]).then(function (res) {
					var question = res[0];
					if (!question._id)
						deferred.reject('question '+$route.current.params.id+' not found');
					var users = indexify(res[1]);
					question.author = users[question.author];
					deferred.resolve(question);
				}, function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			},
			answers : function ($route, $q, Restangular) {
				var deferred = $q.defer();
				Restangular.all('answers')
				.getList({ question : $route.current.params.id })
				.then(function (res) {
					deferred.resolve(res);
				}, function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
		}
	})
	.when('/questions', {
		templateUrl: 'partials/questions',
		controller: 'QuestionsCtrl',
		resolve: {
			questions : function ($q, Restangular) {
				var deferred = $q.defer();
				$q.all([
					Restangular.all('questions').getList(),
					Restangular.all('users').getList(),
					Restangular.all('categories').getList()
				]).then(function (res) {
					var questions = res[0];
					var users = indexify(res[1]);
					var categories = indexify(res[2]);
					angular.forEach(questions, function (question, _id) {
						question.author = users[question.author];
						question.category = categories[question.category].name;
					});
					deferred.resolve(questions);
				}, function (err) {
					deferred.reject();
				});
				return deferred.promise;
			}
		}
	})
	.when('/login', {
		templateUrl: 'partials/login',
		controller: 'LoginCtrl'
	})
	.when('/signup', {
		templateUrl: 'partials/signup',
		controller: 'SignupCtrl'
	})
	.when('/profile', {
		templateUrl: 'partials/profile',
		controller: 'ProfileCtrl'
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
