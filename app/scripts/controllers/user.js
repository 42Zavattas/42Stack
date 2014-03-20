'use strict';

angular.module('42StackApp').controller('UserCtrl', function ($scope, $routeParams) {

	console.log($routeParams.id);

	$scope.user = 1;

	$scope.pute = function(text) {
		return '# Converted text follows\n\n' + text;
	};

	$scope.link = function (url) {
		if (/^http:\/\/\w+\.stackexchange.com/i.test(url)) {
			return '<b>A link to an awesome site!</b>';
		} else {
			return 'some page on the internet';
		}
	};

});
