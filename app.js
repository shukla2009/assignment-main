'use strict';
var config = require('./config');
var logger = require('./logger')(module);
var util = require('util');
var express = require('express');
var app = express();
const ipResolver = require('./interpretor/ipResolver');
const uaResolver = require('./interpretor/uaResolver');
app.use('/', ipResolver);
app.use('/', uaResolver);

app.get('/', function (req, res) {
    res.send(req.response);
});


app.all('/*', function (req, res) {
    res.status(404).send('Not Found');
});

app.set('port', config.port);

var server = app.listen(app.get('port'), function () {
    logger.info(util.format('Express server listening on port %s', server.address().port));
});
