var request = require('request');
var async = require('async');
var _ = require('lodash');
var app = require('../server');

var API = {
    base: 'http://localhost:8080',
    auth: '/auth/realms/master/protocol/openid-connect/token',
    users: '/auth/admin/realms/master/users',
    reset: '/auth/admin/realms/master/users/f1b1c094-922c-42ab-b2e2-f9fe7a29b38d/reset-password',
    send_mail: '/auth/admin/realms/master/users/kraken5/execute-actions-email'
};

var credentials = {
    client_id: 'admin-cli',
    client_secret: 'dc35b4a5-1dab-440e-96b9-f215d848c401',
    grant_type: 'client_credentials'
};

var token;

function getToken(cb) {
    request.post(API.base + API.auth, {form: credentials}, function (err, res, body) {
        token = JSON.parse(body).access_token;
        cb(err, token);
    })
}

/*
 username
 email
 lastName,
 firstName
 * */
function createUser(user, token, cb) {
    //var token = '';
    //console.log(user, token);
    var options = {
        url: API.base + API.users,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        method: 'POST'
    };

    request(options, function (err, res, body) {
        console.log(err, res);
        cb(err, body);
    })
}

function resetPassword(token, cb){
    var options = {
        url: API.base + API.reset,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({type:'password', value:'leo', temporary: false}),
        method: 'PUT'
    };

    request(options, function (err, res, body) {
        console.log(err, body);
        cb(err, body);
    })
}

function sendPassword(token, cb){
    var options = {
        url: API.base + API.send_mail,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(["UPDATE_PASSWORD"]),
        method: 'PUT'
    };

    request(options, function (err, res, body) {
        console.log(err, body);
        cb(err, body);
    })
}

function findUser(username, token, cb){
    var options = {
        url: API.base + API.users+ '?username='+username,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    };

    request(options, function (err, res, body) {
        var user = _.head(JSON.parse(body));
        console.log(user);
        cb(err, user);
    })
}

var user = {
    "username": "kraken5",
    "lastName": "cla2",
    "email": "joleocl+kraken5@gmail.com",
    "firstName": "leo",
    "enabled": true,
    "requiredActions": ["UPDATE_PASSWORD"]
};

//ghost authentication
var ghostCredentials = {
    username: 'lclavijo@bixlabs.com',
    password: 'leonar14',
    grant_type: 'password',
    client_id: 'ghost-admin',
    client_secret: 'not_available'
};


function findGhostUrl(cb){
    app.models.Url.findOne({where:{name: 'ghost'}}, cb);
}

function authRequest(url, cb){
    console.log(url.url);
    request.post(url.url+'/ghost/api/v0.1/authentication/token', {form: ghostCredentials}, function(err, res, body){
        cb(err, JSON.parse(body));
    });
}

function createUrl(cb){
    app.models.Url.create({name:'ghost', url: 'http://localhost:2368'}, cb);
}

function loginGhost(cb){
    async.waterfall([
        findGhostUrl,
        authRequest
    ], cb);
}


async.waterfall([
    loginGhost
], function(err, res){
    console.log(err, res);
    process.exit(0);
});
