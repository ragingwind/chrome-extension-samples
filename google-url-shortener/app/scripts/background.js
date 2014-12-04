'use strict';

// shorten url passed from tab info. shorten request is post to
// google apis with the url that put into 'longURL' param
function shorturl(url, cb) {
  var http = new XMLHttpRequest();
  var params = '{"longUrl": "' + url + '"}';

  http.open('POST', 'https://www.googleapis.com/urlshortener/v1/url', true);
  http.setRequestHeader('Content-type', 'application/json');

  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      cb({
        status: http.status,
        shortUrl: JSON.parse(http.responseText).id
      })

    }
  }
  http.send(params);
};

// make a connection with popup page. port params should be included
// name of port
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name !== 'shorten') {
    console.error('Invalid port has found', port);
    return;
  }

  port.onMessage.addListener(function(msg) {
    shorturl(msg.url, function(res) {
      port.postMessage(res);
    });
  });
});
