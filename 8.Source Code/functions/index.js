const functions = require('firebase-functions');

// document.addEventListener('DOMContentLoaded', function() {
//         // -----------------------------------------------------------
//         var firebase = require("firebase");        // Required for side-effects
//         require("firebase/firestore");
//         firebase.initializeApp({
//         apiKey: 'AIzaSyD0w9tdWNXsfoQV9MsuQRmIJipDSIZS2po',
//         authDomain: 'engs4you.firebaseapp.com',
//          projectId: 'engs4you'
//         });
//         var db = firebase.firestore();
//         var messageList = document.getElementById('chat-box');
//         var messageCollection = db.collection('message');

//         messageCollection.orderBy("createdAt").onSnapshot(function(snap) {
//             messageList.innerHTML = "";
//             snap.forEach(function(item) {
//                 var data = item.data();
//                 console.log(data);
//                 var container = document.createElement("div");
//                 container.className = "me";
//                 container.innerHTML = `<div class="chat-content">${data.content}</div>`;

//                 messageList.appendChild(container);
//             });
//         });
//     });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
 