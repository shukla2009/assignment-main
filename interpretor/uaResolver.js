'use strict';
const http = require('http');
var config = require('../config');
module.exports = function (req, res, next) {
    let ua = req.headers['user-agent'];
    let options = {
        host: config.resolver.ua.host,
        port: config.resolver.ua.port,
        path: `/ua/${encodeURIComponent(ua)}`,
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
                req.response.ua = JSON.parse(message);
            } else {
                res.status(404).send('Not Found');
            }
            next();
        });
    });
    request.end();
};