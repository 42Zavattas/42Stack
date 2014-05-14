'use strict';

angular.module('42StackApp').controller('ProfileCtrl', function ($scope, Restangular, $location) {

	if ($scope.$root.user) {
		$location.url('/users/' + $scope.$root.user._id);
	}
	else {
		Restangular.all('users').customGET('me').then(function (res) {
			$scope.$root.user = { _id: res._id, login : res.login };
			$location.url('/users/' + $scope.$root.user._id);
		}, function (err) {
			Flash.set(err.message, 'error');
		});
	}

});
