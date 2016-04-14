/*
* Get request for /
*/
exports.home = function(req, res) {
	res.render('home', {title: "Home"});
}