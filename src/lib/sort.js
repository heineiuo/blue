/**
 * 排序算法
 */





/**
 * 一维数组排序
 * 2014-07-01 20:37:59
 */
function sort(array, sorttype) {
 
  function fn(a, b){
    return a > b;
  }; 

  for(var i=0; i<array.length; i++){
    for(var j=i; j<array.length; j++){
      if(fn(array[i], array[j]) > 0){
        var t = array[i]; 
        array[i] = array[j]; 
        array[j] = t; 
      } 
    } 
  }

  return array; 

}

exports.sort = sort