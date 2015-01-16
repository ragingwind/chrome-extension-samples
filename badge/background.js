var ColorBadgeIcon = function() {
	this.random = function(max) {
		return Math.floor((Math.random() * max));
	}

	this.setIcon = function() {
		var canvas = document.getElementById("badge");
		var r = this.random(255)
			,	g = this.random(255)
			,	b = this.random(255);
		var ctx = canvas.getContext("2d");

		ctx.fillStyle = 'rgb(' + [r, g, b].join(',') + ')';
		chrome.browserAction.setIcon({imageData: ctx.getImageData(0, 0, 19, 19)});
		ColorBadgeIcon.updateIcon(this);
	}
}

ColorBadgeIcon.updateIconColor = function(ctx) {
	window.setTimeout(function(badge) {badge.setIcon.call(badge)}, 1000, ctx);
}

document.addEventListener('DOMContentLoaded', function () {
  ColorBadgeIcon.updateIconColor(new ColorBadgeIcon());
});
