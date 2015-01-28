
function md5(data) {
   var md5 = require('crypto').createHash('md5');
   md5.update(data);
   return md5.digest('hex');
}


function sha1(data) {
   var sha1 = require('crypto').createHash('sha1');
   sha1.update(data);
   return sha1.digest('hex');
}


exports.md5 = md5
exports.sha1 = sha1