// CHROME EXTENSION BACKGROUND.JS

'use strict';

// RUNTIME.ONINSTALLED
chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

function showPageAction( tabId, changeInfo, tab ) {
    if (tab.url.indexOf( 'plus.google.com' ) >= 0) {
        chrome.pageAction.show( tabId );
    }
}

chrome.tabs.onUpdated.addListener( showPageAction );

chrome.pageAction.onClicked.addListener(function( tab ) {
    chrome.tabs.executeScript(tab.id, { code: 'greyScaleImage();' });
});
