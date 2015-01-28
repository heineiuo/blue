/**
 * cache v0.0.1
 * @licence MIT LICENCE
 * @author heineiuo http://www.heineiuo.com
 * @copyright www.heineiuo.com
 * 2015-01-23 22:36:05
 */

(function (root, factory) {
  // if (typeof define === 'function' && define.amd) {
  //   define(factory);
  // } else if (typeof exports === 'object') {
    module.exports = factory();
  // } else {
  //   root.validator = factory();
  // }
}(this, function () {

  var fs = require('fs')

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

  var cache = {
    create: cache_create,
    read:   cache_read,
    update: cache_update,
    delete: cache_delete
  }
  
  return cache

}));