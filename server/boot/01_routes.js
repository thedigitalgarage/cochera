module.exports = function (app) {

    var config = require('../config/config');
    var chargebee = require('chargebee');
    chargebee.configure(
        {
            site : config.chargebeeSite,
            api_key : config.chargebeeAPIKey
        }
    );

    var subscription = require('../controllers/subscription');
    var events = require('../controllers/events');
    var invoice = require('../controllers/invoice');

    // Dashboard Page
    app.post('/chargebee/events', events.getEvents);
    app.post('/chargebee/events/:eventId', events.getEvents);

    //Subscription and Invoice
    app.post('/authChargebee', subscription.authChargebee);
    //Subscription Page
    app.post('/subscription/details', subscription.details);
    app.post('/subscription/card', subscription.card);
    app.post('/subscription/shipping_address', subscription.shippingAddress);
    app.post('/subscription/update_cus_info', subscription.updateCusInfo);
    app.post('/subscription/change_payment_method', subscription.changePaymentMethod);
    app.post('/subscription/change_billing_info', subscription.changeBillingInfo);
    app.post('/subscription/change_shipping_address', subscription.changeShippingAddress);
    app.post('/subscription/reactive', subscription.reactive);
    app.post('/subscription/cancel', subscription.cancel);
    //Invoice Page
    app.post('/invoice/for_subscription', invoice.forSubscription);
    app.post('/invoice/retrive_pdf', invoice.retrivePDF);

};
