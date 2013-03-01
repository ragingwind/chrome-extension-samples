// CHROME EXTENSION BACKGROUND.JS

'use strict';

var cartoons = [
  'http://cartoon.media.daum.net/webtoon/viewer/',
  'http://comic.naver.com/webtoon/detail'
];

var client = {
  client_id: '294448279976-2rpnlgk5vervcaei49trtncbf562npc0.apps.googleusercontent.com',
  client_secret: 'aYFkLixVwZKia1MWJoaWekOv',
};

var review = this.review = new Review(client);

function showPageAction( tabId, changeInfo, tab ) {
  var show = cartoons.every(function (url) {
    return tab.url.indexOf(url) < 0;
  });

  show || chrome.pageAction.show(tabId);
}

chrome.tabs.onUpdated.addListener( showPageAction );

var handler = {
  post: function(port, event) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      event.url = tabs[0].url;
      event.title = tabs[0].title;

      var handler = function(xhr, error, status) {
        port.postMessage({
          type: 'post',
          error: error
        });
      };

      review.post(event).done(handler).fail(handler);
    });
  },

  hasAuthorize: function(port, msg) {
    port.postMessage({
      type: 'hasAuthorize',
      hasAuthorized: review.hasAuthorized()
    });
  },

  authorize: function(port, msg) {
    review.authorize(function () {});
  },

  list: function (port, msg) {
    review.list().done(function (res) {
      port.postMessage({
        type:'list',
        result: res
      });
    });
  }
};

this.revoke = function(done) {
  review.clear().fail(function () {
    review = undefined;
    review = new Review(client);
    done();
  });
};

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    handler[msg.type](port, msg);
  });
});
