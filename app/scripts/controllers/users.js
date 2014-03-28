'use strict';

angular.module('42StackApp').filter('startFrom', function() {
	return function(input, start) {
		start = +start;
		return input.slice(start);
	}
});

angular.module('42StackApp').controller('UsersCtrl', function ($location, $scope, users, $routeParams, $timeout) {

	$scope.users = users;
	$scope.length = $scope.users.length;
	$scope.pageSize = 30;

	$scope.loadMore = function () {
		$scope.pageSize += 30;
	};

	$scope.viewUser = function (user) {
		$location.path('/users/' + user._id);
	};

	var tempFilterText = '',
	filterTextTimeout;

	$scope.$watch('search', function (val) {
		if (filterTextTimeout) {
			$timeout.cancel(filterTextTimeout);
		}
		tempFilterText = val;
		filterTextTimeout = $timeout(function() {
			$scope.filterText = tempFilterText;
		}, 100);
	})

});
