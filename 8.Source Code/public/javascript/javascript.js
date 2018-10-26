document.addEventListener('DOMContentLoaded', function() {

    //Initialize Firebase
    window.fbAsyncInit = function() {
        window.FB.init({
            appId: '147792326172060',
            cookie: true,
            xfbml: true,
            version: 'v3.1'
        });

        FB.AppEvents.logPageView();


    };
    const firebase = require('firebase/app'); // Required for side-effects
    require("firebase/firestore");
    // firebase.initializeApp({
    //     apiKey: 'AIzaSyD0w9tdWNXsfoQV9MsuQRmIJipDSIZS2po',
    //     authDomain: 'engs4you.firebaseapp.com',
    //     projectId: 'engs4you'
    // });
    var config = {
        apiKey: "AIzaSyD0w9tdWNXsfoQV9MsuQRmIJipDSIZS2po",
        authDomain: "engs4you.firebaseapp.com",
        databaseURL: "https://engs4you.firebaseio.com",
        projectId: "engs4you",
        storageBucket: "engs4you.appspot.com",
        messagingSenderId: "190175477827"
    };
    firebase.initializeApp(config);
    var db = firebase.firestore();
    var messageList = document.getElementById('chat-box');
    var messageCollection = db.collection('message');
    var contentInput = document.getElementById('content-input');
    var chatBtn = document.getElementById('chat-btn');


    contentInput.addEventListener("keyup", function(event) {
        if (event.keyCode == 13 || event.which == 13) {
            addMessage();
        }
    });
    chatBtn.addEventListener("click", addMessage);

    function addMessage() {
        var value = contentInput.value;
        messageCollection.add({
            content: value.trim(),
            timeCreate: firebase.firestore.FieldValue.serverTimestamp()
        });
        contentInput.value = '';
    }

    messageCollection.orderBy('timeCreate').onSnapshot(function(snap) {
        messageList.innerHTML = '';
        snap.forEach(function(item) {
            var data = item.data();
            console.log(data);
            var container = document.createElement("div");
            container.className = 'me';
            container.innerHTML = '<div class="chat-content">' + data.content + '</div>';
            messageList.appendChild(container);
        });
    });

    // var container = document.querySelector(".container");
    // container.style.height = `${window.innerHeight}px`;
    // window.addEventListener("resize", function() {
    //   container.style.height = `${window.innerHeight}px`;
    // });

    // var middleContent = document.querySelector(".middle-content");
    // middleContent.addEventListener("scroll", function() {
    //   topDropdownContent.classList.remove("active");
    // });
   
    // function statusChangeCallback(response) {
    //     console.log('statusChangeCallback');
    //     console.log(response);
    //     // The response object is returned with a status field that lets the
    //     // app know the current login status of the person.
    //     // Full docs on the response object can be found in the documentation
    //     // for FB.getLoginStatus().
    //     if (response.status === 'connected') {
    //         cosole.log('you are login');
    //         testAPI();
    //     } else {
    //         // The person is not logged into your app or we are unable to tell.
    //         document.getElementById('status').innerHTML = 'Please log ' +
    //             'into this app.';
    //     }
    // }


    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.1&appId=147792326172060&autoLogAppEvents=1";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // window.FB.getLoginStatus(function(response) {
    //     statusChangeCallback(response);
    // });

    // // {
    // //     status: 'connected',
    // //     authResponse: {
    // //         accessToken: '...',
    // //         expiresIn: '...',
    // //         signedRequest: '...',
    // //         userID: '...'
    // //     }
    // // }

    // function checkLoginState() {
    //     window.FB.getLoginStatus(function(response) {
    //         statusChangeCallback(response);
    //     });
    // }

});