

function http_post(data, options, callback) {

  // var data = {
  //   "module": "account",
  //   "action": "location"
  // }
  // var options = {
  //   hostname: '127.0.0.1',
  //   port: 8000,
  //   path: '/cache',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type':'application/x-www-form-urlencoded',
  //     // 'Content-Type':'application/json;charset=UTF-8',
  //     // 'Content-Length': data.length
  //   } 
  // };

  var data = querystring.stringify(data)
  var options = options
  options.method = 'POST'

  // options.headers['Content-Length'] = data.length

  var isError = false
  
  var req = http.request(options, function (res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      
      // console.log('BODY: ' + chunk);
      chunk = JSON.parse(chunk)
      callback(isError, chunk)

    })
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);

    isError = true
    callback(isError)
  });

  // write data to request body
  req.write(data)

  req.end();

}





function get(data, options, callback) {
  var isError = false

  var data = querystring.stringify(data)
  var options = options
  options.path += "?" + data


  console.log(options.path)

  options.method = 'GET'
  // options.headers['Content-Length'] = data.length


  var req = http.request(options, function (res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      
      // console.log('BODY: ' + chunk);
      // chunk = JSON.parse(chunk)
      callback(isError, chunk)

    })
  })

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);

    isError = true
    callback(isError)
    
  })

  req.end();

}
