'use strict';

angular.module('42StackApp')
.directive('loader', function () {
	return {
		templateUrl: 'directives/loader.html',
		restrict: 'E',
		link: function postLink(scope) {
			scope.loading = true;
			scope.$on('loading', function() {
				scope.loading = true;
			});
			scope.$on('loadingStop', function() {
				scope.loading = false;
			});
		}
	};
});
