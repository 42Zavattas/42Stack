'use strict';

angular.module('42StackApp')
.filter('questionsFilter', function () {

	return function(items, obj) {

		var result = [];
		function removeDuplicate (tab) {
			var out = [];
			angular.forEach(tab, function (el) {
				if (out.indexOf(el) === -1) {
					out.push(el);
				}
			});
			return out;
		}

		if (obj.text !== undefined || obj.tags.length > 0) {
			angular.forEach(items, function (item) {
				if (item.title.indexOf(obj.text) >= 0) {
					result.push(item);
				}
				angular.forEach(obj.tags, function (tag) {
					if (item.tags.indexOf(tag) >= 0) {
						result.push(item);
					}
				});
			});
			return removeDuplicate(result);
		}
		return items;
	};
});
