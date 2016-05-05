'use strict';

var chargebee = require('chargebee');
var errorHandler = require('./errors');

exports.authChargebee = function(req, res) {
    console.log(req.body);
	chargebee.subscription.retrieve(req.body.username).request(
		function(error,result){
			if(error){
				return res.status(400).send({
					message: error.message
				});
			}else{
				res.json(result);
			}
	});
};

exports.details = function(req, res) {
	chargebee.estimate.update_subscription({
		subscription: {id: req.body.id}
	}).request(function(error, result){
	    if(error){
		    return res.status(400).send({
					message: error.message
				});
	    }else{
		    res.json(result);
	    }
	});
};

exports.card = function(req, res) {
	chargebee.card.retrieve(req.body.id).request(
		function(error, result){
		    if(error){
			    return res.status(400).send({
						message: error.message
					});
		    }else{
			    res.json(result);
		    }
	});
};

exports.shippingAddress = function(req, res) {
	chargebee.address.retrieve({
	    subscription_id : req.body.id,
	    label : "shipping_address"
    }).request(function (error, result) {
	    if(error){
		    return res.status(400).send({
					message: error.message
				});
	    }else{
		    res.json(result);
	    }
	});
};

exports.updateCusInfo = function(req, res) {
	chargebee.customer.update(req.body.id, {
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email: req.body.email,
		company: req.body.company,
		phone: req.body.phone
	}).request(function(error,result){
		if(error){
			return res.status(400).send({
					message: error.message
				});
		}else{
			res.json(result);
		}
	});
};

exports.changePaymentMethod = function(req, res) {
	chargebee.hosted_page.update_payment_method({
		customer : {id : req.body.id}
	}).request(function(error,result){
		if(error){
			return res.status(400).send({
					message: error.message
				});
		}else{
			res.json(result);
		}
	});
};

exports.changeBillingInfo = function(req, res) {
	chargebee.customer.update_billing_info(req.body.id,
		{billing_address : req.body.address}
	).request(function(error,result){
		if(error){
			return res.status(400).send({
					message: error.message
				});
		}else{
			res.json(result);
		}
	});
};

exports.changeShippingAddress = function(req, res) {
	chargebee.address.update(req.body).request(
		function(error,result){
			if(error){
				return res.status(400).send({
						message: error.message
					});
			}else{
				res.json(result);
			}
	});
};

exports.reactive = function(req, res) {
	chargebee.subscription.reactivate(req.body.id).request(
		function(error,result){
			if(error){
				console.log(error);
				return res.status(400).send({
						message: error.message
					});
			}else{
				res.json(result);
			}
	});
};

exports.cancel = function(req, res) {
	chargebee.subscription.cancel(req.body.id, {end_of_term: req.body.end_of_term}).request(
		function(error,result){
			if(error){
				console.log(error);
				return res.status(400).send({
						message: error.message
					});
			}else{
				res.json(result);
			}
	});
};
