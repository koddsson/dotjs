var api_key = 'b6375dc76e0ef9a1ce4e5c8b7a470c94';

var getUrl = function(photo, callback) {
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + api_key + '&photo_id=' + photo.id + '&format=json&nojsoncallback=1';
  $.getJSON(url).done(function(data) {
    data.sizes.size.forEach(function(img) {
      if (img.label === 'Large') {
        callback(img.source); 
      }
    });
  });
};

$('.login-main-header').css('visibility', 'hidden');
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=' + api_key + '&per_page=30&page=1&format=json&nojsoncallback=1')
  .done(function(data) {
    var random = Math.floor(Math.random() * 29);
    getUrl(data.photos.photo[random], function(url) {
      var property = 'url("' + url + '") repeat-x fixed 50% 0px transparent';
      $('.login-background').css('background', property);
      $('.login-background').css('background-size', '100%');
    });
  });
