(function() {
    'use strict';

    angular
        .module('app.core')
        .config(appRoutes)
        ;
    appRoutes.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function appRoutes($stateProvider, $locationProvider, $urlRouterProvider, helper){

      // Set the following to true to enable the HTML5 Mode
      // You may have to set <base> tag in index and a routing configuration in your server
      $locationProvider.html5Mode(false);

      // default route
      $urlRouterProvider.otherwise('/');

      //
      // Application Routes
      // -----------------------------------
      $stateProvider
        .state('app', {
            // url: '/',
            abstract: true,
            templateUrl: 'modules/core/views/core.client.view.html',
            resolve: helper.resolveFor('modernizr', 'icons')
        })
          .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/core/views/dashboard.client.view.html',
            controller : 'DashboardController',
            controllerAs : 'DashboardCtrl'
          })
        .state('app.profile', {
            url: '/user/profile',
            templateUrl: 'modules/core/views/profile.client.view.html',
            controller: 'ProfileController'
        })
        .state('app.subscription', {
            url: '/account/subscription',
            templateUrl: 'modules/core/views/subscription/main.client.view.html',
            controller: 'SubscriptionController'
        })
            .state('app.subCusInfo_edit', {
                url: '/account/subscription/subCusInfo_edit',
                templateUrl: 'modules/core/views/subscription/subCusInfo_edit.client.view.html',
                controller: 'SubscriptionController'
            })
            .state('app.subBillingInfo', {
                url: '/account/subscription/subBillingInfo',
                templateUrl: 'modules/core/views/subscription/subBillingInfo.client.view.html',
                controller: 'SubscriptionController'
            })
            .state('app.subShippingAddress', {
                url: '/account/subscription/subShippingAddress',
                templateUrl: 'modules/core/views/subscription/subShippingAddress.client.view.html',
                controller: 'SubscriptionController'
            })
            .state('app.subReactivate', {
                url: '/account/subscription/reactivate',
                templateUrl: 'modules/core/views/subscription/reactivate.client.view.html',
                controller: 'SubscriptionController'
            })
            .state('app.subCancel', {
                url: '/account/subscription/cancel',
                templateUrl: 'modules/core/views/subscription/cancel.client.view.html',
                controller: 'SubscriptionController',
                params: {
                    'next_renewal': null
                }
            })
        .state('app.invoice', {
            url: '/account/invoice',
            templateUrl: 'modules/core/views/invoice.client.view.html',
            controller: 'InvoiceController'
        })

        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
        ;

    }
})();
