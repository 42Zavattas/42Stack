'use strict';

angular.module('42StackApp')
.service('Resetsocket', function Resetsocket(Socket, Cache) {

	return {
		run: function () {
			Socket.removeAllListeners();
			Socket.on('send:clearCache', function () {
				Cache.clean();
			});
		}
	};

});
