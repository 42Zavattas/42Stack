'use strict';

angular.module('42StackApp').service('Question', function Question($http, $q, User, Tags) {

	var that = this;
	this.data = {};

	this.getQuestion = function (id) {

		var deferred = $q.defer();
		if (!that.data.obj || !that.data.obj[id]) {
			deferred.resolve({ title : 'Oops, an error occured.' });
		}
		else {
			deferred.resolve(that.data.obj[id]);
		}
		return deferred.promise;
	};

	this.getQuestionsByCategory = function (category) {

		var deferred = $q.defer();
		if (!that.data.obj) {
			deferred.resolve({ title: 'Oops, an error occured.' });
		}
		else {
			that.data.obj = {};
			angular.forEach(that.data.tab, function (el) {
				if (el.category === category) {
					that.data.obj[el.id] = el;
				}
			});
			deferred.resolve(that.data.obj);
		}
		return deferred.promise;
	};

	this.load = function () {
		var deferred = $q.defer();
		Tags.load().then(function() {
			$http.get('/api/questions').then(function (res) {
				that.data.tab = res.data;
				that.data.obj = {};
				angular.forEach(that.data.tab, function (el) {
					User.load().then(function () {
						that.data.obj[el.id].author = User.getUser(el.author);
					});
					angular.forEach(el.tags, function (tag, key) {
						el.tags[key] = Tags.getTag(tag.id);
					});
					that.data.obj[el.id] = el;
				});
				deferred.resolve(that.data.tab);
			}, function (err) {
				deferred.reject(err);
			});
		});
		return deferred.promise;
	};
});
