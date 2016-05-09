'use strict';

angular
    .module('app.home')
    .service('KeycloakService',['$http', function ($http) {

        function register(reg, url){
            $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    firstName: reg.firstName,
                    lastName: reg.lastName,
                    email: reg.email,
                    username: reg.username,
                    password: reg.password,
                    "password-confirm": reg.password
                }
            }).success(function () {});
        }

        function login(){
            return 'ok';
        }

        return{
            register: register,
            login: login
        }
    }]);
