'use strict';

angular.module('42StackApp')
.controller('UserCtrl', function ($scope, $location, $timeout, data, Restangular, Flash, Socket) {

	$scope.user = data.user;
	$scope.user.serie = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	Restangular.all('questions').getList({ ofUser : $scope.user._id }).then(function (res) {
		$scope.user.questions = res;
	}, function (err) {
		Flash.set(err.message, 'error');
	});

	Restangular.all('answers').getList({ ofUser : $scope.user._id }).then(function (res) {
		$scope.user.answers = res;
	}, function (err) {
		Flash.set(err.message, 'error');
	});

	$scope.viewQuestion = function (question) {
		$location.url('/questions/' + question._id);
	};

	$scope.viewAnswer = function (answer) {
		$location.url('/questions/' + answer.question + '#' + answer._id);
	};

	var reloadChart = function() {

		var newSerie = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		Restangular.all('votes').getList({ toUser : $scope.user._id, range: 14 }).then(function(res) {

			Restangular.all('votes').getList({ fromUser : $scope.user._id, range: 14 }).then(function(res1) {

				Restangular.all('answers').getList({ author: $scope.user._id, range: 14 }).then(function(res2) {

					angular.forEach(res2, function(answer) {
						var diff = Math.round(Math.abs((new Date().getTime() - new Date(answer.dateaccept).getTime())/(86400000)));
						newSerie[14 - diff] += 15;
					});

					angular.forEach(res, function(vote) {
						var diff = Math.round(Math.abs((new Date().getTime() - new Date(vote.timestamp).getTime())/(86400000)));
						newSerie[14 - diff] -= (vote.type === -1) ? 2 : 0;
						if (vote.type === 1) {
							newSerie[14 - diff] += (vote.objtype === 'answer') ? 10 : 5;
						}
					});

					angular.forEach(res1, function(vote) {
						var diff = Math.round(Math.abs((new Date().getTime() - new Date(vote.timestamp).getTime())/(86400000)));
						newSerie[14 - diff] -= (vote.type === -1) ? 1 : 0;
					});

					angular.forEach($scope.user.serie, function (val, key) {
						var repDiff;
						repDiff = val - newSerie[key];
						$scope.user.serie[key] -= repDiff;
					});
				});

			}, function (err) {
				Flash.set(err.message, 'error');
			});

		}, function (err) {
			Flash.set(err.message, 'error');
		});
	};

	reloadChart();

	Socket.on('send:newVote', function(object) {
		if (object.sender === $scope.user._id || object.receiver === $scope.user._id) {
			Restangular.one('users', $scope.user._id).get().then(function(res) {
				$scope.user.reputation = res.reputation;
			}, function (err) {
				Flash.set(err.message, 'error');
			});
			if (object.receiver === $scope.user._id) {
				if (object.objType === 'question') {
					Restangular.one('questions', object.obj).get().then(function(res) {
						angular.forEach($scope.user.questions, function (question) {
							if (question._id === res._id) {
								question.downvotes = res.downvotes;
								question.upvotes = res.upvotes;
							}
						});
					}, function(err) {
						Flash.set(err.message, 'error');
					});
				}
				else {
					Restangular.one('answers', object.obj).get().then(function(res) {
						angular.forEach($scope.user.answers, function (answer) {
							if (object.obj === answer._id) {
								answer.downvotes = res.downvotes;
								answer.upvotes = res.upvotes;
							}
						});
					}, function (err) {
						Flash.set(err.message, 'error');
					});
				}
			}
			reloadChart();
		}
	});

	Socket.on('send:acceptedAnswer', function (object) {
		angular.forEach($scope.user.answers, function (answer) {
			if (answer._id === object.answer) {
				answer.accepted = true;
			}
		});
		angular.forEach($scope.user.questions, function(question) {
			if (question._id === object.question) {
				question.resolved = object.answer;
			}
		});
		if (object.user === $scope.user._id) {
			$scope.user.reputation += 15;
		}
		reloadChart();
	});

	$scope.chart = {
		options : {
			chart : {
				type : 'spline',
				zoomType : 'x',
				backgroundColor: 'rgba(0, 0, 0, 0.1)',
				borderRadius: 0,
				spacingTop: 20
			},
			title : {
				text : ''
			},
			credits : {
				enabled : false
			},
			xAxis: {
				type: 'datetime',
				labels: {
					overflow: 'justify'
				},
				offset: 0,
				lineColor: 'rgba(0, 0, 0, 0.1)'
			},
			yAxis: {
				title: {
					text: ''
				},
				tickInterval: 20,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null
			},
			legend : {
				borderWidth: 0,
				itemHoverStyle: {
					color: ''
				}
			}
		},
		series : [{
			pointStart: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 14, 2, 0, 0, 0).getTime(),
			pointInterval: 24 * 3600 * 1000,
			name : 'Reputation changes',
			data : $scope.user.serie
		}]
	};

});
