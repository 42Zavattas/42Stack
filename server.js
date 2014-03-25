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

var secret = 'Are you a zavatta ?';

app.use('/api', expressJwt({secret: secret}));
app.use(express.json());
app.use(express.urlencoded());

app.use(function(err, req, res, next){
	if (err.constructor.name === 'UnauthorizedError') {
		res.send(401, 'Unauthorized');
	}
});

// Express settings
require('./lib/config/express')(app);

app.post('/authentificate', function (req, res) {

	//console.log(req.body);
	//We need to check name & sha of pass + salt
	if (!(req.body.name === 'a' && req.body.mdp === 'a')) {
		res.send(401, 'Auth failed');
		return;
	}

	var profile = {
		id: 1,
		first_name: 'Purposed',
		last_name: 'Zavatta',
		email: 'zav@t.ta'
	};

	var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

	res.json({ token: token });
});

// Routing
require('./lib/routes')(app);

var server = require('http').createServer(app);

// Sockets settings
require('./lib/sockets')(server);

// -------------------

// Start server
server.listen(config.port, function () {
	console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
