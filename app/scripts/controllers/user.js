'use strict';

angular.module('42StackApp')
.controller('UserCtrl', function ($scope, user) {

	$scope.user = user;

	$scope.chart = {
		options : {
			chart : {
				type : 'spline',
				zoomType : 'x',
				backgroundColor: 'rgba(0, 0, 0, 0.1)',
				borderRadius: 0,
				spacingTop: 20
			},
			title : {
				text : ''
			},
			credits : {
				enabled : false
			},
			xAxis: {
				type: 'datetime',
				labels: {
					overflow: 'justify'
				},
				offset: 0,
				lineColor: "rgba(0, 0, 0, 0.1)"
			},
			yAxis: {
				title: {
					text: ''
				},
				tickInterval: 10,
				min: 0,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null
			},
			legend : {
				borderWidth: 0,
				itemHoverStyle: {
					color: ''
				}
			}
		},
		series : [{
			name : 'Reputation changes',
			data : [1, 2, 3, 4, 8, 42, 24, 16, 8]
		}]
	};
});
