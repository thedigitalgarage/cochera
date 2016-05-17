var async = require('async');
var kc = require('../controllers/keycloak');
var chargeBee = require('../controllers/subscription');

module.exports = function(Profile) {

    function createSubscription(cb, res){
        if(!res.find){
            chargeBee.create(res.find, cb);
        }else{
            cb(null, res.find);
        }
    }

    Profile.findOrCreateSubscription = function(username, cb){
        async.auto({
            find: async.apply(kc.findUser, username),
            subscription: ['find', createSubscription]
        }, cb);
    };

    Profile.remoteMethod('findOrCreateSubscription', {
        accepts: [
            {arg: 'username', type: 'string', http:{source:'path'}}
        ],
        http: {path: '/findOrCreate/:username', verb: 'post'},
        returns: {type: 'object', root: true}
    });
};
