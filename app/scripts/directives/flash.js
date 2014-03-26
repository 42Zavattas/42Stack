'use strict';

angular.module('42StackApp')
.directive('flash', function (Flash) {
	return {
		templateUrl: 'directives/flash.html',
		restrict: 'E',
		replace : true,
		link: function (scope, element, attrs) {
			scope.close = function (i) {
				Flash.msgs.splice(i, 1);
			};
		}
	};
});
