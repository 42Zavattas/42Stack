'use strict';

angular.module('42StackApp').controller('QuestionCtrl', function ($http, $scope, question, $location, Flash) {

	$scope.question = question;
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
			$scope.question.answers.push({
				msg : $scope.answer.msg
			});
		}
	};

	function resetAnswer () {
		$scope.answer = {
			msg : null
		};
		return $scope.answer;
	}

});
