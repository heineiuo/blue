

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
