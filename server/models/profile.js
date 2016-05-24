var async = require('async');
var kc = require('../controllers/keycloak');
var chargeBee = require('../controllers/subscription');

module.exports = function (Profile) {

    function createSubscription(cb, res) {
        if(res.find){
            chargeBee.create(res.find, cb);
        }else{
            cb();
        }
    }

    function ghostRegister(cb, res){
        var models = Profile.app.models;
        var user = res.find;
        models.Ghost.inviteUser(user.email, function (err, res) {
            console.log(err, res);
        });
        cb();
    }

    Profile.findOrCreateSubscription = function (email, cb) {
        async.auto({
            find: async.apply(kc.findUser, email),
            subscription: ['find', createSubscription],
            ghost: ['subscription', ghostRegister]
        }, function (err, res) {
            cb(null, res.find);
        });
    };

    Profile.remoteMethod('findOrCreateSubscription', {
        accepts: [
            {arg: 'email', type: 'string', http: {source: 'path'}}
        ],
        http: {path: '/findOrCreate/:email', verb: 'PUT'},
        returns: {type: 'object', root: true}
    });
};
