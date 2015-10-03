/**
 * Blue
 * 2015-02-20 11:46:13
 */

(function (root) {


/**
 * 清除数组内指定元素
 */
function arrayClean(arr, deleteV) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == deleteV) {           
      arr.splice(i, 1);
      i--;  
    }
  } 
  return arr;
}


function cache_create (dir, filename, content, callback) {

  fs.writeFile(dir+'/'+filename+'.cache', content, function (err) {
    callback(err)
  })

}

function cache_read (dir, filename, callback) {
  fs.readFile(dir+'/'+filename+'.cache', 'UTF-8', function (err, data) {

    if (err) {
      callback("CACHE_ERROR")
    } else {
      callback(false, JSON.parse(data))
    }

  })

}

function cache_update (dir, filename, content, callback) {

  fs.writeFile(dir+'/'+filename+'.cache', content, function (err) {
    callback(err)
  })

}

function cache_delete (dir, filename, callback) {

  fs.unlink(dir+'/'+filename+'.cache', function (err) {
    callback(err)
  })

}

function file_lock (dir, filename) {

}

function file_unlock (dir, filename) {

}

function dir_create (dir) {

}


function md5(data) {
   var md5 = require('crypto').createHash('md5');
   md5.update(data);
   return md5.digest('hex');
}


function sha1(data) {
   var sha1 = require('crypto').createHash('sha1');
   sha1.update(data);
   return sha1.digest('hex');
}




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



function oauth (argument) {
  // body...
}



function open (config) {
  
  // 实现方式1
  // var blue_pkg_arr = config.blue_pkg_arr
  // for (var i = 0; i < blue_pkg_arr.length; i++) {
  //   var a = require([blue_pkg_path, blue_pkg_arr[i]].join(''))
  //   define(a.uri, a.callback)
  // };

  var fileList = []

  // 实现方式2
  // function walk(path){  // 广度优先 
  //   var dirList = fs.readdirSync(path);

  //   dirList.forEach(function(item){
  //     if(fs.statSync(path + '/' + item).isFile()){
  //         fileList.push(path + '/' + item);
  //     }
  //   });

  //   dirList.forEach(function(item){
  //     if(fs.statSync(path + '/' + item).isDirectory()){
  //         walk(path + '/' + item);
  //     }
  //   });
  // }

  function walk2(path){   // 深度优先
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item){
      if(fs.statSync(path + '/' + item).isDirectory()){
        walk2(path + '/' + item);
      }else{

        if (/.+\.js/.test(item)) {
          fileList.push(path + '/' + item);
        };

      }
    });
  }

  walk2(modules_dir)


  for (var i = 0; i < fileList.length; i++) {
    var a = require(fileList[i])

    if (typeof a.uri === "string" && typeof a.callback === 'function') {
      define(a.uri, a.callback)

    };

  };

  debug()

}



/**
 * 排序算法
 */





/**
 * 一维数组排序
 * 2014-07-01 20:37:59
 */
function sort(array, sorttype) {
 
  function fn(a, b){
    return a > b;
  }; 

  for(var i=0; i<array.length; i++){
    for(var j=i; j<array.length; j++){
      if(fn(array[i], array[j]) > 0){
        var t = array[i]; 
        array[i] = array[j]; 
        array[j] = t; 
      } 
    } 
  }

  return array; 

}




function validator (type, value) {

  var dataType = {
    "nickname": {
      regex: /^[\u4e00-\u9fa5_a-zA-Z0-9]{8,16}$/
    },

    "nicename": {
      regex: /^[a-zA-Z]{1}[a-zA-Z0-9_]{5,15}$/
    },

    "password": {
      regex: /^[0-9A-Za-z_-]{8,20}$/
    },

    "email": {
      regex: /^email$/
    },

    "phone": {
      regex: /^[0-9]{11}$/
    },

    "gender": {
      regex: /^[0-9]{1}$/
    },

    "region": {
      regex: /^[0-9]{3}$/
    },

    "address": {
      regex: /^[\.]{0,280}$/
    },

    "date": {
      regex: /^[1-9]{1}[0-9]{9}$/
    }

  }

  if (typeof dataType[type].regex == 'undefined') {
    return dataType[type].validator(value)
  } else {
    return dataType[type].regex.test(value)
  }


}

function wrap_req (req) {

  var url = require('url')
  var formidable  = require('formidable')
  var querystring = require('querystring')

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
      var parseData = {
        file_stack: []
      }

      /**
       * 缓存目录
       */
      form.uploadDir = __dirname

      form.on('progress', function(bytesReceived, bytesExpected) {

      })

      .on('field', function(field, value) {
        req.searches[field] = value
      })

      .on('file', function(file, value) {
        parseData.file_stack.push(file, value)
      })

      .on('aborted', function() {
        callback('aborted')
      })

      .on('error', function(err) {
        callback('error')
      })

      .on('end', function() {
        callback(false, parseData)
      })

      form.parse(this)

    } else {

      callback('method_error')

    }

  }


  return req
}
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
function appFactory () {



  function createApp (config) {

    var app = {}


    return app

  }

  return createApp

}

function serverFactory () {

  /**
   * 依赖管理
   */
  var http  = require('http')
  var url   = require('url')
  var mysql = require('mysql')
  var util  = require('util')
  var fs    = require('fs')

  function createServer (config) {

    /**
     * private
     */
    var apis = {}
    var api_stack = []
    var server_error = {}
    var pools = {}
    var config = {
      apis_errors: {},
      uri_prefix: config.uri_prefix || "",
      error: config.error || {},
      cache_dir: config.cache_dir || __dirname+'/../blue_cache',
      temp_dir: config.temp_dir || __dirname+'/../blue_cache/temp',
    }

    /**
     * public
     */
    var server = {

      listen: function (port) {
        //创建服务器
        var trueServer = http.createServer(function (req, res) {

          var req = wrap_req(req);
          var res = wrap_res(res);

          /**
           * 预处理， 比如如果前缀不是'/api'就返回空
           * 然后开始根据uri查找出对应的api, 并调用
           * 找不到的话返回空
           */

           
          if ( '/'+req.pathname_arr[0] != config.uri_prefix) { 

            res.sendError('NOT_FOUND')

          } else {

            var api = findApi(req.pathname)

            if (api && api.method == req.method) {

              api.callback(req, res, next)

            } else {

              res.sendError("NOT_FOUND")

            }


          }


          function findApi (pathname) {

            var api = false
            for (var i = 0; i < api_stack.length; i++) {


              if (api_stack[i].uri.test(pathname.substr(config.uri_prefix.length))) {
                api = api_stack[i]
                break;
              }
            }
            return api;

          }

          /**
           * next
           */
          function next () {

          } // end next

        })

        trueServer.listen(port); //监听服务器端口
        console.log('SUCCESS: 启动成功, 端口: '+port)
      }, // end listen


      use: function(method, uri, callback) {

        if (typeof uri == 'string') {

          var uri_stack = arrayClean(uri.split('/'), '')
          uri = array_to_regexp(uri_stack)
          api_push()

        } else if (uri instanceof Array) {
          
          uri = array_to_regexp(uri)
          api_push()

        } else if (uri instanceof RegExp) {
          
          api_push()

        } else {

          return false
        
        }

        function array_to_regexp (uri_stack) {
          return new RegExp('^\\\/'+uri_stack.join('\\\/')+'$')
        }

        function api_push () {
          api_stack.push({
            "method": method,
            "uri": uri,
            "callback": callback,
          })
        }

      },

      get_config: function() {
        return config
      }
      
    } // end server

    return server 

  }

  return {
    createServer: createServer,
    md5: md5,
    sha1: sha1,
    http_post: http_post,
  }

}



  if (typeof define === 'function' && define.amd) {

    define([''], appFactory);

  } else if (typeof exports === 'object') {
    module.exports = serverFactory();


  } else {
    root.blue = appFactory();

  }
  
}(this));

