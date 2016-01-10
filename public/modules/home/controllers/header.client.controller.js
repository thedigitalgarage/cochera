'use strict';

angular.module('app.home').controller('HeaderController', ['$window', '$rootScope', '$scope', '$state', 'ngProgressFactory', '$modal',
  function ($window, $rootScope, $scope, $state, ngProgressFactory, $modal) {

    $scope.brand = 'The Digital Garage';
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
    // $scope.loginModal = function(){
    //   var loginModal = $modal.open({
    //     templateUrl: 'modules/core/client/views/modal/login.client.view.html',
    //     controller: 'LoginController',
    //     size: 'md',
    //     windowClass: 'login'
    //   });
    // };
  }
]);

// angular.module('core').controller('LoginController',['$scope', function($scope) {
  
// }]);
