(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('ChargebeeEventsAPI', ChargebeeEventsAPI);

    ChargebeeEventsAPI.$inject = [
        '$filter',
        '$http',
        'CHARGEBEE_API',
        'DATE_FORMATS'
    ];

    function ChargebeeEventsAPI(
        $filter,
        $http,
        CHARGEBEE_API,
        DATE_FORMATS
    ){

        //------------------------------------------------------------------------//
        // @begin: internal logic

        function serverModelToClientModel(item){
            item.event.occurredAtDisplay = $filter('date')(
                new Date(item.event.occurred_at * 1000),
                DATE_FORMATS.EN_DATE_TIME
            );

            item.event.eventTypeDisplay = _.chain(item.event.event_type)
                .lowerCase()
                .upperFirst()
                .value();
            return item;
        }

        function transformResponse(data){
            var response = angular.fromJson(data).list;
            return (_.isArray(response) ?
                _.map(response, serverModelToClientModel)
                : serverModelToClientModel(response));
        }

        //--- @begin: API

        function get(
            limit,
            offset,
            startDate,
            endTime,
            webhookStatus,
            eventType
        ){
            return $http.post(
                CHARGEBEE_API.PREFIX +
                CHARGEBEE_API.EVENTS,
                {
                    limit : limit || 10,
                    offset: offset || null,
                    start_date: startDate || null,
                    end_time : endTime || null,
                    webhook_status: webhookStatus || null,
                    event_type: eventType || null
                }
            ).success(transformResponse);
        }

        function getById(eventId){
            return $http.post(
                CHARGEBEE_API.PREFIX +
                CHARGEBEE_API.EVENTS +
                eventId
            ).then(function(response){
                    return response.data;
                });
        }
        //--- @end: API

        // @end: internal logic
        //------------------------------------------------------------------------//

        var API = {
            get : get,
            getById : getById
        };

        return API;

    }
})();


