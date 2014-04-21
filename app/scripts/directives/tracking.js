'use strict';

angular.module('42StackApp')
.directive('tracking', function ($http) {
	return {
		template: '<span></span>',
		restrict: 'E',
		replace: true,
		link: function postLink(scope, element, attrs) {
			element.text('this is the tracking directive');

			$.ajax({
				url: "https://dashboard.42.fr/crawler/pull/mbacoux/",
				dataType: "jsonp",
				crossDomain: true,
				jsonp: 'callback_jsonp',
				jsonpCallback: "localcallback"
			});

			function localcallback(json) {
				console.log(json);
			}
		}
	};
});
