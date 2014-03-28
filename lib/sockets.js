'use strict';

module.exports = function (server) {
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function (socket) {

		socket.on('newChatMsg', function (data) {
			io.sockets.emit('send:newChatMsg', data);
		});

		socket.on('newAnswer', function (data) {
			io.sockets.emit('send:newAnswer', data);
		});

	});
};
