
      var express = require('express');
      var app = express();
      var port =3000;
      app.set('view engine', 'pug')
      app.set('views', './views')
      app.listen(port,function(){
            console.log('Listen port '+port);
      });