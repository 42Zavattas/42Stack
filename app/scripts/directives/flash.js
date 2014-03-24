'use strict';

angular.module('42StackApp')
.directive('flash', function (Flash) {
	return {
		template: '<div class="ui-flash-container"><ul><li ng-repeat="msg in msgs" ng-click="close($index)" class="{{ msg.type }}"><i class="icon-warning"></i>{{ msg.msg }}</li></ul></div>',
		restrict: 'E',
		replace : true,
		link: function (scope, element, attrs) {
			scope.close = function (i) {
				Flash.msgs.splice(i, 1);
			};
		}
	};
});
