'use strict';

angular.module('42StackApp')
.controller('AskCtrl', function ($scope, categories, Flash, Restangular, $location) {

	$scope.question = {
		title    : null,
		category : null,
		tags     : [],
		content  : null
	};

	$scope.categories = (function (categs) {
		var res = [];
		angular.forEach(categs, function (categ) {
			res.push([categ.name, categ.name]);
		});
		return res;
	})(categories);

	$scope.post = function () {
		if (!$scope.question.title) {
			Flash.set('Why dont you enter a title ?...', 'error');
		}
		if (!$scope.question.content) {
			Flash.set('You need to enter some content...', 'error');
		}
		if (!$scope.question.tags.length) {
			Flash.set('You need to enter at least 1 tag...', 'error');
		}
		if ($scope.question.title && $scope.question.content && $scope.question.tags.length) {
			Restangular.all('questions').post($scope.question).then(function (res) {
				Flash.set('Question saved', 'success');
				$location.path('/questions');
			}, function (err) {
				Flash.set(err.data, 'error');
			});
		}
	};

});
