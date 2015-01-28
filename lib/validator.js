/**
 * validator v0.0.1
 * @licence MIT LICENCE
 * @author heineiuo http://www.heineiuo.com
 * @copyright www.heineiuo.com
 * 2015-01-23 20:41:08
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.validator = factory();
  }
}(this, function () {

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

  function validator (type, value) {

    if (typeof dataType[type] != 'undefined') {
      if (typeof dataType[type].regex == 'undefined') {
        return dataType[type].validator(value)
      } else {
        return dataType[type].regex.test(value)
      }
    } else {
      return false
    }


  }

  return validator

}));