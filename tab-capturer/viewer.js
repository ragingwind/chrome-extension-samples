chrome.extension.onMessage.addListener(function(params) {
	document.getElementById('viewer').src = params.dataURL;
});