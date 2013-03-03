'use strict';

var client = {
  client_id: OAUTH_CLIENT_ID,
  client_secret: OAUTH_CLIENT_SECRET
};

var review = new Review(client);

function hasAuthorized() {
  return review.hasAuthorized();
};

function authorize() {
  review.authorize();
};

function getList(done) {
  review.list().done(done);
};

function revoke(done) {
  review.clear().fail(function () {
    review = undefined;
    review = new Review(client);
    done();
  });
};

function postReview(event, done) {
  // get activated tab in current window
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    event.url = tabs[0].url;
    event.title = tabs[0].title;
    review.post(event).done(done).fail(function() {
      alert('Post has failed');
    });
  });
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.pageAction.show(tabId)
});
