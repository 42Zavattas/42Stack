'use strict';

angular.module('42StackApp')
.service('Cache', function Cache($q, Restangular) {
	var that = this;
	this.store = {};
	this.get = function (model, query) {
		var deferred = $q.defer();
		if (that[model]) {
			console.log('Cache retrieved for ' + model);
			console.log(that[model]);
			deferred.resolve(that[model]);
		} else {
			console.log('Getting cache for ' + model);
			Restangular.all(model).getList().then(function (res) {
				that[model] = res;
				console.log(that[model]);
				deferred.resolve(that[model]);
			}, function (err) {
				deferred.reject(err);
			});
		}
		return deferred.promise;
	};
	this.clean = function (model) {
		console.log('Cleaning cache for ' + model);
		if (that.store[model]) {
			delete that.store[model];
		}
	};
	this.cleanAll = function () {
		angular.forEach(that.store, function (el, key) {
			console.log('Clearing ' + key);
			delete that.store[key];
		});
	};
});
