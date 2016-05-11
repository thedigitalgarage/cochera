var request = require('request');

module.exports = function(Profile) {

    Profile.register = function(register, url, cb){
        console.log(register, url);
        cb();
    };

    Profile.remoteMethod('register', {
        accepts: [
            {arg: 'register', type: 'object', http: {source: 'body'}},
            {arg: 'url', type: 'object', http: {source: 'query'}}
        ],
        http: {path: '/register', verb: 'post'},
        returns: {type: 'object', root: true}
    });

};
