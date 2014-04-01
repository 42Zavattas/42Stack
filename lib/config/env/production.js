'use strict';

module.exports = {
	env  : 'production',
	mongo: {
		uri: process.env.MONGOLAB_URI ||
			process.env.MONGOHQ_URL ||
			'mongodb://zavatta:jetemmer.de@ds039507.mongolab.com:39507/42stack'
	}
};
