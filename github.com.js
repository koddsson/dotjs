var stringToColour = function(str) {
    // str to hash
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));

    // int/hash to hex
    for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));
    return colour;
};

$('.timeline-comment-avatar, .avatar').each(function(_, avatar) {
  $(avatar).attr('src', 'http://tldr.is/holz.png')
           .css('background-color', stringToColour($(avatar).attr('alt')));
});

if($('[name=comment_and_close]').length === 1) {
  $('[name=comment_and_close]').before($('<button />')
    .html('LGTM')
    .attr('type', 'button')
    .attr('class', 'button')
    .click(function() {
      $.get('https://koddsson.github.io/LGTM/data.json', function(data) {
        var url = data[Math.floor((Math.random()* data.length )+1)].url;
        var field = $('#new_comment_field');
        field.val(field.val() + '\n\n![](' + url + ')');
      });
    })
  );
}

$.get('https://gist.githubusercontent.com/koddsson/0d4fc1735949e0822755/raw/2d095c5a304e71f5ae058926721aa9c2b1cf61ae/template.md', function(data) {
  $('#pull_request_body').val(data);
});

$('body').on('DOMNodeInserted', '#pull_request_body', function (e) {
  $.get('https://gist.githubusercontent.com/koddsson/0d4fc1735949e0822755/raw/2d095c5a304e71f5ae058926721aa9c2b1cf61ae/template.md', function(data) {
    $(event.target).val(data);
  });
});
