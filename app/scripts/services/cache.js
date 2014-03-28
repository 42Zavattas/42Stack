'use strict';

angular.module('42StackApp')
.service('Cache', function Cache($q, Restangular) {
	var that = this;
	this.store = {};
	this.get = function (model, query) {
		var deferred = $q.defer();
		if (that[model]) {
			deferred.resolve(that[model]);
		} else {
			Restangular.all(model).getList().then(function (res) {
				that[model] = res;
				deferred.resolve(res);
			}, function (err) {
				deferred.reject(err);
			});
		}
		return deferred.promise;
	};
});
