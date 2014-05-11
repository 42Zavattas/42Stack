'use strict';

angular.module('42StackApp')
.factory('Socket', function (socketFactory, $cookies) {
	return socketFactory();
});
