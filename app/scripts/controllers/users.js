'use strict';

angular.module('42StackApp').controller('UsersCtrl', function ($location, $scope, data) {

	$scope.users = data.data;

	$scope.viewUser = function (user) {
		$location.path('/users/' + user.id);
	};

});
