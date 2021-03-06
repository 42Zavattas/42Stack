'use strict';

function indexify(tab) {
	var res = {};
	angular.forEach(tab, function (el) {
		res[el._id] = el;
	});
	return res;
}

angular.module('42StackApp')
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main',
		controller : 'MainCtrl',
		resolve : {
			data : function ($q, Restangular) {
				var data = {};
				var deferred = $q.defer();
				$q.all([
					Restangular.all('questions').getList({ limit : 10 }),
					Restangular.all('users').getList()
				]).then(function (res) {
					data.questions = res[0];
					data.users = indexify(res[1]);
					angular.forEach(data.questions, function (question) {
						question.author = data.users[question.author];
					});
					deferred.resolve(data);
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
			users: function (Restangular) {
				//prevent unwanted acces for now
				return Restangular.all('users').customGET('me');
			}
		}
	})
	.when('/users', {
		templateUrl: 'partials/users',
		controller: 'UsersCtrl',
		resolve: {
			data: function ($q, Restangular) {
				var data = {};
				var deferred = $q.defer();
				$q.all([
					Restangular.all('users').getList()
				]).then(function (res) {
					data.users = res[0];
					deferred.resolve(data);
				}, function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
		}
	})
	.when('/users/:id', {
		templateUrl: 'partials/user',
		controller: 'UserCtrl',
		resolve: {
			data: function ($route, $q, Restangular) {
				var deferred = $q.defer();
				$q.all([
					Restangular.one('users', $route.current.params.id).get()
				]).then(function (res) {

					var data = {};
					data.user = (function (user) {
						if (!user._id) {
							deferred.reject('user ' + $route.current.params.id + ' not found.');
						}
						return user;
					})(res[0]);

					deferred.resolve(data);
				}, function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
		}
	})
	.when('/questions/:id', {
		templateUrl: 'partials/question',
		controller: 'QuestionCtrl',
		resolve: {
			data: function ($route, $q, Restangular) {
				var deferred = $q.defer();
				$q.all([
					Restangular.one('questions', $route.current.params.id).get(),
					Restangular.all('users').getList(),
					Restangular.all('answers').getList({ question : $route.current.params.id }),
					Restangular.all('votes').getList(),
					Restangular.all('users').customGET('me')
				]).then(function (res) {
					var data = {};
					data.users = indexify(res[1]);
					data.votes = indexify(res[3]);
					data.currentUser = res[4];
					data.question = (function (question) {
						if (!question._id) {
							deferred.reject('question '+$route.current.params.id+' not found');
						}
						question.author = data.users[question.author];
						return question;
					})(res[0]);
					data.answers = (function (answers) {
						angular.forEach(answers, function (el) {
							el.author = data.users[el.author];
						});
						return answers;
					})(res[2]);
					deferred.resolve(data);
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
			data : function ($q, Restangular) {
				var data = {};
				var deferred = $q.defer();
				$q.all([
					Restangular.all('questions').getList(),
					Restangular.all('users').getList(),
					Restangular.all('votes').getList()
				]).then(function (res) {
					data.questions = res[0];
					data.users = indexify(res[1]);
					data.votes = indexify(res[2]);
					angular.forEach(data.questions, function (question) {
						question.author = data.users[question.author];
					});
					deferred.resolve(data);
				}, function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
		}
	})
	.when('/chat', {
		templateUrl: 'partials/chat',
		controller: 'ChatCtrl',
		resolve: {
			user: function (Restangular) {
				return Restangular.all('users').customGET('me');
			}
		}
	})
	.when('/login', {
		templateUrl: 'partials/login',
		controller: 'LoginCtrl'
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
