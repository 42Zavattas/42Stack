'use strict';

module.exports = function (server) {
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function (socket) {
		console.log("LOOOOOL");
		socket.on('msg', function (data) {
			console.log("receiving data...", data);
			io.sockets.emit('send:msg', data);
		});
	});

};
