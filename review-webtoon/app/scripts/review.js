//
// review, google+ moment helper class
//
// copyright 2012, @ragingwind
// use of this source code is governed by a MIT license
//

(function(root, factory) {
  if (typeof exports !== 'undefined') {
    factory(root, exports, require('jquery'));
  }
  else if (typeof define === 'function' && define.amd) {
    define(['jquery'], function($) {
      factory(root, $);
    });
  }
  else {
    factory(root, root.$);
  }
}(this, function(root, $) {

  if (root.OAuth2 === undefined) {
    throw new Error('OAuth2 has not defined');
  }

  var Review = root.Review = function(opts, done) {
    done || (done = function() {});
    opts.api_scope = 'https://www.googleapis.com/auth/plus.login';
    opts.request_visible_actions = 'http://schemas.google.com/ReviewActivity';

    this.oauth = new OAuth2('google', opts, done);
  };

  Review.prototype.authorize = function(done) {
      this.oauth.authorize(done);
  };

  Review.prototype.hasAuthorized = function() {
      return this.oauth.hasAccessToken();
  };

  Review.prototype.request = function(opts) {
    var accessToken = this.oauth.getAccessToken();

    opts.contentType = 'application/json; charset=utf-8';
    opts.dataType = 'json';
    opts.beforeSend = function (xhr) {
      xhr.setRequestHeader ('authorization', 'Bearer ' + accessToken);
    };

    return $.ajax(opts).promise();
  }

  Review.prototype.post = function(opts, done) {
    var moment  = {
      'type':'https://schemas.google.com/ReviewActivity',
      'target':{
        'url': opts.url
      },
      'result': {
        'type': 'http://schema.org/Review',
        'name': opts.title,
        'url': opts.url,
        'text': opts.text,
        'reviewRating': {
          'type': 'http://schema.org/Rating',
          'ratingValue': opts.rating,
          'bestRating': '10',
          'worstRating': '0'
        }
      }
    };

    return this.request({
      type: 'POST',
      data: JSON.stringify(moment),
      url: 'https://www.googleapis.com/plus/v1/people/me/moments/vault?debug=true',
    });
  };

  Review.prototype.list = function() {
    return this.request({
      type: 'GET',
      url: 'https://www.googleapis.com/plus/v1/people/me/moments/vault?type=http://schemas.google.com/ReviewActivity',
    });
  };

  Review.prototype.clear = function() {
    var access_token = this.oauth.getAccessToken();
    this.oauth.clear();

    return this.request({
      type: 'GET',
      url: 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token
    });
  };

  return Review;

}));
