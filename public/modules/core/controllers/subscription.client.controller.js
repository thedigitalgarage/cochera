'use strict';

angular.module('app.core').controller('SubscriptionController', 
['$rootScope', '$scope', '$cookieStore', '$state', '$http', 'toastr', '$window', 'ISO3166',
	function ($rootScope, $scope, $cookieStore, $state, $http, toastr, $window, ISO3166) {
		
		$scope.countries = ISO3166.codeToCountry;
		$rootScope.address = {
			label: 'shipping_address',
			subscription_id: $rootScope.subscription.id
		};
		$rootScope.card = {};
		$rootScope.estimate = {};
		$scope.loading = false;
		$scope.page_loading = true;
		$scope.cancel_param = {
			id: $rootScope.subscription.id,
			next_renewal: $state.params.next_renewal,
			end_of_term: 'false'
		};
		//Subscription Details
		$http.post('/subscription/shipping_address', {id: $rootScope.subscription.id}).success(function(response){
			$rootScope.address = response.address;
			$rootScope.address.state_code = undefined;
		}).error(function(response){
		//	console.log(response);
		});

		//Customer Card
		$http.post('/subscription/card', {id: $rootScope.customer.id}).success(function(response){
			$cookieStore.put('card', response.card);
			$rootScope.card = response.card;
		}).error(function(response){
		//	console.log(response);
		});

		//Shipping Address
		$http.post('/subscription/details', {id: $rootScope.subscription.id}).success(function(response){
			$rootScope.estimate = response.estimate;
			$scope.page_loading = false;
		}).error(function(response){
			$scope.page_loading = false;
		//	console.log(response);
		});

		$scope.getStatusLabel = function(status) {
			var subStatus = [];
			subStatus.active = "label-success";
			subStatus.in_trial = "label-default";
			subStatus.non_renewing = "label-warning";
			subStatus.cancelled = "label-danger";
			subStatus.future = "label-primary";
			return subStatus[status];
		};

		$scope.updateCusInfo = function(){
			$scope.loading = true;
			$http.post('/subscription/update_cus_info', $rootScope.customer).success(function(response){
				$scope.loading = false;
				$cookieStore.put('customer', response.customer);
				$rootScope.customer = response.customer;
				toastr.success('Customer Information has been updated successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};

		$scope.changePaymentMethod = function(){
			$http.post('/subscription/change_payment_method', {id: $rootScope.customer.id}).success(function(response){
				$window.location.href = response.hosted_page.url;
			}).error(function(response){
				toastr.error(response.message, 'Error');
			});
		};

		$scope.changeBillingAddress = function(){
			$scope.loading = true;
			$http.post('/subscription/change_billing_info', {id:$rootScope.customer.id, address: $rootScope.customer.billing_address}).success(function(response){
				$scope.loading = false;
				$cookieStore.put('customer', response.customer);
				$rootScope.customer = response.customer;
				toastr.success('Billing Information has been updated successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};

		$scope.changeShippingAddress = function(){
			$scope.loading = true;
			$http.post('/subscription/change_shipping_address', $rootScope.address).success(function(response){
				$scope.loading = false;
				$cookieStore.put('address', response.address);
				$rootScope.address = response.address;
				$rootScope.address.state_code = undefined;
				toastr.success('Shipping Address has been updated successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};

		$scope.reactiveSub = function(){
			$scope.loading = true;
			$http.post('/subscription/reactive', {id: $rootScope.subscription.id}).success(function(response){
				$scope.loading = false;
				$cookieStore.put('subscription', response.subscription);
				$cookieStore.put('customer', response.customer);
				$cookieStore.put('card', response.card);
				$rootScope.subscription = response.subscription;
				$rootScope.customer = response.customer;
				$rootScope.card = response.card;
				toastr.success('Your subscription has been re-actived successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};

		$scope.cancelSub = function(){
			$scope.loading = true;
			$http.post('/subscription/cancel', $scope.cancel_param).success(function(response){
				$scope.loading = false;
				$cookieStore.put('subscription', response.subscription);
				$cookieStore.put('customer', response.customer);
				$cookieStore.put('card', response.card);
				$rootScope.subscription = response.subscription;
				$rootScope.customer = response.customer;
				$rootScope.card = response.card;
				toastr.success('Your subscription has been cancelled successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};
	}
]);