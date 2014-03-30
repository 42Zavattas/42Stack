'use strict';

angular.module('42StackApp')
.controller('UserCtrl', function ($scope, user, Socket, Restangular) {

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
				lineColor: 'rgba(0, 0, 0, 0.1)'
			},
			yAxis: {
				title: {
					text: ''
				},
				tickInterval: 20,
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
			pointStart: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 14, 1, 0, 0, 0).getTime(),
			pointInterval: 24 * 3600 * 1000,
			name : 'Reputation changes',
			data : user.serie
		}]
	};
});
