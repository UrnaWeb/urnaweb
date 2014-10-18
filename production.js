require('newrelic');
var connect = require('connect');
var serveStatic = require('serve-static');
var listenPort = process.env.PORT || 8080
connect().use(serveStatic(__dirname + '/dist')).listen(listenPort);