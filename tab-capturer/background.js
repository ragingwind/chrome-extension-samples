var TabScreenCapturer = function() {
	this.take = function() {
		chrome.tabs.captureVisibleTab(null, {format:'png'}, function(url) {
			// make viewer page url with image data string.
			var view = chrome.extension.getURL('viewer.html?' + url);

			// create new tab with new url
			chrome.tabs.create({url:view}, function(tab) {
				var viewerId = tab.id;
				var onUpdate = function(tid, changed, tab) {
					if (viewerId == tid && changed.status == 'complete') {
						chrome.tabs.onUpdated.removeListener(onUpdate);
						chrome.tabs.sendMessage(tid, {dataURL:tab.url.split('?')[1]});
					}			
				}

				// add update listener..
				chrome.tabs.onUpdated.addListener(onUpdate);
			});
		});
	}
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.browserAction.onClicked.addListener(function(tab) {
  	var capturer = new TabScreenCapturer();
  	capturer.take();
  });
});
