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
	$scope.currentUser = data.currentUser;
	$scope.question.answers = [];
	$scope.answer = resetAnswer();

	Socket.on('send:newAnswer', function (answer) {
		Flash.set('A new answer has been posted');
		answer.author = data.users[answer.author];
		$scope.answers.push(answer);
	});

	console.log(data);

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
					$scope.$broadcast('refreshMarkdown');
				}
			}, function (err) {
				Flash.set(err.data, 'error');
			});
		}
	};

	$scope.acceptAnswer = function (answer) {
		if ($scope.currentUser._id === $scope.question.author._id) {
			var send = {
				question: $scope.question._id,
				answer: answer._id
			}
			Restangular.all('answers').customPOST(send, 'accept').then(function (res) {
				Socket.emit('acceptAnswer', res);
			}, function (err) {
				Flash.set(err.data, 'error');
			});
		}
	};

	Socket.on('send:acceptedAnswer', function (object) {
		$scope.question.resolved = object.answer;
	});

	Socket.on('send:newVote', function (object) {
		if (object.objType === 'question' && $scope.question._id === object.obj) {
			Restangular.one('questions', object.obj).get().then(function (res) {
				$scope.question.upvotes = res.upvotes;
				$scope.question.downvotes = res.downvotes;
			}, function (err) {
				Flash.set(err.data, 'error');
			});
		}
		else {
			Restangular.one('answers', object.obj).get().then(function (res) {
				angular.forEach($scope.answers, function (answer) {
					if (object.obj === answer._id) {
						answer.upvotes = res.upvotes;
						answer.downvotes = res.downvotes;
					}
				});
			}, function (err) {
				Flash.set(err.data, 'error');
			});
		}
	});

	$scope.vote = function (object, type) {
		var send = {
			object : object._id,
			type : type
		};
		Restangular.all('votes').post(send).then(function (res) {
			Flash.set(res.msg, 'info');
			Socket.emit('newVote', res);
		}, function (err) {
			Flash.set(err.data, 'error');
		});
	};

});
