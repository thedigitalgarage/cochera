'use strict';

angular
    .module('app.home')
    .service('AccountService',['$http', 'Profile', function ($http, Profile) {

        function register(reg){
            return Profile.register({}, reg).$promise;
        }

        return{
            register: register
        };
    }]);
