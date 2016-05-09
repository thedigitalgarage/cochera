module.exports = function (Subscription) {
    var chargebee = require('chargebee');
    /*
     sus= {
     email,
     firstName,
     lastName,
     phone
     }
     * */
    Subscription.createSubscription = function (subs, cb) {
        chargebee.subscription.create({
            // hardcode
            plan_id: 'cbdemo_free',
            customer: {
                email: subs.email,
                first_name: subs.firstName,
                last_name: subs.lastName,
                phone: subs.phone
            }
        }).request(function (err, res) {
            Subscription.create(res, cb);
            console.log(err, res);
        });
    };

    Subscription.remoteMethod('createSubscription', {
        accepts: {arg: 'subs', type: 'object', http: {source: 'body'}},
        http: {path: '/chargebee/create', verb: 'post'},
        returns: {type: 'object', root: true}
    });
};
