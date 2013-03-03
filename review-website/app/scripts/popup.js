var bg = chrome.extension.getBackgroundPage();

var showSignInButton = function () {
  $('.signin-outter').show().click(function () {
    bg.authorize();
  });
};

var hideSignInButton = function () {
  $('.signin-outter').hide();
}

var showInputBox = function () {
  $('.description').show().keypress(function (event) {
    var keycode = (event.keyCode || event.which);

    if(keycode == '13') {
      var text = $('.description').val();
      var rating = text.match(/\+(\d*)/);
      rating = rating ? rating[1] : 0;

      bg.postReview({
        text: text.replace('+' + rating, ''),
        rating: rating
      }, showReviewList);
    }

    event.stopPropagation();
  });

  showReviewList();

};

var showReviewList = function(res) {
  bg.getList(function(res) {
    var $ul = $('.review-list ul');
    var tmpl = '<li><div>' +
      '<span class="text">{{text}}</span> ' +
      '<span class="rating">+{{rating}}</span>' +
      '</div><div>' +
      '<span class="name"><a href="{{url}}">{{name}}</a></span> ' +
      '</div></li>';

    $ul.children().remove();

    res.items.forEach(function (i) {
      var item = tmpl.replace('{{text}}', i.result.text)
                     .replace('{{rating}}', i.result.reviewRating.ratingValue)
                     .replace('{{name}}', i.result.name.substring(0, 20))
                     .replace('{{url}}', i.result.url);
      $ul.append(item);
    })

    $('.review-list ul li a').click( function () {
      chrome.tabs.create({url: $(this).attr('href')});
    });

    $ul.show();
  });
}

$(document).ready(function () {
  bg.hasAuthorized() ? showInputBox() : showSignInButton();
});
