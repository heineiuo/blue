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
