var socket = io('https://35cfeaba.ngrok.io');

// var socket = io('https://e4us.herokuapp.com');
// var socket = io('http://localhost:5000/');

document.addEventListener('DOMContentLoaded', function(){
	



	function googleTranslateElementInit() {
  		new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
	}






	var playBtn = document.getElementById('btn-play');

	
	playBtn.addEventListener('click',function(){
		var username = getCookie('username');	
		socket.emit('create-room', username);
	});
	socket.on('room-has-Create', ()=> {
		window.location.replace("https://35cfeaba.ngrok.io/chat");
	});

		function getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}
});