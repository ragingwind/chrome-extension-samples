// CHROME EXTENSION BACKGROUND.JS

// RUNTIME.ONINSTALLED
chrome.runtime.onInstalled.addListener(function( details ) {
	console.log( 'previousVersion', details.previousVersion );
});

chrome.pageAction.onClicked.addListener(function( tab ) {
  chrome.tabs.create({ url: "chrome://extensions", pinned: true });
});

function showPage( tabId, changeInfo, tab ) {
  tab.url.indexOf( 'chrome://' ) < 0 && chrome.pageAction.show( tabId );
};

chrome.tabs.onUpdated.addListener( showPage );
