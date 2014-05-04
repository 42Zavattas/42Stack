'use strict';

angular.module('42StackApp').controller('ChatCtrl', function ($scope, Socket, user) {

	$scope.msgs = [];
	$scope.newMsg = '';

	Socket.on('send:newChatMsg', function (data) {
		$scope.msgs.push(data);
	});

	$scope.send = function (msg) {
		Socket.emit('newChatMsg', { user : user.login, content : msg || 'je suis un hacker je suis content', time: new Date() });
		$scope.newMsg = '';
	};
});
