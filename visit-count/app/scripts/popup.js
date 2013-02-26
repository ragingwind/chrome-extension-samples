function getHostName( url ) {
  return url
}

function queryMostlyVisit( argument ) {

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // get hostname
    var hostname = tabs[0].url.match(/^(?:f|ht)tp(?:s)?\:\/\/([^/]+)/im);
    if (hostname) {
      // var li = '<li><div style="min-width:400px"><a href="{{url}}">{{title}}</div><small><{{lastVisitTime}}</small></li>';
      chrome.history.search({ text: hostname[1], maxResults: 10 }, function (items) {
        items.forEach(function (item) {
          console.log(item.title)
          console.log(item.url)

          var lastVisitTime = new Date(item.lastVisitTime).toLocaleString();
          var $li = $( ['<li><div style="min-width:400px"><a href="',
            item.url, '">', item.title || item.url.substring(0, 50), '</a></div><small>',
            lastVisitTime, '</small></li>'].join('') );

          // li = li.replace('{{url}}', item.url)
          //   .replace('{{title}}', item.title)
          //   .replace('{{lastVisitTime}}', item.lastVisitTime);

          $('#history').append( $li );
        });

        // console.log($('a'));
            $('#history a').click( function () {
              chrome.tabs.create({url: $(this).attr('href')});
          })


      });
    }
  });

}
// var console = chrome.extension.getBackgroundPage().console;
$(document).ready(function () {

  queryMostlyVisit();

  $('#history a').click(function () {
    console.log('click', this)
  })

});