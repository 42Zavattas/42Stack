'use strict';

angular.module('42StackApp').service('User', function User($http, $q) {

	var that = this;
	this.data = {};

	this.load = function () {
		var deferred = $q.defer();
		$http.get('/api/users').then(function(res){
			that.data.tab = res.data;
			that.data.obj = {};
			angular.forEach(that.data.tab, function (el) {
				that.data.obj[el.id] = el;
			});
			deferred.resolve(that.data.tab);
		}, function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.getUser = function (id) {
		return (that.data.obj[id]);
	};
});
