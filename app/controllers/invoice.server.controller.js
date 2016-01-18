'use strict';

/**
 * Module dependencies.
*/

var chargebee = require('chargebee'),
    errorHandler = require('./errors.server.controller');

exports.forSubscription = function(req, res) {
	chargebee.invoice.invoices_for_subscription(req.body.id, {
		limit : 20
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

