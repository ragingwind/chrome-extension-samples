function showPageAction(tabId, changeInfo, tab) {
  chrome.pageAction.show(tabId);
}

chrome.tabs.onUpdated.addListener(showPageAction);

chrome.pageAction.onClicked.addListener(function( tab ) {
  chrome.tabs.executeScript(tab.id, {code: 'changeImagesToGrey();'});
});
