'use strict';

var express = require('express'),
path = require('path'),
fs = require('fs'),
mongoose = require('mongoose'),
expressJwt = require('express-jwt');

/**
* Main application file
*/

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

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
