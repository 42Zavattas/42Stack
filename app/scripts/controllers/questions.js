'use strict';

angular.module('42StackApp')
.controller('QuestionsCtrl', function ($scope, data, $routeParams, $location,
Socket, Flash, Restangular) {

	function rewriteUrl () {
		$location.url('/questions' +
		($scope.filterTags.length || $scope.filterCategs ? '?' : '') +
		[($scope.filterTags.length ? 'tags=' + $scope.filterTags.join(',') : '')].join('&'));
	}

	function removeDuplicate (tab) {
		var out = [];
		angular.forEach(tab, function (el) {
			if (out.indexOf(el) === -1) {
				out.push(el);
			}
		});
		return out;
	}

	Socket.on('send:newQuestion', function (question) {
		question.author = data.users[question.author];
		$scope.questions.push(question);
		Flash.set('A <strong><a href="/questions/'+question._id+'">new question</a></strong> has been posted !');
	});

	Socket.on('send:newVote', function (object) {
		Restangular.all('votes').getList({ onQuestion : object }).then(function (res) {
			if (res[0].objtype === 'question') {
				angular.forEach($scope.questions, function (question) {
					if (question._id === object) {
						question.upvotes = 0;
						question.downvotes = 0;
						angular.forEach(res, function (el) {
							if (el.type === 1) {
								question.upvotes++;
							}
							else if (el.type === -1) {
								question.downvotes++;
							}
						});
					}
				});
			}
		}, function (err) {
			Flash.set(err.message, 'error');
		});
	});

	$scope.questions = data.questions;
	$scope.filterTags = $routeParams.tags ? removeDuplicate($routeParams.tags.split(',')) : [];

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

	$scope.viewTag = function ($event, tag) {
		$event.stopPropagation();
		if ($scope.filterTags.indexOf(tag) === -1) {
			$scope.filterTags.push(tag);
			rewriteUrl();
		}
	};

	$scope.viewUser = function ($event, user) {
		$event.stopPropagation();
		$location.url('/users/' + user._id);
	};

	$scope.nbByPage = 50;
	$scope.pageSize = $scope.nbByPage;

	$scope.searchQuestions = null;

});
