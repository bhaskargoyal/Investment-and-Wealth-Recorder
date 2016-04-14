var http = require('http');
var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.send("Hello");
});
var port = process.env.PORT || 3000;
app.listen(port);

console.log("Server running on port "+ port);