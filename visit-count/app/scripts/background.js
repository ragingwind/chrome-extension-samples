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
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var favicon = tabs[0].favIconUrl;
    chrome.history.search({text: tabs[0].url, maxResults: 1}, function (result) {
      console.log(favicon, result[0])
      result[0] && chrome.browserAction.setBadgeText({ text: result[0].visitCount.toString() });
      favicon && chrome.browserAction.setIcon({ path: favicon });
    });
  });
}
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  update();
});

chrome.tabs.onActivated.addListener(function( activeInfo ) {
  update();
});
