

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
