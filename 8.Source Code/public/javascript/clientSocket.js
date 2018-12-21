var socket = io('https://35cfeaba.ngrok.io');

// var socket = io('https://e4us.herokuapp.com');

// var socket = io('http://localhost:5000/');

document.addEventListener('DOMContentLoaded', function() {
	
	var sendBtn = document.getElementById('chat-btn');
	var contentInput = document.getElementById('content-input');
	var messageList = document.getElementById('chat-box');
	var keyWordList = document.getElementById('key-word');
	var suggest	 = document.getElementById('suggest');

	var keywordFromServer = [];


	contentInput.addEventListener("keyup", function(event) {
        if (event.keyCode == 13 || event.which == 13) {
            addMessage();
        }
    });


	var room = getCookie('room');

	socket.emit('render-html');	


	sendBtn.addEventListener('click', addMessage);

	function addMessage(){
		var username = getCookie("username");
		var message = contentInput.value;
		var container = document.createElement("div");
            container.className = 'me';
            container.innerHTML = '<div class="chat-content">'+ message + '</div>';
            messageList.appendChild(container);
		socket.emit('send-message', {us: username, mes: message});
		contentInput.value = "";
	}

	socket.on('server-send-message', function(data) {
		var container = document.createElement("div");
            container.className = 'fr';
            container.innerHTML = '<div class="chat-content"><b>'+data.us+': </b>' + data.mes + '</div>';
            messageList.appendChild(container);
        $('.middle-content').animate({
        scrollTop: $('.middle-content')[0].scrollHeight
      }, 0);
	});

	socket.on('player-disconected', function(data){
		// alert(data);
		var container = document.createElement("div");
            container.className = 'sys';
            container.innerHTML = '<div class="chat-content">System: ' + data + '</div>';
            messageList.appendChild(container);
        $('.middle-content').animate({
        scrollTop: $('.middle-content')[0].scrollHeight
      }, 0);
	});


	socket.on('render-word', function(data) {
		// kiem tra neu role la anser thi k render
		for(let word of data){
			var container = document.createElement("div");
            	container.className = 'item';
            	container.innerHTML = '<button> ' + word.keywords +' + ' + word.scores + '</button>';
            keyWordList.appendChild(container);		
		}
	});



	socket.on('render-name', function(data) {
		var user =data;
		console.log(user);
		var teama = document.getElementsByClassName('teama')[0];
		var teamb = document.getElementsByClassName('teamb')[0];
		for(let i = 0 ; i < 2 ; i++){
			var container = document.createElement("div");
            	container.className = 'member';
            	container.innerHTML = ' <div class="member-name"><div class="icon"></div><div class="name"> ' + user[0] +
            	'</div></div><div class="rule"></div>';
            	teama.appendChild(container);
            	user.shift();
		}

	});


	socket.on('render', function(data) {

		var keywords = data.rd;
		keywords.map(function(item) {
			return keywordFromServer.push(item);
		});


		var username = data.us;
		for(let word of keywords){
			var container = document.createElement("div");
            	container.className = 'item';
            	container.innerHTML = '<button class="word" > ' + word.keywords +' + ' + word.scores + '</button>';
            keyWordList.appendChild(container);		
		}


		var teama = document.getElementsByClassName('teama')[0];
		var teamb = document.getElementsByClassName('teamb')[0];
		for(let i = 0 ; i < 2 ; i++){
			var container = document.createElement("div");
            	container.className = 'member';
            	container.innerHTML = ' <div class="member-name"><div class="icon"></div><div class="name"> ' + username[0] +
            	'</div></div><div class="rule"></div>';
            	teama.appendChild(container);
            	username.shift();
		}

	});

	console.log(keywordFromServer);

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


	function findObjectByKey(array, key, value) {
	    for (var i = 0; i < array.length; i++) {
	        if (array[i][key] === value) {
	            return array[i];
	        }
	    }
	    return null;
	}


	
	var keyWord = document.getElementsByClassName('word');
	keyWordList.addEventListener('click', function() {
	    for(let i =0 ;i < keyWord.length; i++) {
	    	
	        keyWord[i].onclick = function(e){
	        	suggest.innerHTML = "";
	  			e.currentTarget.className += " active";

	            var text = e.currentTarget.innerText;
	            var value = text.substring(0, text.lastIndexOf("+") - 1);
	            var keywordHasChoose = findObjectByKey(keywordFromServer,'keywords',value);
	            console.log(keywordHasChoose);
	            for(let j= 0 ; j < keywordHasChoose.nummberOfCharactor ; j++) {
	            	var container = document.createElement('div');
	            	container.className = "letter";
	            	container.innerText = "";
	            	suggest.appendChild(container);
	    
	            }
	            var typeOfKeyword = document.createElement('span');
	            	typeOfKeyword.className = "type";
	            	typeOfKeyword.innerText = " " +keywordHasChoose.type;
	            	suggest.appendChild(typeOfKeyword);
	            var scoresOfKeyword = document.createElement('span');
	            	scoresOfKeyword.className = "scores";
	            	scoresOfKeyword.innerText = " + "+keywordHasChoose.scores;
	            	suggest.appendChild(scoresOfKeyword);

	           	e.currentTarget.setAttribute('disabled','');
	 		};

	    }
	});	
	





    var time = 2 * 60,
    start = Date.now(),
    mins = document.getElementById('minutes'),
    secs = document.getElementById('seconds'),
    timer;

	function countdown() {
	  var timeleft = Math.max(0, time - (Date.now() - start) / 1000),
	      m = Math.floor(timeleft / 60),
	      s = Math.floor(timeleft % 60);
	  
	  mins.firstChild.nodeValue = m;
	  secs.firstChild.nodeValue = s;
	  
	  if( timeleft == 0) clearInterval(timer);
	};

	timer = setInterval(countdown, 600);

});