'use strict';

angular.module('app.home').controller('HeaderController', ['$window', '$rootScope', '$scope', '$state', 'ngProgressFactory', '$modal',
  function ($window, $rootScope, $scope, $state, ngProgressFactory, $modal) {

    $scope.brand = 'The Digital Garage';
    $scope.brandSmall = 'Dg';
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
