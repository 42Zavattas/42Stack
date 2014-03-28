'use strict';

angular.module('42StackApp')
.directive('searchbox', function ($timeout) {
	return {
		templateUrl: 'directives/searchbox.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			scope.searchText = null;
			scope.searchActive = false;
			scope.pinned = false;
			scope.searchGlobal = function (text) {
				console.log(text);
				scope.searchText = null;
				scope.searchActive = false;
			};
			scope.togglePin = function () {
				scope.pinned = !scope.pinned;
				scope.active = scope.pinned;
				if (scope.active) {
					element.find('input').focus();;
				}
			};
			scope.toggleActive = function () {
				scope.searchActive = !scope.searchActive;
				$timeout(function () { element.find('input').focus(); }, 50);
			};
			scope.setActive = function () {
				if (!scope.pinned) {
					scope.searchActive = true;
					$timeout(function () { element.find('input').focus(); }, 50);
				}
			};
			scope.setInactive = function () {
				if (!scope.pinned) {
					scope.searchActive = false;
				}
			};
		}
	};
});
