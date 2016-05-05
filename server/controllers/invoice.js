'use strict';

/**
 * Module dependencies.
 */

var chargebee = require('chargebee');
var errorHandler = require('./errors');

exports.forSubscription = function (req, res) {
    chargebee.invoice.invoices_for_subscription(req.body.id, {
        limit: 20
    }).request(function (error, result) {
        if (error) {
            return res.status(400).send({
                message: error.message
            });
        } else {
            res.json(result);
        }
    });
};

exports.retrivePDF = function (req, res) {
    chargebee.invoice.pdf(req.body.id).request(
        function (error, result) {
            if (error) {
                return res.status(400).send({
                    message: error.message
                });
            } else {
                res.json(result);
            }
        });
};
