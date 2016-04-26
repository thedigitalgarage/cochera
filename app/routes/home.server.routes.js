'use strict';

module.exports = function(app) {
	// Root routing
	var home = require('../../app/controllers/home.server.controller');
	var subscription = require('../../app/controllers/subscription.server.controller');
	var events = require('../../app/controllers/events.server.controller');
	var invoice = require('../../app/controllers/invoice.server.controller');
	var urls = require('../../app/controllers/url.server.controller');

    // Dashboard Page
    app.route('/chargebee/events').post(events.getEvents);
    app.route('/chargebee/events/:eventId').post(events.getEvents);

    //Subscription and Invoice
	app.route('/authChargebee').post(subscription.authChargebee);
	//Subscription Page
	app.route('/subscription/details').post(subscription.details);
	app.route('/subscription/card').post(subscription.card);
	app.route('/subscription/shipping_address').post(subscription.shippingAddress);
	app.route('/subscription/update_cus_info').post(subscription.updateCusInfo);
	app.route('/subscription/change_payment_method').post(subscription.changePaymentMethod);
	app.route('/subscription/change_billing_info').post(subscription.changeBillingInfo);
	app.route('/subscription/change_shipping_address').post(subscription.changeShippingAddress);
	app.route('/subscription/reactive').post(subscription.reactive);
	app.route('/subscription/cancel').post(subscription.cancel);
	//Invoice Page
	app.route('/invoice/for_subscription').post(invoice.forSubscription);
	app.route('/invoice/retrive_pdf').post(invoice.retrivePDF);

	//url
	app.route('/urls').get(urls.urls);
	app.route('/urls/:name').get(urls.urlById);
};
