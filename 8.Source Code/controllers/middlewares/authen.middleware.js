var User = require('../../model/user.model.js');
const mongoose = require('mongoose');
var cookieParser = require("cookie-parser");
mongoose.connect('mongodb://localhost/capstone1');

module.exports.requireAuthen = async (req, res , next)=>{
	if(!req.cookies.userid ){
		res.redirect('/');
		return;
	} else {
		User.findOne({id : req.cookies.userid }, (err, user)=> {
				if(!user){
					res.redirect('/');
					return;
				} else {
					res.locals.user = user;
					console.log(res.locals.user.name);
					next();
				}
		});
	}
	
};	