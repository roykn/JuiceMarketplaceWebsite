/**
 * Created by beuttlerma on 07.02.17.
 */

var self = {};

var https = require('https');
var logger = require('../global/logger');
const HOST_SETTINGS = require('../config/host_settings');
var request = require('request');

function buildOptionsForRequest(method, protocol, host, port, path, qs) {

    return {
        method: method,
        url: protocol + '://' + host + ':' + port + path,
        qs: qs,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

self.getTopDrinksSince = function (sinceDate, topCount, callback) {

    var options = buildOptionsForRequest(
        'GET',
        'http',
        HOST_SETTINGS.MARKETPLACE_CORE.HOST,
        HOST_SETTINGS.MARKETPLACE_CORE.PORT,
        '/reports',
        {
            sinceDate: sinceDate,
            topValue: topCount
        }
    );

    request(options, function (e, r, jsonData) {
        logger.debug('Response from MarketplaceCore: ' + JSON.stringify(jsonData));
        if (typeof(callback) != 'function') {

            callback = function(err, data) {
                logger.warn('Callback not handled by caller');
            };
        }

        if (e) {
            logger.crit(e);

            callback(e);
        }

        if (r && r.statusCode != 200) {
            var err = {
                status: r.statusCode,
                message: jsonData
            };
            logger.warn('Call not successful: Options: ' + JSON.stringify(options) + ' Error: ' + JSON.stringify(err));
            callback(err);

            return;
        }

        callback(null, jsonData);
    });
};


self.getFavoriteJuicesSince = function (sinceDate, callback) {

    var options = buildOptionsForRequest(
        'GET',
        'http',
        HOST_SETTINGS.MARKETPLACE_CORE.HOST,
        HOST_SETTINGS.MARKETPLACE_CORE.PORT,
        '/reports/favorit',
        {
            sinceDate: sinceDate
        }
    );

    request(options, function (e, r, jsonData) {
        logger.debug('Response from MarketplaceCore: ' + JSON.stringify(jsonData));
        if (typeof(callback) != 'function') {

            callback = function(err, data) {
                logger.warn('Callback not handled by caller');
            };
        }

        if (e) {
            logger.crit(e);

            callback(e);
        }

        if (r && r.statusCode != 200) {
            var err = {
                status: r.statusCode,
                message: jsonData
            };
            logger.warn('Call not successful: Options: ' + JSON.stringify(options) + ' Error: ' + JSON.stringify(err));
            callback(err);

            return;
        }

        callback(null, jsonData);
    });
};

self.getWorkloadSince = function (sinceDate, callback) {

    var options = buildOptionsForRequest(
        'GET',
        'http',
        HOST_SETTINGS.MARKETPLACE_CORE.HOST,
        HOST_SETTINGS.MARKETPLACE_CORE.PORT,
        '/reports/workload',
        {
            sinceDate: sinceDate
        }
    );

    request(options, function (e, r, jsonData) {
        logger.debug('Response from MarketplaceCore: ' + JSON.stringify(jsonData));
        if (typeof(callback) != 'function') {

            callback = function(err, data) {
                logger.warn('Callback not handled by caller');
            };
        }

        if (e) {
            logger.crit(e);

            callback(e);
        }

        if (r && r.statusCode != 200) {
            var err = {
                status: r.statusCode,
                message: jsonData
            };
            logger.warn('Call not successful: Options: ' + JSON.stringify(options) + ' Error: ' + JSON.stringify(err));
            callback(err);

            return;
        }

        callback(null, jsonData);
    });
};

self.getRevenueSince = function (sinceDate, time, callback) {

    var options = buildOptionsForRequest(
        'GET',
        'http',
        HOST_SETTINGS.MARKETPLACE_CORE.HOST,
        HOST_SETTINGS.MARKETPLACE_CORE.PORT,
        '/reports/revenue',
        {
            sinceDate: sinceDate,
            time: time
        }
    );

    request(options, function (e, r, jsonData) {
        logger.debug('Response from MarketplaceCore: ' + JSON.stringify(jsonData));
        if (typeof(callback) != 'function') {

            callback = function(err, data) {
                logger.warn('Callback not handled by caller');
            };
        }

        if (e) {
            logger.crit(e);

            callback(e);
        }

        if (r && r.statusCode != 200) {
            var err = {
                status: r.statusCode,
                message: jsonData
            };
            logger.warn('Call not successful: Options: ' + JSON.stringify(options) + ' Error: ' + JSON.stringify(err));
            callback(err);

            return;
        }

        callback(null, jsonData);
    });
};

module.exports = self;