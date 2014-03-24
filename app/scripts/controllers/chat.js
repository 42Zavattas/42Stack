'use strict';

angular.module('42StackApp').controller('ChatCtrl', function ($scope, socket) {

	$scope.msgs = [];
	$scope.newMsg = '';

	socket.on('send:newChatMsg', function (data) {
		$scope.msgs.push(data);
	});

	$scope.send = function (msg) {
		socket.emit('newChatMsg', { user : "current", content : msg });
		$scope.newMsg = '';
	};
});
