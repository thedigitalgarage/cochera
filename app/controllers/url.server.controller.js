'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

var MONGO_HOST = process.env.MONGODB_SERVICE_HOST || 'localhost';
var MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'cochera';
var MONGODB_USER = process.env.MONGODB_USER || 'cochera';
var MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'cochera';
var MONGO_URL = ['mongodb://' + MONGODB_USER + ':' + MONGODB_PASSWORD + '@' + MONGO_HOST, MONGODB_DATABASE].join('/');
mongoose.connect(MONGO_URL);

var Url = mongoose.model('Url', {name: String, value: String});


exports.urls = function (req, res) {
    Url.find(function (err, urls) {
        res.json(urls);
        console.log(err, urls);
    });
};

exports.urlById = function (req, res) {
    var name = req.params.name;
    Url.findOne({name: name}, function (err, urls) {
        res.json(urls);
    });
};

exports.createUrl = function (req, res) {
    var name = req.query.name;
    var url = req.query.url;
    Url.create({name: name, value:url}, function (err, url) {
        if(!err)
            res.json(url);
        else
            res.status(500).send({error: 'Create'});
    });
};
