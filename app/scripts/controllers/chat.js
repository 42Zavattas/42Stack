'use strict';

angular.module('42StackApp').controller('ChatCtrl', function ($scope, Socket) {

	$scope.msgs = [];
	$scope.newMsg = '';

	Socket.on('send:newChatMsg', function (data) {
		$scope.msgs.push(data);
	});

	$scope.send = function (msg) {
		Socket.emit('newChatMsg', { user : 'current', content : msg || 'je suis un hacker je suis content' });
		$scope.newMsg = '';
	};
});
