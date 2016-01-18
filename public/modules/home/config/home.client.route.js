(function() {
		'use strict';

		angular
			.module('app.home')
			.config(appRoutes)
			.run(appRun)
			;

		appRun.$inject = ['$rootScope', '$state', '$cookieStore', '$http', 'Auth'];
		function appRun($rootScope, $state, $cookieStore, $http, Auth){
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				$rootScope.subscription = $cookieStore.get('subscription');
				$rootScope.customer = $cookieStore.get('customer');
				$rootScope.card = $cookieStore.get('card');
				$rootScope.address = $cookieStore.get('address');
	            var normalRoutes = ['home.main'];
	            var restrictedRoutes = [];
	            if (!Auth.isLoggedIn() && $.inArray(toState.name, normalRoutes) == -1) {
	                event.preventDefault();
	                $state.transitionTo('home.main', null, {'reload':true});
	            }
	        });
	        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
	            $rootScope.containerClass = toState.containerClass;
	        });
		}

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