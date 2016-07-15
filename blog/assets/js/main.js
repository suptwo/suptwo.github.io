$.ajax({
  type:'GET',
  url:'assets/data/main.data',
  dataType:'json', 
  success:function(data) {
    var html = [];
    for (var i = 0; i < data.list.length; i++) {
      var value = data.list[i];
      html.push('<a href="./detail.html?detail=' + value.detail + '" class="article-list">\
        <h3 class="article-title"><i class="type-icon">' + value.type + '</i>' + value.title + '</h3>\
        <p class="article-des">' + value.des + '</p>\
        <p><time>' + value.time + '</time></p>\
      </a>');
    }
    $('.home-bd').append(html.join(''));
  }
});