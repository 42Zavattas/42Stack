'use strict';

angular.module('42StackApp')
.controller('AskCtrl', function ($scope, categories) {
	$scope.categories = (function (categs) {
		var res = [];
		angular.forEach(categs, function (categ) {
			res.push([categ.name, categ.name]);
		});
		return res;
	})(categories);
});
