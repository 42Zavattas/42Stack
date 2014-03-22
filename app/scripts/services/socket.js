'use strict';

angular.module('42StackApp')
.factory('mySocket', function (socketFactory) {
	console.log("pute de chantier qui bosse en afrique");
	return socketFactory();
});
