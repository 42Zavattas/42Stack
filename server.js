'use strict';

var express = require('express'),
path = require('path'),
fs = require('fs'),
mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
expressJwt = require('express-jwt');

/**
* Main application file
*/

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
//var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
	if (/(.*)\.(js$|coffee$)/.test(file)) {
		require(modelsPath + '/' + file);
	}
});

// Populate empty DB with sample data
//require('./lib/config/dummydata');

var app = express();

// AUTH
// -------------------

var secret = 'this is the secret secret secret 12356';
console.log('Starting auth config...');

app.use('/api', expressJwt({secret: secret}));
app.use(express.json());
app.use(express.urlencoded());

app.use(function(err, req, res, next){
	if (err.constructor.name === 'UnauthorizedError') {
		res.send(401, 'Unauthorized');
	}
});

/*app.post('/login', function (req, res) {

	if (!(req.body.username === 'a' && req.body.password === 'a')) {
		res.send(401, 'Wrong user or password');
		return;
	}

	var profile = {
		first_name: 'John',
		last_name: 'Doe',
		email: 'john@doe.com',
		id: 123
	};

	var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

	res.json({ token: token });
});
*/
// -------------------

var server = require('http').createServer(app);

// Sockets settings
require('./lib/sockets')(server);

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
server.listen(config.port, function () {
	console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
