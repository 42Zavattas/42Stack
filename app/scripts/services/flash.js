'use strict';

angular.module('42StackApp')
.service('Flash', function Flash() {

	var that = this;

	this.msgs = [];

	this.set = function (msg, type) {
		that.msgs.push({ msg : msg, type : type || 'info' });
	};

});
