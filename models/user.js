var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	age: {
		type: Number,
		required: true,
		min: [18, 'Minimum Age must be greater than equal to 18'],
		max: [120, 'Maximum Age must be less than equal to 120']
	},
	username: {
		type: ObjectId,
		required: true,
		unique: true
	}
});
// third argument for the collection name that is to be used.
var User = mongoose.model('user', userSchema, 'user');

exports.User = User;
