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
				return Restangular.all('users').getList();
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
					angular.forEach(data.users, function (user) {
						Restangular.all('votes').getList({ toUser : user._id }).then(function (res){
							angular.forEach(res, function(vote) {
								if (vote.type === -1) {
									user.reputation -= 2;
								}
								else if (vote.type === 1) {
									user.reputation += (vote.objtype === 'answer') ? 10 : 5;
								}
							});
						}, function (err) {
							console.log(err);
						})
					});
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
					Restangular.all('votes').getList()
				]).then(function (res) {
					var data = {};
					data.users = indexify(res[1]);
					data.votes = indexify(res[3]);
					data.question = (function (question) {
						if (!question._id) {
							deferred.reject('question '+$route.current.params.id+' not found');
						}
						question.author = data.users[question.author];
						angular.forEach(data.votes, function (vote) {
							if (vote.obj === question._id) {
								if (vote.type === -1) {
									question.downvotes++;
								}
								else if (vote.type === 1) {
									question.upvotes++;
								}
							}
						});
						return question;
					})(res[0]);
					data.answers = (function (answers) {
						angular.forEach(answers, function (el) {
							el.author = data.users[el.author];
							angular.forEach(data.votes, function (vote) {
								if (vote.obj === el._id) {
									if (vote.type === -1) {
										el.downvotes++;
									}
									else if (vote.type === 1) {
										el.upvotes++;
									}
								}
							});
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
						angular.forEach(data.votes, function (vote) {
							if (vote.obj === question._id) {
								if (vote.type === -1) {
									question.downvotes++;
								}
								else if (vote.type === 1) {
									question.upvotes++;
								}
							}
						});
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
				return Restangular.all('users').getList();
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
