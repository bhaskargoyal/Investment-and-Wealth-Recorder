/*
* Module Dependencies
*/
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var errorHandler = require('errorhandler');
var dotenv = require('dotenv');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sass = require('node-sass-middleware');
var MongoStore = require('connect-mongo/es5')(session);

/*
* Load Environment Variables from .env file (configuration file)
*/
dotenv.load({path: '.env'});

/*
* Controllers (Route Handlers)
*/
var homeController = require('./controllers/home');
var userController = require('./controllers/users');
var accountController = require('./controllers/account');

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(sass({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	sourceMap: true
}));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		url: process.env.MONGOLAB_URI,
		autoReconnect: true
	})
}));
app.use(express.static(path.join(__dirname, 'public')));

/*
* Console Routes for debugging
*/
app.all('/*', function(req, res, next) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	if(app.get('env') == 'development' && !req.path.includes('/js/') && !req.path.includes('/css/'))
		console.log(req.method + ' request for ' + req.path);
	next();
});


/*
* Primary App Routes
*/
app.get('/', homeController.home);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.getLogout);
app.get('/account', accountController.getAccount);
app.get('/signup', userController.getSignUp);

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