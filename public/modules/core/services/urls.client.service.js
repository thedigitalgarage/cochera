'use strict';

//Menu service used for managing  menus
angular
    .module('app.core')
    .service('Urls', ['$http', function ($http) {
        function reduce(acc, obj) {
            acc[obj.name] = obj.value;
            return acc;
        }

        function getAll() {
            return $http.get('urls')
                .then(function (res) {
                    var red = res.data.reduce(reduce, {});
                    return red;
                });
        }

        return {
            getUrls: getAll
        };
    }]);
