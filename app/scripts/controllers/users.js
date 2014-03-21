'use strict';

angular.module('42StackApp').controller('UsersCtrl', function ($location, $scope, users, $routeParams) {

	$scope.users = users;

	$scope.viewUser = function (user) {
		$location.path('/users/' + user._id);
	};

});
