


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

