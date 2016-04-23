/*
* Get request for '/account'
*/
exports.getAccount = function(req, res) {
	// console.log(req.session.loginStatus + " " + req.session.username);
	if(typeof req.session.loginStatus != 'undefined' && req.session.loginStatus != null 
			&& typeof req.session.username != 'undefined' && req.session.username != null) {
		
		res.render('account', {username: req.session.username});
	} else {
		req.session.status = "Session Expired";
		res.redirect('/login');
	}
}
/*
* Get request for '/account'
*/
exports.postAccount = function(req, res) {
	// console.log(req.session.loginStatus + " " + req.session.username);
	// if(typeof req.session.loginStatus != 'undefined' && req.session.loginStatus != null 
	// 		&& typeof req.session.username != 'undefined' && req.session.username != null) {
		
	// 	res.render('account', {username: req.session.username});
	// } else {
	// 	req.session.status = "Session Expired";
	// 	res.redirect('/login');
	// }
}