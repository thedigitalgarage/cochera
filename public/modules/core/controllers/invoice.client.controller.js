'use strict';

angular.module('app.core').controller('InvoiceController',
	['$rootScope', '$scope', '$state', '$http', 'toastr', '$window', '$parse',
		function ($rootScope, $scope, $state, $http, toastr, $window, $parse) {

			$rootScope.invoices = {};
			$scope.loading = false;
			$scope.page_loading = true;
			$scope.inv_number = 0;
			
			$http.post('/invoice/for_subscription', {id: $rootScope.subscription.id}).success(function(response){
				$scope.page_loading = false;
				$rootScope.invoices = response.list;
				angular.forEach($rootScope.invoices, function(value, key){
					if(value.invoice.status != 'pending')
					 	$scope.inv_number += 1;
				});
			}).error(function(response){
				$scope.page_loading = false;
			//	console.log(response);
			});

			$scope.retrievePDF = function(id){
				var the_string = 'loading_' + id;
				$scope[the_string] = true;
				$http.post('/invoice/retrive_pdf', {id: id}).success(function(response){
					$scope[the_string] = false;
					$window.open(response.download.download_url, '_blank');
				}).error(function(response){
					$scope[the_string] = false;
					toastr.error(response.message, 'Error');
				});
			};
		}
]);