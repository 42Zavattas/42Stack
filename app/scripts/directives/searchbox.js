'use strict';

angular.module('42StackApp')
.directive('searchbox', function () {
	return {
		templateUrl: 'directives/searchbox.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			scope.searchText = null;
			scope.searchActive = false;
			scope.searchGlobal = function (text) {
				console.log(text);
				scope.searchText = null;
				scope.searchActive = false;
			};
			scope.toggleActive = function () {
				scope.searchActive = !scope.searchActive;
			};
			scope.setActive = function () {
				scope.searchActive = true;
			};
			scope.setInactive = function () {
				scope.searchActive = false;
			};
		}
	};
});
