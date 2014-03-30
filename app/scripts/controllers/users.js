'use strict';

angular.module('42StackApp').filter('startFrom', function() {
	return function(input, start) {
		start = +start;
		return input.slice(start);
	};
});

angular.module('42StackApp').controller('UsersCtrl', function ($location, $scope, data, $routeParams, $timeout, Socket, Restangular) {

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
		Restangular.all('votes').getList({ toUser : object.receiver }).then(function (res) {
			angular.forEach($scope.users, function (user) {
				if (user._id === object.receiver) {
					user.reputation = 0;
					angular.forEach(res, function(vote) {
						if (vote.type === -1) {
							user.reputation -= 2;
						}
						else if (vote.type === 1) {
							user.reputation += (vote.objtype === 'answer') ? 10 : 5;
						}
					});
				}
			});
		}, function (err) {
			Flash.set(err.message, 'error');
		});
	});

});
