'use strict';

angular.module('42StackApp').filter('startFrom', function() {
	return function(input, start) {
		start = +start;
		return input.slice(start);
	};
});

angular.module('42StackApp').controller('UsersCtrl', function ($location, $scope, data, $routeParams, $timeout, Socket, Restangular, Flash) {

	var nbByPage = 50;
	$scope.users = data.users;
	$scope.length = $scope.users.length;
	$scope.pageSize = nbByPage;

	$scope.loadMore = function () {
		$scope.pageSize += nbByPage;
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
	});

	Socket.on('send:newVote', function(object) {
		Restangular.one('users', object.sender).get().then(function(res) {
			angular.forEach($scope.users, function (user) {
				if (user._id === res._id) {
					user.reputation = res.reputation;
				}
			});
		}, function (err) {
			Flash.set(err.message, 'error');
		});
		Restangular.one('users', object.receiver).get().then(function(res) {
			angular.forEach($scope.users, function (user) {
				if (user._id === res._id) {
					user.reputation = res.reputation;
				}
			});
		}, function (err) {
			Flash.set(err.message, 'error');
		});
	});

});
