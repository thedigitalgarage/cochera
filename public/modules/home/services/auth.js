'use strict';

angular.module('app.home')
    .service('Auth', ['$rootScope', '$cookies', '$cookieStore', '$http', '$q', 'toastr', function ($rootScope, $cookies, $cookieStore, $http, $q, toastr) {
        var auth = {loggedIn: false};

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

        this.loadUser =  function(){
            auth.authz.loadUserInfo();
        };

        this.keyCloakLogin= function(){
            var keycloakAuth = new Keycloak('keycloak.json');
            auth.loggedIn = false;
            keycloakAuth.redirectUri = 'http://localhost:8081/#/dashboard';
            keycloakAuth.init({ onLoad: 'login-required'}).success(function () {
                console.log('LOGIN SUCCESS');
                auth.loggedIn = true;
                auth.authz = keycloakAuth;
                auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/demo/protocol/openid-connect/logout?redirect_uri=/angular-product/index.html";

                console.log('token', keycloakAuth.token);
                auth.authz.loadUserInfo();
                window.location= 'http://localhost:8081/#/dashboard';
                //angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
            }).error(function () {
                console.log('error login');
                //window.location.reload();
            });
            /*
            console.log('login');
            var keycloakAuth = new Keycloak('keycloak.json');
            auth.loggedIn = false;

            keycloakAuth.init({ onLoad: 'login-required', redirectUri: location.href+'/dashboard' }).success(function () {
                auth.loggedIn = true;
                auth.authz = keycloakAuth;
                auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/demo/protocol/openid-connect/logout?redirect_uri=/angular-product/index.html";

                console.log('token', keycloakAuth.token);
                auth.authz.loadUserInfo();
            }).error(function () {
                console.log('error login');
                //window.location.reload();
            });*/
        };

	}]);
