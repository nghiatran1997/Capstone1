var express = require('express');
var io = require('socket.io');
const shortid = require('shortid');


module.exports.io = function(server){


	var users = [];

	var room = {
		roomId : shortid.generate(),
		users: users
	};


	io(server).on("connection", (socket)=> {
		console.log('co nguoi dang nhap'+ socket.id);			

		socket.on('disconnect', function() {
			console.log('da ngat ket noi'+ socket.id);
			socket.broadcast.emit('player-disconected', "some one disconnect");
		});

		socket.on('send-message', function(data) {
			console.log(data);
			socket.broadcast.emit('server-send-message',"server:" +data);
		});
	
		socket.on('create-room', function(){
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
			console.log(room);
			console.log(room.users.length);
			// console.log(socket.adapter.rooms);

		});				
		// console.log(socket.adapter.rooms);
	});

}