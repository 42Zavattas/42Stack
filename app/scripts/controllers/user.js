'use strict';

angular.module('42StackApp')
.controller('UserCtrl', function ($scope, $location, $timeout, data, Restangular, Flash) {

	$scope.user = data.user;

	Restangular.all('questions').getList({ ofUser : $scope.user._id }).then(function (res) {
		$scope.user.questions = res;
	}, function (err) {
		Flash.set(err.message, 'error');
	});

	Restangular.all('answers').getList({ ofUser : $scope.user._id }).then(function (res) {
		$scope.user.answers = res;
	}, function (err) {
		Flash.set(err.message, 'error');
	});

	$scope.viewQuestion = function (question) {
		$location.url('/questions/' + question._id);
	};

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
			data : $scope.user.serie
		}]
	};

});
