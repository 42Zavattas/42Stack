'use strict';

angular.module('42StackApp')
.service('Flash', function Flash($rootScope) {

	var that = this;

	this.msgs = [];

	this.set = function (msg, type) {
		that.msgs.push({ msg : msg, type : type || 'info' });
		setTimeout(function () {
			that.msgs.shift();
			$rootScope.$apply();
		}, 2000);
	};

});
