'use strict';

angular.module('app.core').controller('InvoiceController',
	['$rootScope', '$scope', '$state', '$http', 'toastr', '$window', '$parse',
		function ($rootScope, $scope, $state, $http, toastr, $window, $parse) {

			$rootScope.invoices = {};
			$scope.loading = false;
			$scope.inv_number = 0;
			
			$http.post('/invoice/for_subscription', {id: $rootScope.subscription.id}).success(function(response){
				$rootScope.invoices = response.list;
			}).error(function(response){
			//	console.log(response);
			});

		}
]);