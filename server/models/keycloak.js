var request = require('request');
var async = require('async');
var _ = require('lodash');

var credentials = {
    client_id: 'admin-cli',
    client_secret: 'dc35b4a5-1dab-440e-96b9-f215d848c401',
    grant_type: 'client_credentials'
};

var API = {
    base: process.env.KEYCLOAK_HOST || 'http://localhost:8080',
    auth: {
        id: 'auth',
        url: '/auth/realms/master/protocol/openid-connect/token',
        verb: 'POST'
    },
    users: {
        id: 'createUser',
        url: '/auth/admin/realms/master/users',
        verb: 'POST'
    },
    reset: {
        id: 'reset',
        url: '/auth/admin/realms/master/users/:userid/reset-password',
        verb: 'PUT'
    },
    send_mail: {
        id: 'sendMail',
        url: '/auth/admin/realms/master/users/:userid/execute-actions-email',
        verb: 'PUT'
    },
    find_user: {
        id: 'findUser',
        url: '/auth/admin/realms/master/users?username=:username',
        verb: 'GET'
    }
};

function getToken(cb) {
    var options = getOptions(API.auth);
    request.post(API.base + API.auth, {form: credentials}, function (err, res, body) {
        token = JSON.parse(body).access_token;
        cb(err, token);
    })
}

function getOptions(method, token,  data, params){
    var url = method.url;
    if (params){
        _.forEach(_.keys(params), function(k){
            url = url.replace(k, params[k]);
        })
    }
    console.log(url);
    var res = {
        url: API.base + method.url,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: method.verb
    };

    if(method.verb !== 'GET' && data){
        res.body= JSON.stringify(data);
    }
    return res;
}


/*
 username
 email
 lastName,
 firstName
 * */
function createUser(user, token, cb) {
    var options = getOptions(API.users, token, user);
    request(options, function (err, res, body) {
        console.log(err, res);
        cb(err, body);
    })
}


function sendPassword(userid, token, cb){
    var options = getOptions(API.send_mail, token, ["UPDATE_PASSWORD"], {userid: userid});
    request(options, function (err, res, body) {
        console.log(err, body);
        cb(err, body);
    })
}

function findUser(username, token, cb){
    var options = getOptions(API.find_user, token, null, {username: username});
    request(options, function (err, res, body) {
        var user = _.head(JSON.parse(body));
        console.log(user);
        cb(err, user);
    });
}


//test

async.waterfall([
    getToken,
    async.apply(findUser, 'leokraken')
], function(){
   process.exit(0);
});
