var mongoose = require('mongoose');

var loginSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: [8, 'Minimum Length must be greater than equal to 8'],
		maxlength: [50, 'Maximum Length must be less than equal to 50']
	},
	password: {
		type: String,
		required: true,
		minlength: [5, 'Minimum Length must be greater tha equal to 5'],
		maxlength: [50, 'Maximum Length must be less than equal to 50']
	}
});


module.exports.Login = mongoose.model('login', loginSchema, 'login');