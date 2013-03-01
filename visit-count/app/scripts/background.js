// CHROME EXTENSION BACKGROUND.JS

'use strict';

// RUNTIME.ONINSTALLED
chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.history.onVisited.addListener(function (result) {
  chrome.browserAction.setBadgeText({ text: result.visitCount.toString() });
});

function update() {
  // query activated tab.
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var favicon = tabs[0].favIconUrl;

    chrome.history.search({text: tabs[0].url, maxResults: 1}, function (result) {
      // update visit count.
      result[0] && chrome.browserAction.setBadgeText({ text: result[0].visitCount.toString() });

      // replace badge icon to favicon.
      favicon && chrome.browserAction.setIcon({ path: favicon });

      console.log(favicon, result[0])
    });

  });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  update();
});

chrome.tabs.onActivated.addListener(function( activeInfo ) {
  update();
});
