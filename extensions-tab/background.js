chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    url: "chrome://extensions",
    pinned: true
  });
});

function showPage(tabId, changeInfo, tab) {
  tab.url && tab.url.indexOf('chrome://') < 0 && chrome.pageAction.show(tabId);
};

chrome.tabs.onUpdated.addListener(showPage);
