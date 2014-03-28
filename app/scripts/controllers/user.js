'use strict';

angular.module('42StackApp')
.controller('UserCtrl', function ($scope, user) {

	$scope.user = user;

	$scope.chart = {
		options : {
			chart : {
				type : 'line',
				zoomType : 'x'
			}
		},
		series : [{
			name : 'Reputation changes',
			data : [1, 2, 3, 4, 8, 42, 24, 16, 8]
		}],
		xAxis: {currentMin: 0, currentMax: 10, minRange: 1}
	};
});
