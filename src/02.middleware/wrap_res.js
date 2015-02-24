function wrap_res (res) {

  res.http_status_code = 200
  res.contentType = 'json'

  res.send = function (data) {

    var data = data || {}
    var contentType = this.contentType
    var http_status_code = this.http_status_code

    if (contentType == 'json' && typeof data == 'object') {
      data = JSON.stringify(data)
      typed = 'application/json'
    } else {
      data = String(data)
      typed = 'text/plain'
    }


    //'text/plain'
    //'application/javascript'
    //'text/html'
    //'application/json'
    //'text/plain'


    res.writeHead(200, {
      'Content-Type': [typed, ';charset=UTF-8'].join(''),
      'Access-Control-Allow-Origin': '*'
    })

    res.write(data)
    res.end()

  }

  res.sendError = function (error_code) {
    this.send({"error": error_code})
  }

  return res

}