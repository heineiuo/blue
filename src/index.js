

/**
 * 依赖管理
 */
var http  = require('http')
var url   = require('url')
var mysql = require('mysql')
var util  = require('util')
var fs    = require('fs')
var querystring = require('querystring')
var formidable  = require('formidable')


/**
 * 私有变量 固定值
 */
var lib_dir     = __dirname+'/lib' //  固定地址
var server, pool
var states      = {}
var states_errors = {}

/**
 * 私有变量 通过config定义
 */
var uri_prefix  = ""
var port        = 8000 
var error       = {} 
var cache_dir   = __dirname+'/../blue_cache' 
var temp_dir    = __dirname+'/../blue_cache/temp'
var modules_dir = __dirname+'/../blue_modules'
var tpl_dir     = __dirname+'/../blue_templates'

/**
 * debug
 */
function debug (argument) {

  if (states_errors.length) {
    console.log("Warning: Here are some wrong with your states URIs!")
    console.log(states_errors)
  }

}


/**
 * define
 */
function define (uri, callback) {

  if ( typeof states.uri === 'undefined') {
    states[uri] = callback
  } else {
    states_errors.push(uri)
  }

}


function open (config) {
  uri_prefix = config.uri_prefix || uri_prefix
  port       = config.port       || port
  error      = config.error      || error
  cache_dir  = config.cache_dir  || cache_dir
  temp_dir   = config.temp_dir   || temp_dir
  modules_dir= config.modules_dir|| modules_dir
  tpl_dir    = config.tpl_dir    || tpl_dir
  
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

  pool  = mysql.createPool(config.db)
  server = http.createServer(route) //创建服务器
  server.listen(port); //监听服务器端口

  console.log('SUCCESS: 启动成功, 端口: '+port)

}


function getlib (libname) {
  return lib_dir+'/'+libname
}

/**
 * route
 */
function route (req, res) {

  var method   = req.method.toLowerCase()
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

  var $route   = {
    pool: pool,
    cache_dir: cache_dir,
    temp_dir: temp_dir,
    files: {},
    searches: searches,
    pathname_arr: pathname_arr,
    method: method,
    cookies: cookies,
    ip: ip,
    type: 'json',
    data: {},
    http_status_code: 200,
    parse: parse,
    onError: onError,
    end: onEnd,
    getlib: getlib
  }

  if ( '/'+$route.pathname_arr[0] != uri_prefix) {

    // fs.readFile(tpl_dir+'/index.html', 'UTF-8', function (err, data) {

    //   if (err) {
    //     console.log(err)
    //     $route.onError("TEMPLATES_SYS_ERR")
    //   } else {
    //     $route.type = "html"
    //     $route.data = data
    //     $route.end()
    //   }

    // })


    $route.onError('NOT_FOUND')
  

  } else if (typeof states[pathname] == 'undefined') {
    $route.onError("NOT_FOUND")
  } else {
    $route.state = states[pathname]
    $route.parse()
  }

  function parse () {
    switch(method){
      case 'get':

        $route.state($route)
        break;

      case 'post':

        var form = new formidable.IncomingForm()

        /**
         * 缓存目录
         */
        form.uploadDir = temp_dir

        form.on('progress', function(bytesReceived, bytesExpected) {

        })

        .on('field', function(field, value) {
          $route.searches[field] = value
        })

        .on('file', function(file, value) {
          $route.files[file] = value
        })

        .on('aborted', function() {
          $route.onError("UNEXCEPT_ERROR")
        })

        .on('error', function(err) {
          $route.onError("UNEXCEPT_ERROR")
        })

        .on('end', function() {
          $route.state($route)
        })

        form.parse(req)

        break;

      default:

        $route.onError("NOT_FOUND")

        break;
    }

  }

  function onError (code) {

    $route.data = {"error": code}
    $route.type = 'json'
    $route.http_status_code = 
      (error[code] || {"http_status_code": 500} )["http_status_code"]
    $route.end()
  }

  function onEnd () {

    var data = $route.data
    var type = $route.type
    var http_status_code = $route.http_status_code


    switch(type){

      case 'json':
        data = (typeof data == 'object')?data:{error: "UNEXCEPT_ERROR"}
        data = JSON.stringify(data)
        typed = 'application/json'
        break;

      case 'plain':
        data = (typeof data == 'string')?data:String(data)
        typed = 'text/plain'
        break;

      case 'script':
        data = (typeof data == 'string')?data:String(data)
        typed = 'application/javascript'
        break;

      case 'html':
        data = (typeof data =='string')?data:'<h1>404</h1>'
        typed = 'text/html'
        break;

      default: 
        data = '';
        typed = 'text/plain'
        break;
    }

    res.writeHead(200, {
      'Content-Type': [typed, ';charset=UTF-8'].join(''),
      'Access-Control-Allow-Origin': '*'
    })

    res.write(data)
    res.end()

  }

}

exports.open   = open










