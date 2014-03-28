'use strict';

angular.module('42StackApp')
.directive('searchbox', function () {
	return {
		template: '<form ng-submit="searchGlobal(searchText)"><input ng-model="searchText" type="text" placeholder="Search ..."><input type="submit" class="ui-hidden" value="Search"></form>',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			scope.searchText = null;
			scope.searchGlobal = function (text) {
				console.log(text);
				scope.searchText = null;
			}
		}
	};
});
