'use strict';

// shorten request will be fired when page DOM has been loaded
document.addEventListener('DOMContentLoaded', function(event) {
  var queryOpts = {currentWindow: true, active: true};
  var port = chrome.runtime.connect({name: 'shorten'});

  // add listener for handling response message
  port.onMessage.addListener(function(res) {
    document.getElementById('url').innerText = res.status === 200 ? res.shortUrl : 'You\'ve got a failed';
  });

  chrome.tabs.query(queryOpts, function(tab) {
    port.postMessage({url: tab[0].url});
  });
});
