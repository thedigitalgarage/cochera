'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'angleApp';

	var applicationModuleVendorDependencies = [ 'ngRoute',
												'ngAnimate',
												'ngStorage',
												'ngTouch',
												'ngCookies',
												'pascalprecht.translate',
												'ui.bootstrap',
												'ui.router',
												'oc.lazyLoad',
												'cfp.loadingBar',
												'ngSanitize',
												'ngResource',
												'ui.utils',
												'ngProgress',
											    'angular-flexslider',
											    'ng-backstretch',
											    'angular-parallax',
											    'toastr',
											    'iso-3166-country-codes'
											   ];
	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
	//	$locationProvider.hashPrefix('!');
		$locationProvider.hashPrefix('');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
//	if (window.location.hash === '#_=_') window.location.hash = '#!';
	if (window.location.hash === '#_=_') window.location.hash = '#';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.colors');

})();
(function() {
    'use strict';

    // Use Applicaion configuration module to register a new module
    ApplicationConfiguration.registerModule('app.core',[
          'app.routes',
          'app.sidebar',
          'app.navsearch',
          'app.preloader',
          'app.loadingbar',
          'app.translate',
          'app.settings',
          //'app.pages',
          'app.utils'
        ]);

})();
(function() {
    'use strict';

    // Use Applicaion configuration module to register a new module
    ApplicationConfiguration.registerModule('app.home',[ ]);
})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.lazyload');
})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.loadingbar');
})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.navsearch');
})();
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('page');

(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.preloader');

})();


(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.routes',['app.lazyload']);

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.settings');

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.sidebar');

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.translate');

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.utils', [
          'app.colors'
          ]);

})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
        .constant('APP_BRAND', {
            SMALL : 'modules/core/img/brand/sm_dg_symbol_light.png',
            BIG : 'modules/core/img/brand/dg_full_light.png'
        })
        .constant('DATE_FORMATS', {
            EN_DATE_TIME : "MM/dd/yyyy 'at' h:mm a"
        })
        .constant('CHARGEBEE_API', {
            PREFIX : 'chargebee/',
            EVENTS : 'events/'
        })
      ;

})();


(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus){
        // Add default menu entry
        Menus.addMenuItem('sidebar', 'Dashboard', 'dashboard', null, '/dashboard', true, null, null, 'icon-home');
        Menus.addMenuItem('sidebar', 'Account', 'account', null, '', true, null, null, 'icon-user');
        Menus.addSubMenuItem('sidebar', 'account', 'Subscription', 'account/subscription');
        Menus.addSubMenuItem('sidebar', 'account', 'Invoice', 'account/invoice');
        //Menus.addSubMenuItem('sidebar', 'account', 'Team', 'account/team');
        //Menus.addSubMenuItem('sidebar', 'account', 'Referrals', 'account/referrals');
        Menus.addMenuItem('sidebar', 'User', 'user', null, '', true, null, null, 'icon-people');
        Menus.addSubMenuItem('sidebar', 'user', 'Profile', 'user/profile');
        //Menus.addSubMenuItem('sidebar', 'user', 'Security', 'user/security');
        //Menus.addSubMenuItem('sidebar', 'user', 'Notifications', 'user/notifications');
    }

})();

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

(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];

    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {

      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // -----------------------------------

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };
    }
})();


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



'use strict';

angular.module('app.core').controller('HeaderCoreController', ['APP_BRAND', '$scope', 'Menus', '$state', 'Auth',
	function (APP_BRAND, $scope, Menus, $state, Auth) {
        $scope.brand = APP_BRAND.BIG;
        $scope.brandSmall = APP_BRAND.SMALL;

		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.logout = function(){
        	//$window.keycloakAuth.logout();
        	Auth.logout();
        	$state.go('home.main');
    	};
	}
]);

'use strict';

angular.module('app.core').controller('InvoiceController',
	['$rootScope', '$scope', '$state', '$http', 'toastr', '$window', '$parse',
		function ($rootScope, $scope, $state, $http, toastr, $window, $parse) {

			$rootScope.invoices = {};
			$scope.loading = false;
			$scope.page_loading = true;
			$scope.inv_number = 0;
			
			$http.post('/invoice/for_subscription', {id: $rootScope.subscription.id}).success(function(response){
				$scope.page_loading = false;
				$rootScope.invoices = response.list;
				angular.forEach($rootScope.invoices, function(value, key){
					if(value.invoice.status != 'pending')
					 	$scope.inv_number += 1;
				});
			}).error(function(response){
				$scope.page_loading = false;
			//	console.log(response);
			});

			$scope.retrievePDF = function(id){
				var the_string = 'loading_' + id;
				$scope[the_string] = true;
				$http.post('/invoice/retrive_pdf', {id: id}).success(function(response){
					$scope[the_string] = false;
					$window.open(response.download.download_url, '_blank');
				}).error(function(response){
					$scope[the_string] = false;
					toastr.error(response.message, 'Error');
				});
			};
		}
]);
'use strict';

angular.module('app.core').controller('ProfileController', ['$scope', '$state', 
	function ($scope, $state) {
		
	}
]);
'use strict';

angular.module('app.core').controller('SubscriptionController', 
['$rootScope', '$scope', '$cookieStore', '$state', '$http', 'toastr', '$window', 'ISO3166',
	function ($rootScope, $scope, $cookieStore, $state, $http, toastr, $window, ISO3166) {
		
		$scope.countries = ISO3166.codeToCountry;
		$rootScope.address = {
			label: 'shipping_address',
			subscription_id: $rootScope.subscription.id
		};
		$rootScope.card = {};
		$rootScope.estimate = {};
		$scope.loading = false;
		$scope.page_loading = true;
		$scope.cancel_param = {
			id: $rootScope.subscription.id,
			next_renewal: $state.params.next_renewal,
			end_of_term: 'false'
		};
		//Subscription Details
		$http.post('/subscription/shipping_address', {id: $rootScope.subscription.id}).success(function(response){
			$rootScope.address = response.address;
			$rootScope.address.state_code = undefined;
		}).error(function(response){
		//	console.log(response);
		});

		//Customer Card
		$http.post('/subscription/card', {id: $rootScope.customer.id}).success(function(response){
			$cookieStore.put('card', response.card);
			$rootScope.card = response.card;
		}).error(function(response){
		//	console.log(response);
		});

		//Shipping Address
		$http.post('/subscription/details', {id: $rootScope.subscription.id}).success(function(response){
			$rootScope.estimate = response.estimate;
			$scope.page_loading = false;
		}).error(function(response){
			$scope.page_loading = false;
		//	console.log(response);
		});

		$scope.getStatusLabel = function(status) {
			var subStatus = [];
			subStatus.active = "label-success";
			subStatus.in_trial = "label-default";
			subStatus.non_renewing = "label-warning";
			subStatus.cancelled = "label-danger";
			subStatus.future = "label-primary";
			return subStatus[status];
		};

		$scope.updateCusInfo = function(){
			$scope.loading = true;
			$http.post('/subscription/update_cus_info', $rootScope.customer).success(function(response){
				$scope.loading = false;
				$cookieStore.put('customer', response.customer);
				$rootScope.customer = response.customer;
				toastr.success('Customer Information has been updated successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};

		$scope.changePaymentMethod = function(){
			$http.post('/subscription/change_payment_method', {id: $rootScope.customer.id}).success(function(response){
				$window.location.href = response.hosted_page.url;
			}).error(function(response){
				toastr.error(response.message, 'Error');
			});
		};

		$scope.changeBillingAddress = function(){
			$scope.loading = true;
			$http.post('/subscription/change_billing_info', {id:$rootScope.customer.id, address: $rootScope.customer.billing_address}).success(function(response){
				$scope.loading = false;
				$cookieStore.put('customer', response.customer);
				$rootScope.customer = response.customer;
				toastr.success('Billing Information has been updated successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};

		$scope.changeShippingAddress = function(){
			$scope.loading = true;
			$http.post('/subscription/change_shipping_address', $rootScope.address).success(function(response){
				$scope.loading = false;
				$cookieStore.put('address', response.address);
				$rootScope.address = response.address;
				$rootScope.address.state_code = undefined;
				toastr.success('Shipping Address has been updated successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};

		$scope.reactiveSub = function(){
			$scope.loading = true;
			$http.post('/subscription/reactive', {id: $rootScope.subscription.id}).success(function(response){
				$scope.loading = false;
				$cookieStore.put('subscription', response.subscription);
				$cookieStore.put('customer', response.customer);
				$cookieStore.put('card', response.card);
				$rootScope.subscription = response.subscription;
				$rootScope.customer = response.customer;
				$rootScope.card = response.card;
				toastr.success('Your subscription has been re-actived successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};

		$scope.cancelSub = function(){
			$scope.loading = true;
			$http.post('/subscription/cancel', $scope.cancel_param).success(function(response){
				$scope.loading = false;
				$cookieStore.put('subscription', response.subscription);
				$cookieStore.put('customer', response.customer);
				$cookieStore.put('card', response.card);
				$rootScope.subscription = response.subscription;
				$rootScope.customer = response.customer;
				$rootScope.card = response.card;
				toastr.success('Your subscription has been cancelled successfully.', 'Success');
			}).error(function(response){
				$scope.loading = false;
				toastr.error(response.message, 'Error');
			});
		};
	}
]);
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



'use strict';

//Menu service used for managing  menus
angular.module('app.core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position,
																iconClass, translateKey, alert) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender,
				iconClass: iconClass || 'fa fa-file-o',
				translate: translateKey,
				alert: alert
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
		//Adding the sidebar menu
		this.addMenu('sidebar');
	}
]);

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
'use strict';

angular.module('app.home').controller('FooterController', ['$scope',
  function ($scope) {
    $scope.brand = 'The Digital Garage';
  }
]);
'use strict';

angular.module('app.home').controller('HeaderController', ['APP_BRAND', '$window', '$rootScope', '$scope', '$state', 'ngProgressFactory', '$modal',
  function (APP_BRAND, $window, $rootScope, $scope, $state, ngProgressFactory, $modal) {

    $scope.brand = APP_BRAND.BIG;
    $scope.brandSmall = APP_BRAND.SMALL;
    $rootScope.loginStatus = false;
    $scope.isCollapsed = true;
    /* Remove Top ProgressBar
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.setColor('#02bbff');
    $scope.progressbar.start();
    $scope.$on('$routeChangeStart', function(next, current) {
      $scope.isCollapsed = true;
      $scope.progressbar.start();
    });
    $scope.scroll = 0;
    $scope.$on('$routeChangeSuccess', function () {
      $scope.progressbar.complete();
    }); */
    $scope.top = function() {
      if(document.querySelector(".main"))
        return document.querySelector(".main").getBoundingClientRect().top;
    };

    $scope.loginKeyCloak = function(){
        // $window.keycloakAuth.login().success(function() {
        //     $window.keycloakAuth.updateToken(10).success(function(){
        //         alert($window.keycloakAuth.subject);
        //     }).error(function() {
        //         alert('failed to refresh token');
        //     });
        // }).error(function() {
        //     alert('failed to refresh token');
        // });
        $state.go('app.dashboard');
    };

    $scope.regKeyCloak = function(){
        $window.keycloakAuth.register();
    };

    // $scope.logoutKeyCloak = function(){
    //     $window.keycloakAuth.logout();
    // };
    $scope.login = function(){
      var loginModal = $modal.open({
        templateUrl: 'modules/home/views/modal/login.client.view.html',
        controller: 'LoginController',
        size: 'md',
        windowClass: 'login'
      });
    };
  }
]);

angular.module('app.home').controller('LoginController',['$scope', '$state', '$modalInstance', '$http', 'toastr', 'Auth',
 function($scope, $state, $modalInstance, $http, toastr, Auth) {
    $scope.authInfo = {
        username : '',
        password : ''
    };
    $scope.submitting = false;
    $scope.login = function(){
        $scope.submitting = true;
        if( $scope.authInfo.username!=='' && $scope.authInfo.password!==''){
            Auth.login($scope.authInfo).then(function(){
                $scope.submitting = false;
                toastr.success('You are logged in successfully.', 'Success');
                $state.go('app.dashboard');
                $modalInstance.close();
            }).catch(function(){
                $scope.submitting = false;
            });
        }
        else{
            toastr.error('Please enter username and password.', 'Error');
            $scope.submitting = false;
        }
    };
}]);

'use strict';

angular.module('app.home').controller('HomeController', ['$scope',
  function ($scope) {

	$scope.top = {
		backstretch: [
			'modules/home/img/big/Startup-Garage.jpg',
			'modules/home/img/big/big-1.jpg',
			'modules/home/img/big/big-2.jpg',
			'modules/home/img/big/big-3.jpg',
			'modules/home/img/big/big-4.jpg',
		]
	};
	$scope.clients = [
		'modules/home/img/clients/logo-1.png',
        'modules/home/img/clients/logo-2.png',
        'modules/home/img/clients/logo-3.png',
        'modules/home/img/clients/logo-4.png',
        'modules/home/img/clients/logo-5.png',
        'modules/home/img/clients/logo-6.png',
        'modules/home/img/clients/logo-7.png',
        'modules/home/img/clients/logo-8.png',
        'modules/home/img/clients/logo-9.png',
        'modules/home/img/clients/logo-10.png'
	];
  }
]);

'use strict';

/* Edits by Thomas  */

angular.module('app.home')
    .directive('boxGridEffects', function () {
        return {
            restrict: 'A',
            scope: {
                boxGridEffects: '@'
            },
            link: function (scope, element) {
                element.on('mouseenter', function() {
                    element.addClass(scope.boxGridEffects);
                });
                element.on('mouseleave', function() {
                    element.removeClass(scope.boxGridEffects);
                });
            }
        };
    });
'use strict';

/* Edits by Thomas  */

angular.module('app.home')
	.directive('scrollPosition', ["$window", function($window) {
		return {
			scope: {
				scroll: '=scrollPosition'
			},
			link: function(scope, element, attrs) {
				var windowEl = angular.element($window);
				var handler = function() {
					scope.scroll = windowEl.scrollTop();
				};
				windowEl.on('scroll', scope.$apply.bind(scope, handler));
				handler();
			}
		};
	}]);
'use strict';

/* Edits by Thomas  */

angular.module('app.home')
    .directive('scrollToElement', function() {
        return {
            scope: {
                scrollToElement: '='
            },
            link: function(scope, element, attrs) {
                element.bind('click', function () {
                    if (attrs.href) {
                        var el = $(attrs.href);
                        if (el.length) {
                            el = el[0];
                        }
                        el.scrollIntoView(true);
                    }
                });
            }
        };
    });

'use strict';

/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('app.home')
  .directive('showErrors', ['$timeout', '$interpolate', function ($timeout, $interpolate) {
    var linkFn = function (scope, el, attrs, formCtrl) {
      var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
        initCheck = false,
        showValidationMessages = false,
        blurred = false;

      options = scope.$eval(attrs.showErrors) || {};
      showSuccess = options.showSuccess || false;
      inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
      inputNgEl = angular.element(inputEl);
      inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

      if (!inputName) {
        throw 'show-errors element has no child input elements with a \'name\' attribute class';
      }

      var reset = function () {
        return $timeout(function () {
          el.removeClass('has-error');
          el.removeClass('has-success');
          showValidationMessages = false;
        }, 0, false);
      };

      scope.$watch(function () {
        return formCtrl[inputName] && formCtrl[inputName].$invalid;
      }, function (invalid) {
        return toggleClasses(invalid);
      });

      scope.$on('show-errors-check-validity', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          initCheck = true;
          showValidationMessages = true;

          return toggleClasses(formCtrl[inputName].$invalid);
        }
      });

      scope.$on('show-errors-reset', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          return reset();
        }
      });

      toggleClasses = function (invalid) {
        el.toggleClass('has-error', showValidationMessages && invalid);
        if (showSuccess) {
          return el.toggleClass('has-success', showValidationMessages && !invalid);
        }
      };
    };

    return {
      restrict: 'A',
      require: '^form',
      compile: function (elem, attrs) {
        if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
          if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
            throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
          }
        }
        return linkFn;
      }
    };
}]);

'use strict';

angular.module('app.home').service('Auth', ['$rootScope', '$cookies', '$cookieStore', '$http', '$q', 'toastr',
	function ($rootScope, $cookies, $cookieStore, $http, $q, toastr) {
		var setUser = function (data) {
			angular.forEach(data, function(val, index){
				$cookieStore.put(index, val);
			});
			$rootScope.subscription = data.subscription;
			$rootScope.customer = data.customer;
			$rootScope.card = data.card;
		};

		this.renewUser = function () {
			$rootScope.User = {};
			angular.forEach($cookies, function (value, key) {
				$rootScope.User[key] = value;
			});
		};

		this.setUser = setUser;

		this.login = function (credentials) {
			var defer = $q.defer();
			$http.post('/authChargebee', credentials).success(function (data) {
				defer.resolve(data);
				setUser(data);
			}).error(function (data) {
				defer.reject(data);
				toastr.error(data.message, 'Error');
			});
			return defer.promise;
		};

		this.isLoggedIn = function () {
			if ($cookieStore.get('customer'))
				return true;
			return false;
		};

		this.logout = function () {
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (value, key) {
				$cookies.remove(key);
			});
			$rootScope.User = false;
		};
	}]);

(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['/lib/modernizr/modernizr.custom.js'],
            'icons':              ['/lib/fontawesome/css/font-awesome.min.css',
                                   '/lib/simple-line-icons/css/simple-line-icons.css']
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['/lib/angularjs-toaster/toaster.js', '/lib/angularjs-toaster/toaster.css']}
          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

'use strict';

// Setting up route
angular.module('page').config(['$stateProvider',
  function($stateProvider) {
    // Users state routing
    $stateProvider.
    state('page', {
      url: '/page',
      templateUrl: 'modules/page/views/page.client.view.html'
    });
  }
]);

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>',
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'The Digital Garage',
        description: 'The Digital Garage Landing Page',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null
        },
        useFullLayout: false,
        hiddenFooter: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      //$rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarCoreController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // -----------------------------------

          SidebarLoader.getMenu(sidebarReady);

          function sidebarReady(items) {
            $scope.menu = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------

          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

          };

          // Controller helpers
          // -----------------------------------

            // Check item and children active state
            function isActive(item) {

              if(!item) return;
              if( item.items && item.items.length) {
                var foundActive = false;
                angular.forEach(item.items, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else {
                return $state.$current.url.source.indexOf(item.uiRoute) > -1; //$state.is(item.sref) || $state.includes(item.sref);
              }
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

        } // activate
    }

})();

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope'];
    function UserBlockController($rootScope, $scope) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     'John',
            job:      'ng-developer',
            picture:  'modules/core/img/user/02.jpg'
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);

        }
    }
})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['Menus'];
    function SidebarLoader(Menus) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          onError = onError || function() { alert('Failure loading menu'); };

          var menu = Menus.getMenu('sidebar');

          if( menu )
            onReady( menu );
          else
            onError();

        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : '/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            });
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();
