'use strict';

module.exports = function (server) {
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function (socket) {

		socket.on('newChatMsg', function (data) {
			io.sockets.emit('send:newChatMsg', data);
		});

		socket.on('newQuestion', function (question) {
			io.sockets.emit('send:clearCache');
			socket.broadcast.emit('send:newQuestion', question);
		});

		socket.on('newUser', function (data) {
			io.sockets.emit('send:clearCache');
			io.sockets.emit('send:newUser', data);
		});

		socket.on('newAnswer', function (data) {
			io.sockets.emit('send:clearCache');
			socket.broadcast.emit('send:newAnswer', data);
		});

		socket.on('newVote', function (data) {
			io.sockets.emit('send:clearCache');
			io.sockets.emit('send:newVote', data._id);
		});

	});
};
