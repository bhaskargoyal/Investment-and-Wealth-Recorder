var Login = require('../models/login').Login;


/*
* Get request for '/login'
*/
exports.getLogin = function(req, res) {
	if(typeof req.session.status != 'undefined' && req.session.status != null){
		var status = req.session.status;
		req.session.status = null;
		res.render('login', {title: 'Login', status: status});
	} else {
		res.render('login', {title: 'Login', status: ''});
	}
}

/*
* POST request for '/login'
*/
exports.postLogin = function(req, res) {

	// console.log(req.body.username + " " + req.body.password);
	Login.findOne({'username': req.body.username, 'password': req.body.password}, 'username', function(err, person) {
		if(err) {
			req.session.status = "Cannot connect to Database";
			res.redirect('/login');
		} else {
			// successfull query
			// console.log(req.body.username + " " + req.body.password);
			//connect to mongodb check for username and password
			if(person != null) {
				if(req.body.username == person.username) {
					req.session.loginStatus = 1;
					req.session.username = req.body.username;
					res.redirect('/account');
				} else {
					//  wrong username and password
					req.session.status = "Wrong Username or Password";
					res.redirect('/login');
				}
			} else {
				req.session.status = "Wrong Username or Password";
				res.redirect('/login');
			}
			
		}
	});

	
}


/*
* Get request for '/logout'
*/
exports.getLogout = function(req, res) {
	req.session.destroy();
	res.render('home');
}