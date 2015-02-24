function wrap_req (req) {

  var url = require('url')

  var method = req.method.toLowerCase()
  var pathname = url.parse(req.url).pathname
  var pathname_arr = pathname.substr(1).split('/')
  var search   = url.parse(req.url).search; // req.headers.referer
  var searches = search != null?querystring.parse(search.substring(1)):{}
  var ip       = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress || 
    req.connection.socket.remoteAddress

  var cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
      var parts = Cookie.split('=');
      cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
  });


  req.method = method
  req.pathname = pathname
  req.pathname_arr = pathname_arr
  req.search = search
  req.searches = searches
  req.ip = ip
  req.cookies = cookies


  req.parse = function (callback) {

    if (method == 'post') {

      var form = new formidable.IncomingForm()
      var result = {
        "searches": {},
        "files": []
      }

      /**
       * 缓存目录
       */
      form.uploadDir = temp_dir

      form.on('progress', function(bytesReceived, bytesExpected) {

      })

      .on('field', function(field, value) {
        result.searches[field] = value
      })

      .on('file', function(file, value) {
        result.files.push(file, value)
      })

      .on('aborted', function() {
        result.error = "UNEXCEPT_ERROR"
      })

      .on('error', function(err) {
        result.error = "UNEXCEPT_ERROR"
      })

      .on('end', function() {
        callback(result)
      })

      form.parse(this)

    } else {

      callback({error: "ONLY_POST"})

    }

  }


  return req
}