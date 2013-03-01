function showMostlyVisit(tabs) {
  var hostname = tabs[0].url.match(/^(?:f|ht)tp(?:s)?\:\/\/([^/]+)/im);

  if (hostname) {
    var tmpl = '<li><div style="min-width:400px">' +
               '<a href="{{url}}">{{title}}</a></div>' +
               '<small>{{visitTime}}</small></li>';

    // search related history with hostname.
    chrome.history.search({ text: hostname[1], maxResults: 10 }, function (items) {
      items.forEach(function (item) {
        var visitTime = new Date(item.lastVisitTime).toLocaleString();
        var title = item.title || item.url.substring(0, 50);
        var item = tmpl.replace('{{url}}', item.url)
                       .replace('{{title}}', title)
                       .replace('{{visitTime}}', visitTime);

        $('#history').append(item);
      });

      // bind active event to each items.
      $('#history a').click( function () {
        chrome.tabs.create({url: $(this).attr('href')});
      });
    });
  }
};

$(document).ready(function () {
  chrome.tabs.query({ currentWindow: true, active: true }, showMostlyVisit);
});
