'use strict';

angular.module('app.home').service('Auth', ['$rootScope', '$cookies', '$cookieStore', '$http', '$q', 'toastr',
	function ($rootScope, $cookies, $cookieStore, $http, $q, toastr) {
		var setUser = function (data) {
			angular.forEach(data, function(val, index){
				$cookieStore.put(index, val);
			});
			$rootScope.subscription = data.subscription;
			$rootScope.customer = data.customer;
			$rootScope.card = data.card;
		};

		this.renewUser = function () {
			$rootScope.User = {};
			angular.forEach($cookies, function (value, key) {
				$rootScope.User[key] = value;
			});
		};

		this.setUser = setUser;

		this.login = function (credentials) {
			var defer = $q.defer();
			$http.post('/authChargebee', credentials).success(function (data) {
				defer.resolve(data);
				setUser(data);
			}).error(function (data) {
				defer.reject(data);
				toastr.error(data.message, 'Error');
			});
			return defer.promise;
		};

		this.isLoggedIn = function () {
			if ($cookieStore.get('customer'))
				return true;
			return false;
		};

		this.logout = function () {
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (value, key) {
				$cookies.remove(key);
			});
			$rootScope.User = false;
		};

        this.kcisLogin =  function(){

        }
	}]);
