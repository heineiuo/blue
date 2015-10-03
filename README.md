#BLUE.js

A JSON API Framework for NODE.js.

Official Website: [http://blue.heineiuo.com](http://blue.heineiuo.com)

version: 0.1.0

---

##Get Started

1.Use<code>npm install blue-hei</code>.

2.Create your app.js, and code like: 
    

    var blue = require('blue-hei');
    var config = {}
    var server = blue.createServer(config);
  
    server.use('get', '/api/test', function(req, res, next){
      res.send({"hello": "world"})
      next()
    });
  
    server.listen(8080);
    

3.Open browser and goto <code>http://127.0.0.1:8080/api/test</code>.


##Public Functions

###server.use(method, uri, callback)
The main way to write an API.

###server.listen(port)
listen port.

##Private Functions
##Update
##Feature

