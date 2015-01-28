/**
 * 用户登陆和注册状态系统
 * @author Zhuang Zejin
 */

var fs = require('fs');

function isLogged ($route, callback) {

  var user_key = $route.searches.user_key || $route.cookies.user_key

  fs.readFile($route.cache_dir+'/user/'+user_key+'.cache', 'UTF-8', function (err, data) {

    if (err) {
      callback("CACHE_ERR")
    } else {

      var userinfo = JSON.parse(data)

      if ( Date.now()/1000 - Number(userinfo.keytime) < (30 * 86400) ) { // 有效

        callback(false, userinfo)

      } else { // 失效, 先删除文件，再删除记录

        fs.unlink($route.cache_dir+'/user/'+user_key+'.cache', function (err) {

          if (err) {
            callback("UNEXCEPT_ERROR")
          } else {

            $route.pool.getConnection(function (err, connection) {
              /**
               * 更新该条记录，清空key，清空有效期
               */ 
              var sql = "DELETE FROM user_token WHERE Id = "+connection.escape(data['Id'])

              connection.query(sql, function (err, result) {

                if (err) {
                  callback("SQL_ERR")
                } else {
                  callback("TOKEN_EXPIRED")
                }

              })

              connection.release();
                
            })


          } 

        }) // 删除文件成功

      } // END token fail


    } // END readfile success

  }); // END fs

}


function setSession ($route, result, callback) {

  var data = JSON.stringify(result)

  fs.writeFile($route.cache_dir+"/user/"+result.key+'.cache', data, function (err) {
    callback(err)
  })

}


function unsetSession ($route, key, callback) {

  fs.unlink($route.cache_dir+'/user/'+key+'.cache', function (err) {
    callback(err)
  })

}

exports.isLogged = isLogged;
exports.setSession = setSession;
exports.unsetSession = unsetSession;






