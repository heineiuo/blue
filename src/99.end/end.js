

  if (typeof define === 'function' && define.amd) {

    define([''], appFactory);

  } else if (typeof exports === 'object') {
    module.exports = serverFactory();


  } else {
    root.blue = appFactory();

  }
  
}(this));

