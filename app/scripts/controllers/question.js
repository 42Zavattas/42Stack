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
			Restangular.all('answers').post($scope.answer).then(function (res) {
				if (typeof res === 'string') {
					Flash.set(res, 'error');
				} else {
					Flash.set('Answer saved', 'success');
					Socket.emit('newAnswer', res);
					res.author = data.users[res.author];
					resetAnswer();
				}
			}, function (err) {
				Flash.set(err.data, 'error');
			});
		}
	};

});
