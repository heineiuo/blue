





var validator = {
  "email"    : /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\\.[a-zA-Z0-9_-])+/,
  "phone"    : /^(([0-9]{2,3})|([0-9]{3}-))?((0[0-9]{2,3})|0[0-9]{2,3}-)?[1-9][0-9]{6,7}(-[0-9]{1,4})?$/,
  "mobile"   : /^1[0-9]{10}$/,
  "url"      : /^http:(\/){2}[A-Za-z0-9]+.[A-Za-z0-9]+[\/=?%-&_~`@\\[\\]\':+!]*([^<>\"\"])*$/,
  "currency" : /^[0-9]+(\\.[0-9]+)?$/,
  "number"   : /^[0-9]+$/,
  "zip"      : /^[0-9][0-9]{5}$/,
  "qq"       : /^[1-9][0-9]{4,8}$/,
  "integer"  : /^[-+]?[0-9]+$/,
  "double"   : /^[-+]?[0-9]+(\\.[0-9]+)?$/,
  "english"  : /^[A-Za-z]+$/,
  "chinese"  : /^[\x80-\xff]+$/,
  "username" : /^[\\w]{3,}$/,
  "nochinese": /^[A-Za-z0-9_-]+$/,
  "nicename" : /^[a-zA-Z][a-zA-Z0-9]{5,23}$/,
  "password" : /^[a-zA-Z0-9]{8,24}$/,

  "integerpositive": /^[+]?[0-9]+$/,
  "doublepositive" : /^[+]?[0-9]+(\\.[0-9]+)?$/
}


function test(needTest, callback) {

  for (var i = 0; i < needTest.length; i++) {
    var type = needTest[i]['type']
    var val = needTest[i]['val']

    if (!validator[type].test(val)) {
      
      callback(1)
      return false

    };

  };


  callback(0)
}


function test2 (name, val) {
  if (typeof validator[name] === 'undefined') {
    return false
  };
  return validator[name].test(val)

}


function validator (name, value) {

}

exports.test2 = test2
exports.test = test
exports.validator = validator





