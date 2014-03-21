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
					Restangular.all('tags').getList()
				]).then(function (res) {
					var questions = res[0];
					var tags = (function (tab) {
						var res = {};
						angular.forEach(tab, function (el) {
							res[el._id] = el;
						});
						return res;
					})(res[1]);
					angular.forEach(questions, function (question, _id) {
						console.log(question);
						angular.forEach(question.tags, function (_id, i) {
							question.tags[i] = tags[_id];
						});
						console.log(question.tags);
					});
					console.log(questions);
					deferred.resolve(questions);
				}, function (err) {
					console.log(err);
					deferred.reject();
				});
				return deferred.promise;
			}
		}
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
		console.log('ROUTE CHANGE ERROR: ' + rejection);
	});

});
