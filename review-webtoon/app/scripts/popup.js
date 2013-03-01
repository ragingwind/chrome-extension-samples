$(document).ready(function () {
  var port = chrome.extension.connect({name: "review"});

  var showSignInButton = function () {
    $('.signin-outter').show().click(function () {
      port.postMessage({type: "authorize"});
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

        chrome.extension.getBackgroundPage().console.log({
          text: text.replace('+' + rating, ''),
          rating: rating
        });

        port.postMessage({
          type: "post",
          text: text.replace('+' + rating, ''),
          rating: rating
        });
      }

      event.stopPropagation();
    });

    port.postMessage({type: "list"});
  };

  var showReviewList = function(msg) {
    var $ul = $('.review-list ul');
    var tmpl = '<li><div>' +
      '<span class="name"><a href="{{url}}">{{name}}</a></span> ' +
      '</div><div>' +
      '<span class="text">{{text}}</span> ' +
      '<span class="rating">+{{rating}}</span>' +
      '</div></li>';

    $ul.children().remove();

    msg.result.items.forEach(function (i) {
      var item = tmpl.replace('{{text}}', i.result.text)
                     .replace('{{rating}}', i.result.reviewRating.ratingValue)
                     .replace('{{name}}', i.result.name.substring(0, 20))
                     .replace('{{url}}', i.result.url);
      $ul.append(item);
    })

    $ul.show();
  }

  var handler = {
    hasAuthorize: function(msg) {
      msg.hasAuthorized ? showInputBox() : showSignInButton();
    },

    list: function(msg) {
      showReviewList(msg);
    },

    post: function(msg) {
      port.postMessage({type: "list"});
    }

  };

  port.onMessage.addListener(function(msg) {
    handler[msg.type](msg);
  });

  port.postMessage({type: "hasAuthorize"});

});
