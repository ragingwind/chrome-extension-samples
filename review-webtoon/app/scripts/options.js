$(document).ready(function () {
  $('.signin-outter').show().click(function () {
    chrome.extension.getBackgroundPage().revoke(function () {
      alert('Revoked');
      window.close();
    });
  });
});
