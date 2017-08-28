'use strict';
const http = require('http');
var config = require('../config');
module.exports = function (req, res, next) {
    let ips = req.connection.remoteAddress.split(':');
    let ip = ips[ips.length - 1];
    let options = {
        host: config.resolver.ip.host,
        port: config.resolver.ip.port,
        path: `/ip/${ip}`,
        method: 'GET'
    };

    let request = http.request(options, function (result) {
        let message = '';
        result.on('data', function (chunk) {
            message += chunk;
        });
        result.on('end', function () {
            if (result.statusCode === 200) {
                if (!req.response) {
                    req.response = {};
                }
                req.response.ip = JSON.parse(message);
            } else {
                res.status(404).send('Not Found');
            }
            next();
        });
    });
    request.end();
};