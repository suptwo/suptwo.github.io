var detail = getQueryString('detail');
$.ajax({
  type:'GET',
  url:'../assets/data/' + detail + '.data',
  dataType:'text', 
  success:function(data) {
    $('.detail').html(data);
  }
});




















function getQueryString(name) {                  // 获取url参数
  'use strict';
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = decodeURIComponent(location.search).substring(1).match(reg);
  if (r != null) {
    return r[2];
  }
  return null;
}