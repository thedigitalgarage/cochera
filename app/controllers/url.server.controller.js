'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/test';
mongoose.connect(MONGO_URL);

var Url = mongoose.model('Url', {name: String, value: String});


exports.urls = function (req, res) {
    Url.find(function (err, urls) {
        res.json(urls);
        console.log(err, urls);
    });
}

exports.urlById = function (req, res) {
    var name = req.params.name;
    Url.findOne({name: name}, function (err, urls) {
        res.json(urls);
    });
}

