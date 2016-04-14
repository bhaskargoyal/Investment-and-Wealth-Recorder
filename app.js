/*
* Module Dependencies
*/
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var errorHandler = require('errorhandler');
var dotenv = require('dotenv');

/*
* Load Environment Variables from .env file (configuration file)
*/
dotenv.load({path: '.env'});

/*
* Create Express Server
*/
var app = express();

/*
* Connect To MongoLab Database
*/
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on('error', function(err) {
	console.log('MongDB not responding, please make sure MongoDB is running.');
	process.exit(1);
});

/*
* Express Configuration
*/
app.set('port', process.env.PORT || 3000);

/*
* Primary App Routes
*/
app.get('/', function(req, res) {
	res.send('hello23');
});

/*
* Error Handler
*/
app.use(errorHandler());

/*
* Start Express Server
*/
app.listen(app.get('port'), function() {
	console.log('Server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;