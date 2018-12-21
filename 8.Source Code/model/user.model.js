const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capstone1');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: String,
	name: String,
	email: String
});

const User = mongoose.model('User', userSchema,'users');



module.exports = User;