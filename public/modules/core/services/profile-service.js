'use strict';

angular
    .module('app.core')
    .service('ProfileService', ['Profile', function (Profile) {

        function update(profile) {
            return Profile.update({where: {username: profile.username}}, profile).$promise;
        }

        return {
            update: update
        }
    }]);
