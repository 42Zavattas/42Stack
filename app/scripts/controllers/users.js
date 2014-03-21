'use strict';

angular.module('42StackApp').controller('UsersCtrl', function ($location, $scope) {

	$scope.users = []

	$scope.viewUser = function (user) {
		$location.path('/users/' + user.id);
	};

});
