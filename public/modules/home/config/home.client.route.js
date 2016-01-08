(function() {
    'use strict';

    angular
        .module('app.home')
        .config(appRoutes)
        ;
    appRoutes.$inject = ['$stateProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function appRoutes($stateProvider, $urlRouterProvider, helper){

      $stateProvider
        .state('home', {
          // url: '/',
          abstract: true,
          templateUrl: 'modules/home/views/layout.client.view.html',
          resolve: helper.resolveFor('modernizr', 'icons')
        })
        .state('home.main', {
          url: '/',
          templateUrl: 'modules/home/views/home.client.view.html'
        })
        ;

    }
})();