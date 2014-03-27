'use strict';

angular.module('42StackApp').controller('QuestionCtrl', function (Restangular, $scope, question, answers, $location, Flash) {

	$scope.question = question;
	$scope.answers = answers;
	$scope.question.answers = [];
	$scope.answer = resetAnswer();

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
					$scope.answers.push(res);
				}
			}, function (err) {
				Flash.set(err.data, 'error');
			});
		}
	};

	function resetAnswer () {
		$scope.answer = {
			question : $scope.question._id,
			msg      : null
		};
		return $scope.answer;
	}

});
