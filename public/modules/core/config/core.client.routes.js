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
          templateUrl: 'modules/core/views/dashboard.client.view.html'
        })
        .state('app.profile', {
          url: '/user/profile',
          templateUrl: 'modules/core/views/profile.client.view.html',
          controller: 'ProfileController'
        })
        .state('app.billing', {
          url: '/account/billing',
          templateUrl: 'modules/core/views/billing.client.view.html',
          controller: 'BillingController'
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