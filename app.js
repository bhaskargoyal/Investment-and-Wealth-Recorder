var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var db_details = require('./config/dbdetails.js');

var app = express();


mongoose.connect('mongodb://'+db_details.DB_USER+':'+db_details.DB_PASSWORD+'@'+db_details.DB_NAME+'.mlab.com:23490/investment-and-wealth-recorder');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});


app.get('/', function(req, res) {
	res.send("Hello yo");
});
var port = process.env.PORT || 3000;
app.listen(port);

console.log("Server running on port "+ port);