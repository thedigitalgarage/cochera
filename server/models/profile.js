var async = require('async');
var kc = require('../controllers/keycloak');
var chargeBee = require('../controllers/subscription');

module.exports = function(Profile) {

    function sendMail(cb, res){
        kc.sendMail(res.find.id, cb);
    }

    function createSubscription(cb, res){
        chargeBee.create(res.find, cb);
    }

    function registerCb(err, res){

    }

    Profile.register = function(user, cb){
        async.auto({
            user: async.apply(kc.createUser, user),
            find: ['user', async.apply(kc.findUser, user.username)],
            mail: ['find', sendMail],
            subscription: ['find', createSubscription]
        }, cb);
    };

    Profile.remoteMethod('register', {
        accepts: [
            {arg: 'user', type: 'object', http: {source: 'body'}}
        ],
        http: {path: '/register', verb: 'post'},
        returns: {type: 'object', root: true}
    });

};
