var express = require('express');
var app = express();

var server = require('http').Server(app);


// require socket.io
// const socket = require('./socket.io/socket.js')(server);
const io = require('socket.io')(server);


const passport = require('passport');
const passportfb = require('passport-facebook').Strategy;

const session = require('express-session');
var sharedsession = require("express-socket.io-session");

const pug = require('pug');
const mongoose = require('mongoose');
const shortid = require('shortid');


const User = require('./model/user.model.js');
const Word = require('./model/words.model.js');

var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");

var authMiddleware = require('./controllers/middlewares/authen.middleware.js');

var port = process.env.PORT || 5000;


mongoose.connect('mongodb://localhost/capstone1');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(session({
	secret: "my-secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './views');


// socket .................................
	var users = [];

	var room = {
		roomId : shortid.generate(),
		users: users
	};
	



	console.log(room.roomId);

	var randomWords =[];
	var userName =[];




	function createKeyWords() {	
		Word.count().exec(function (err, count) {

			for(let i = 0 ; i < 10; i++) {
		  		// Get a random entry
			  	var random = Math.floor(Math.random() * count)

			  	// Again query all users but only fetch one offset by our random #
			  	Word.findOne().skip(random).exec(
			    	function (err, word) {
			    		randomWords.push(word);
			    		console.log(word);
			    	});
			}

		});
	}	
	


	

	createKeyWords();

	// io.use(sharedsession(session));
	io.on("connection", (socket)=> {
		// socket.handshake.session.socketid = socket.id;
  //       socket.handshake.session.save();

  		socket.on('render-html', function() {
  		 	socket.emit('render', {rd: randomWords, us: userName});
  		});

		console.log('co nguoi dang nhap'+ socket.id);			

		socket.on('disconnect', function() {

			// if (socket.handshake.session.socketid) {
   //          	delete socket.handshake.session.socketid;
   //          socket.handshake.session.save();
   //      }
			console.log('da ngat ket noi'+ socket.id);
			socket.broadcast.emit('player-disconected', "some one disconnect, game finish");
		});

		socket.on('send-message', function(data) {
			socket.broadcast.emit('server-send-message',{us: data.us, mes: data.mes});
		});

		





		socket.on('create-room', function(user){
			
			userName.push(user);

			if(room.users.length < 2) {
				users.push({
					userId: socket.id
				});
				socket.join(room.roomId);

			} else {
				
				socket.to(room.roomId).emit('room-has-Create');
				
				
				console.log(room);
				users = [{userId: socket.id}];
				room = {
					roomId : shortid.generate(),
					users: users
				};
				socket.join(room.roomId);
			}
			console.log(userName);
			console.log(room);
			// console.log(room.users.length);
			// console.log(socket.adapter.rooms);

		});





		// console.log(socket.adapter.rooms);
	});



//................................................
var currentUser = [];

app.get('/', function(req, res)  {
	res.render('login');
});
app.get('/waitingpage',authMiddleware.requireAuthen, function(req , res) {
	res.cookie('room' , room.roomId);
	res.render('wordexplain');
});
app.get('/chat',authMiddleware.requireAuthen, function(req, res) {
	res.render('chat'); 
});
app.get('/index',authMiddleware.requireAuthen, function(req, res) {
	res.render('index');

});

app.get('/test', function(req, res) {
	res.render('test');
});
// fb route
app.get('/auth/fb', passport.authenticate('facebook', {scope:['email']}));


//chuyen huong ve index

app.get('/auth/fb/cb', passport.authenticate('facebook', {
	failureRedirect: '/'}), 
	function(req, res) {
		for(var user of currentUser) {
			res.cookie('userid', user._json.id);
			res.cookie('username',user._json.name);	
		}
		res.redirect('/index');
	}
 );

app.use('/assets', express.static(path.join(__dirname, 'public')));

server.listen(port, function() {
	console.log('listen server port' +port);
});

passport.use(new passportfb(
	{
		clientID: "147792326172060",
		clientSecret: "af38f25b7a2d0760e2d2ed93ad8b4b80",
		callbackURL: "https://35cfeaba.ngrok.io/auth/fb/cb",
		profileFields: ['email','displayName']
	},
	(accessToken, refreshToken, profile, done) => {
		// console.log(profile);
		User.findOne({id: profile._json.id}, (err, user) => {
			if(err) return done(err);
			if(user) return done(null, user);
			const newUser = new User({
				id: profile._json.id,
				name: profile._json.name,
				email: profile._json.email
			});
			newUser.save((err)=>{
				return done(null, newUser);
			});
			
		});
		currentUser.push(profile);
	}
));
passport.serializeUser((user, done)=>{
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({id}, function (err, user) {
    done(err, user);
  });
});

