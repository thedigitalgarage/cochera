'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);


var auth = {};
var logout = function () {
    console.log('*** LOGOUT');
    auth.loggedIn = false;
    auth.authz = null;
    window.location = auth.logoutUrl;
};


angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
    function ($locationProvider) {
        //	$locationProvider.hashPrefix('!');
        $locationProvider.hashPrefix('');
    }
]);

angular.element(document).ready(function () {

    var keycloakAuth = new Keycloak('keycloak.json');
    auth.loggedIn = false;
    keycloakAuth.redirectUri = 'http://localhost:8081/#/dashboard';
    keycloakAuth.init({onLoad: 'check-sso'}).success(function (authorized) {
        console.log('check-sso', authorized);
        angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

        if (authorized)
            window.location = location.href + 'dashboard';
    });

    //angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

    //Fixing facebook bug with redirect
    //if (window.location.hash === '#_=_') window.location.hash = '#!';
    //if (window.location.hash === '#_=_') window.location.hash = '#';
});
