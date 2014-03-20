'use strict';

angular.module('42StackApp')
	.controller('MainCtrl', function ($scope, $http) {
		$http.get('/api/awesomeThings').success(function (awesomeThings) {
			$scope.awesomeThings = awesomeThings;
		});
	});
