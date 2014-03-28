'use strict';

angular.module('42StackApp')
.controller('QuestionsCtrl', function ($scope, data, $routeParams, $location, Socket) {

	$scope.questions = data.questions;
	$scope.filterTags = $routeParams.tags ? removeDuplicate($routeParams.tags.split(',')) : [];
	$scope.filterCategs = $routeParams.categ ? removeDuplicate($routeParams.categ.split(',')) : [];

	Socket.on('send:newQuestion', function (question) {
		question.author = data.users[question.author];
//		question.category = data.categories[question.category].name;
		$scope.questions.push(question);
	});

	$scope.removeCateg = function (index) {
		$scope.filterCategs.splice(index, 1);
		rewriteUrl();
	};

	$scope.removeTag = function (index) {
		$scope.filterTags.splice(index, 1);
		rewriteUrl();
	};

	$scope.viewQuestion = function (question) {
		$location.url('/questions/' + question._id);
	};

	$scope.viewCateg = function ($event, category) {
		$event.stopPropagation();
		if ($scope.filterCategs.indexOf(category) == -1) {
			$scope.filterCategs.push(category);
			rewriteUrl();
		}
	};

	$scope.viewTag = function ($event, tag) {
		$event.stopPropagation();
		if ($scope.filterTags.indexOf(tag) == -1) {
			$scope.filterTags.push(tag);
			rewriteUrl();
		}
	};

	$scope.viewUser = function ($event, user) {
		$event.stopPropagation();
		$location.url('/users/' + user._id);
	};

	function rewriteUrl () {
		$location.url('/questions'
			+ ($scope.filterTags.length || $scope.filterCategs ? '?' : '')
			+ [($scope.filterCategs.length ? 'categ=' + $scope.filterCategs.join(',') : '')
				, ($scope.filterTags.length ? 'tags=' + $scope.filterTags.join(',') : '')].join('&'));
	}

	function removeDuplicate (tab) {
		var out = [];
		angular.forEach(tab, function (el) {
			if (out.indexOf(el) == -1) {
				out.push(el);
			}
		});
		return out;
	}

/*	$scope.nbByPage = 50;
	$scope.pageSize = $scope.nbByPage;

	$scope.filterSearch = null;

	$scope.searchQuestions = null;

	$scope.filterTagsFn = function() {
		return ($scope.selectedGenres.indexOf(movie.genre) !== -1);
	};

	console.log($scope.filterTags);
*/
});
