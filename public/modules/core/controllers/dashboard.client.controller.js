(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
        'ChargebeeEventsAPI'
    ];

    function DashboardController(
        ChargebeeEventsAPI
    ) {
        var controller = this;


        (function initController() {
            controller.page_loading = true;

            ChargebeeEventsAPI
                .get()
                .then(function (events) {
                    controller.events = events.data.list;
                    controller.page_loading = false;
                });
        })();
    }
})();


