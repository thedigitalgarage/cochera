var async = require('async');
var chargeBee = require('../controllers/subscription');

module.exports = function (Profile) {

    function findCustomer(email, cb){
        chargeBee.findCustomer(email, cb);
    }

    function createSubscription(user, cb, res) {
        console.log('FIND USER', res.find);
        if(!res.find){
            chargeBee.create(user, cb);
        }else{
            cb();
        }
    }

    function ghostRegister(email, cb, res){
        var models = Profile.app.models;
        if(!res.find){
            models.Ghost.inviteUser(email, function (err, res) {
                console.log(err, res);
            });
        }
        cb();
    }

    Profile.findOrCreateSubscription = function (email, user, cb) {
        async.auto({
            find: async.apply(findCustomer, email),
            subscription: ['find', async.apply(createSubscription, user)],
            ghost: ['subscription', async.apply(ghostRegister, email)]
        }, function (err, res) {
            cb(null, res.find);
        });
    };

    Profile.remoteMethod('findOrCreateSubscription', {
        accepts: [
            {arg: 'email', type: 'string', http: {source: 'path'}},
            {arg: 'user', type: 'object', http: {source: 'body'}}

        ],
        http: {path: '/findOrCreate/:email', verb: 'PUT'},
        returns: {type: 'object', root: true}
    });
};
