'use strict';

angular.module('app.home')
    .service('Auth', ['$rootScope', '$cookies', '$state', '$cookieStore', '$http', '$q', 'toastr', function ($rootScope, $cookies, $state, $cookieStore, $http, $q, toastr) {
        var vm = this;
        vm.auth = {loggedIn: false};
        var keycloakAuth = new Keycloak('keycloak.json');
        keycloakAuth.redirectUri = '';
        keycloakAuth.init();

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

		function login (credentials) {
			var defer = $q.defer();
			$http.post('/authChargebee', credentials).success(function (data) {
				defer.resolve(data);
				setUser(data);
			}).error(function (data) {
				defer.reject(data);
				toastr.error(data.message, 'Error');
			});
			return defer.promise;
		}

		this.isLoggedIn = function () {
			if ($cookieStore.get('customer'))
				return true;
			return false;
		};

		this.logout = function () {
            //clean cookies
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (value, key) {
				$cookies.remove(key);
			});
			$rootScope.User = false;

            //keycloak logout
            keycloakAuth.logout({redirectUri: window.location.origin});
		};

        this.loadUser =  function(){
            vm.auth.authz.loadUserInfo();
        };

        this.keyCloakLogin= function(){
            vm.auth.loggedIn = false;
            keycloakAuth.redirectUri = 'http://localhost:8081/#/dashboard';
            keycloakAuth.init({ onLoad: 'login-required'}).success(function () {
               keycloakAuth.login();
            }).error(function () {
                console.log('error login');
                //window.location.reload();
            });
        };

        this.getSubscription = function(username){
            return login({username: username});
        }

	}]);
