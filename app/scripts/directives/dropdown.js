'use strict';

angular.module('42StackApp').directive('dropdown', function ($timeout) {
	return {
		templateUrl: 'directives/dropdown.html',
		replace: true,
		scope: {
			title: '@',
			options: '='
		},
		restrict: 'E',
		link: function (scope, element) {
			$timeout(function () {
				element.dropdown({
					stack: false,
					gutter: 5
				});
			}, 0);
		}
	};
});
