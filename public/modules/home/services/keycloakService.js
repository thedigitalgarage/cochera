'use strict';

angular
    .module('app.home')
    .service('AccountService',['$http', 'Profile', function ($http, Profile) {

        function register(reg, url){
            return Profile.register({url:url}, {register: reg}).$promise;
        }

        function login(){
            return 'ok';
        }

        return{
            register: register,
            login: login
        }
    }]);
