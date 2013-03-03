# REVIEW WEBSITE
post my review rating to google plus. this extension show how to use new google+
moment api with 'ReviewActivity'. the project scaffolds by yeoman. if you want to use
grunt task? run 'npm install && bower install' to install the required dependecies
after install grint-cli.

# PACKAGE INSTALL
bower install

# CLIENT ID AND SECRET
put your google client id and secret to app/script/oauthconf.js
if you don't have a client id? you should create new client-id from
google apis[1] using with authorization information as follow.

    Authorized JavaScript Origins: chrome-extension://[YOUR-EXTENSION-ID]
    Redirect URIs: http://www.google.com/robots.txt

[1]: https://code.google.com/apis/console
