var express = require('express');
var router = express.Router();
var marketplaceCore = require('../connectors/marketplace_core_connector');

router.get('/', function (req, res, next) {
    marketplaceCore.getTopDrinksSince(req.query['sinceDate'], req.query['topValue'], function (err, data) {
        if (err) {
            res.status(500);
            res.send('Error when requesting data from the marketplace core');

            return;
        }

        res.json(data);
    })
});

router.get('/favorit', function (req, res, next) {
    marketplaceCore.getFavoriteJuicesSince(req.query['sinceDate'], function (err, data) {
        if (err) {
            res.status(500);
            res.send('Error when requesting data from the marketplace core');

            return;
        }

        res.json(data);
    })
});

router.get('/workload', function (req, res, next) {
    marketplaceCore.getWorkloadSince(req.query['sinceDate'], function (err, data) {
        if (err) {
            res.status(500);
            res.send('Error when requesting data from the marketplace core');

            return;
        }

        res.json(data);
    })
});

router.get('/revenue', function (req, res, next) {
    marketplaceCore.getRevenueSince(req.query['sinceDate'], req.query['time'], function (err, data) {
        if (err) {
            res.status(500);
            res.send('Error when requesting data from the marketplace core');

            return;
        }

        res.json(data);
    })
});

module.exports = router;
