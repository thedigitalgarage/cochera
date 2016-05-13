var request = require('request');
var async = require('async');
var _ = require('lodash');

var credentials = {
    client_id: process.env.KEYCLOAK_CLIENT || 'admin-cli',
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET || '9475dabc-761a-488c-aa0f-97df7f790db6',
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

var findUser = _.curry(function (username, token, cb){
    var options = getOptions(API.find_user, token, null, {username: username});
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
