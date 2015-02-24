#BLUE.js

A JSON API Framework for NODE.js.

Official Website: [http://blue.heineiuo.com](http://blue.heineiuo.com)
version: 0.1.0

---

##Get Started

1.Use<code>npm install blue-hei</code>.
2.Create your app.js, and code like: 
    

    var blue = require('blue');
    var config = {}
    var server = blue.createServer(config);
  
    server.use('get', '/api/test', function(res, req, next){
  
      next()
    });
  
    server.listen(8080);
    

3.Open browser and goto <code>http://127.0.0.1:8080/api/test</code>.


##Public Functions

###server.use(method, uri, callback)
The main way to write an API.

###server.listen(port)
listen port.

###blue.get_req_params(req)
parse <code>req</code>object.

##Private Functions

###route
Use <code>http</code> to create <code>server</code>,
When <code>server</code>get a request, callback a function with 2 arguments, <code>req</code>and <code>res</code>,

at this function, create a <code>next</code>function,
and use <code>route</code>function to find right API

In <code>route</code> function, 

##Update



##Feature

