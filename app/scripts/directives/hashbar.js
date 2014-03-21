'use strict';

angular.module('42StackApp').directive('hashbar', function ($location) {
	return {
		templateUrl: 'directives/hashbar.html',
		restrict: 'E',
		link: function postLink(scope) {
			var pathsTab = $location.path().split('/');
			pathsTab.shift();
			if (!pathsTab[0]) {
				pathsTab.shift();
			}
			var paths = [];
			angular.forEach(pathsTab, function (path, index) {
				if (index === 0) {
					paths.push({ name : path, path : path });
				}
				else {
					paths.push({ name : path, path : paths[index - 1].path + '/' + path });
				}
			});
			scope.paths = paths.length ? paths : null;
		}
	};
});
