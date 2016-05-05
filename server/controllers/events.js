'use strict';

var chargebee = require('chargebee');

exports.getEvents = function (req, res) {
    chargebee.event.list({
        'limit': req.body.limit,
        'offset': req.body.offset,
        'start_time': req.body.start_time,
        'end_time': req.body.end_time
    }).request(
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

exports.getEvent = function (req, res) {
    chargebee.event.retrieve(
        req.params.eventId
    ).request(
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
