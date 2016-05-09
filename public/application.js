'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

var auth = {};
var logout = function(){
    console.log('*** LOGOUT');
    auth.loggedIn = false;
    auth.authz = null;
    window.location = auth.logoutUrl;
};


/*
angular.element(document).ready(function ($http) {
    var keycloakAuth = new Keycloak('keycloak.json');
    auth.loggedIn = false;

    keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
        auth.loggedIn = true;
        auth.authz = keycloakAuth;
        auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/cochera/protocol/openid-connect/logout?redirect_uri=/#";

        if (window.location.hash === '#_=_') window.location.hash = '#';

        angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
        angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
            function($locationProvider) {
                //	$locationProvider.hashPrefix('!');
                $locationProvider.hashPrefix('');
            }
        ]);
    }).error(function (err) {
        console.log('oh error', err);
        //window.location.reload();
    });

});
*/

// Setting HTML5 Location Mode


//Then define the init function for starting up the application




angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
    function($locationProvider) {
        //	$locationProvider.hashPrefix('!');
        $locationProvider.hashPrefix('');
    }
]);

angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
//	if (window.location.hash === '#_=_') window.location.hash = '#!';
	if (window.location.hash === '#_=_') window.location.hash = '#';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
