'use strict';
var Models = require('../models')();

exports.urls = function (req, res) {
    console.log('urls', Models);
    Models.Url.find(function (err, urls) {

        res.json(urls);
        console.log(err, urls);
    });
};

exports.urlById = function (req, res) {
    var name = req.params.name;
    Models.Url.findOne({name: name}, function (err, urls) {
        res.json(urls);
    });
};

exports.createUrl = function (req, res) {
    var name = req.query.name;
    var url = req.query.url;
    Models.Url.create({name: name, value:url}, function (err, url) {
        if(!err)
            res.json(url);
        else
            res.status(500).send({error: 'Create'});
    });
};
