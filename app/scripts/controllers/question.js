'use strict';

angular.module('42StackApp').controller('QuestionCtrl', function (Restangular, $scope, data, $location, Flash, Socket) {

	function resetAnswer () {
		$scope.answer = {
			question : $scope.question._id,
			msg      : null
		};
		return $scope.answer;
	}

	$scope.question = data.question;
	$scope.answers = data.answers;
	$scope.question.answers = [];
	$scope.answer = resetAnswer();

	Socket.on('send:newAnswer', function (answer) {
		Flash.set('A new answer has been posted');
		answer.author = data.users[answer.author];
		$scope.answers.push(answer);
	});

	$scope.viewTag = function (tag) {
		$location.url('/questions?tags=' + tag);
	};

	$scope.postAnswer = function () {
		if (!$scope.answer.msg) {
			Flash.set('<strong>Invalid purpose !</strong> Type an answer before posting ?', 'error');
		}
		if ($scope.answer.msg) {
			Restangular.all('answers').post($scope.answer).then(function (answer) {
				if (typeof answer === 'string') {
					Flash.set(answer, 'error');
				} else {
					Flash.set('Answer saved', 'success');
					Socket.emit('newAnswer', answer);
					answer.author = data.users[answer.author];
					$scope.answers.push(answer);
					resetAnswer();
				}
			}, function (err) {
				Flash.set(err.data, 'error');
			});
		}
	};

	Socket.on('send:newVote', function (object) {
		Restangular.all('votes').getList({ onQuestion : object.obj }).then(function (res) {
			if (res[0].objtype === 'question') {
				$scope.question.upvotes = 0;
				$scope.question.downvotes = 0;
				angular.forEach(res, function (el) {
					if (el.type === 1) {
						$scope.question.upvotes++;
					}
					else if (el.type === -1) {
						$scope.question.downvotes++;
					}
				});
			}
			else if (res[0].objtype === 'answer') {
				angular.forEach($scope.answers, function (answer) {
					if (answer._id === object.obj) {
						answer.upvotes = 0;
						answer.downvotes = 0;
						angular.forEach(res, function (el) {
							if (el.type === 1) {
								answer.upvotes++;
							}
							else if (el.type === -1) {
								answer.downvotes++;
							}
						});
					}
				});
			}
		}, function (err) {
			Flash.set(err.data, 'error');
		});
	});

	$scope.vote = function (object, type) {
		var send = {
			object : object._id,
			type : type
		}
		Restangular.all('votes').post(send).then(function (res) {
			Flash.set(res.msg, 'info');
			Socket.emit('newVote', res);
		}, function (err) {
			Flash.set(err.data, 'error');
		});
	}

});
