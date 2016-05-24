var request = require('request');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');

var CONFIG = JSON.parse(fs.readFileSync('server/config/kc-admin-cli.json', 'utf8'));

var KC_CLIENT = CONFIG.resource;
var KC_CLIENT_SECRET = CONFIG.credentials.secret;
var KC_HOST = CONFIG['auth-server-url'];


var credentials = {
    client_id: KC_CLIENT,
    client_secret: KC_CLIENT_SECRET,
    grant_type: 'client_credentials'
};

var API = {
    base: KC_HOST,
    auth: {
        id: 'auth',
        url: '/realms/master/protocol/openid-connect/token',
        verb: 'POST'
    },
    users: {
        id: 'createUser',
        url: '/admin/realms/master/users',
        verb: 'POST'
    },
    reset: {
        id: 'reset',
        url: '/admin/realms/master/users/:userid/reset-password',
        verb: 'PUT'
    },
    send_mail: {
        id: 'sendMail',
        url: '/admin/realms/master/users/:userid/execute-actions-email',
        verb: 'PUT'
    },
    find_user: {
        id: 'findUser',
        url: '/admin/realms/master/users?email=:email',
        verb: 'GET'
    }
};

function getToken(cb) {
    request.post(API.base + API.auth.url, {form: credentials}, function (err, res, body) {
        var token = JSON.parse(body).access_token;
        cb(err, token);
    })
}

function getOptions(method, token, data, params){
    var url = method.url;
    if (params){
        _.forEach(_.keys(params), function(k){
            url = url.replace(':'+k, params[k]);
        })
    }
    var res = {
        url: API.base + url,
        headers: {
            'Content-Type': 'application/json'
        },
        method: method.verb
    };

    if(token){
        res.headers.Authorization= 'Bearer ' + token;
    }

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
var createUser = _.curry(function (user, token, cb) {
    user.enabled = true;
    user.requiredActions= ["UPDATE_PASSWORD"];

    var options = getOptions(API.users, token, user);
    request(options, function (err, res, body) {
        cb(err, body);
    })
});

var sendPassword = _.curry(function(userid, token, cb){
    var options = getOptions(API.send_mail, token, ["UPDATE_PASSWORD"], {userid: userid});
    request(options, function (err, res, body) {
        cb(err, body);
    })
});

var findUser = _.curry(function (email, token, cb){
    console.log(email);
    var options = getOptions(API.find_user, token, null, {email: email});
    request(options, function (err, res, body) {
        var user = _.head(JSON.parse(body));
        cb(err, user);
    });
});

var curried = _.curry(function (action, cb){
    async.waterfall([
        getToken,
        action
    ], cb);
});

function createKeycloakUser(user, cb){
    var create =  createUser(user);
    curried(create, cb);
}

function findKeycloakUser(username, cb){
    var find =  findUser(username);
    curried(find, cb);
}

function sendMailUserId(userid, cb){
    var mail = sendPassword(userid);
    curried(mail, cb);
}

module.exports = {
    createUser: createKeycloakUser,
    findUser: findKeycloakUser,
    sendMail: sendMailUserId
};
