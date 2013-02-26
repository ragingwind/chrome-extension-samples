// CHROME EXTENSION BACKGROUND.JS

'use strict';

var attachedTabs = {};
var version = "1.0";

// RUNTIME.ONINSTALLED
chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

function onEvent(debuggeeId, method) {
  var tabId = debuggeeId.tabId;
  if (method == "Debugger.paused") {
    attachedTabs[tabId] = "paused";
    chrome.pageAction.setIcon({tabId:tabId, path:"debuggerContinue.png"});
    chrome.pageAction.setTitle({tabId:tabId, title:"Resume JavaScript"});
  }
}

function onDetach(debuggeeId) {
  var tabId = debuggeeId.tabId;
  delete attachedTabs[tabId];
  chrome.pageAction.setIcon({tabId:tabId, path:"debuggerPause.png"});
  chrome.pageAction.setTitle({tabId:tabId, title:"Pause JavaScript"});
}

chrome.debugger.onEvent.addListener(onEvent);
chrome.debugger.onDetach.addListener(onDetach);

chrome.tabs.onUpdated.addListener(function (tabId) {
    console.log('<show></show>')
    chrome.pageAction.show(tabId);
});

function actionClicked(tab) {
  var tabId = tab.id;
  var debuggeeId = {tabId:tabId};

  if (attachedTabs[tabId] == "pausing")
    return;

  if (!attachedTabs[tabId])
    chrome.debugger.attach(debuggeeId, version, onAttach.bind(null, debuggeeId));
  else if (attachedTabs[tabId])
    chrome.debugger.detach(debuggeeId, onDetach.bind(null, debuggeeId));
}

chrome.pageAction.onClicked.addListener(function ( tab ) {
    console.log('click')
chrome.windows.getCurrent(function(win) {
    chrome.tabs.getSelected(win.id, actionClicked);
  });
});

function onAttach(debuggeeId) {
  if (chrome.extension.lastError) {
    alert(chrome.extension.lastError.message);
    return;
  }

  var tabId = debuggeeId.tabId;
  chrome.pageAction.setIcon({tabId: tabId, path:"debuggerPausing.png"});
  chrome.pageAction.setTitle({tabId: tabId, title:"Pausing JavaScript"});
  attachedTabs[tabId] = "pausing";
  chrome.debugger.sendCommand(
      debuggeeId, "Debugger.enable", {},
      onDebuggerEnabled.bind(null, debuggeeId));
}

function onDebuggerEnabled(debuggeeId) {
  chrome.debugger.sendCommand(debuggeeId, "Debugger.pause");
}


