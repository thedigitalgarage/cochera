var request = require('request');

module.exports = function(Profile) {

    Profile.createProfile = function(register, url, cb){
        console.log(register, url);

    };

    Profile.remoteMethod('register', {
        accepts: {arg: 'subs', type: 'object', http: {source: 'body'}},
        http: {path: '/register', verb: 'post'},
        returns: {type: 'object', root: true}
    });

};
