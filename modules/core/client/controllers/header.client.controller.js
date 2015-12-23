'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', 'ngProgressFactory', '$modal',
  function ($scope, $state, Authentication, Menus, ngProgressFactory, $modal) {
    // Expose view variables
    // $scope.$state = $state;
    // $scope.authentication = Authentication;

    // // Get the topbar menu
    // $scope.menu = Menus.getMenu('topbar');

    // // Toggle the menu items
    // $scope.isCollapsed = false;
    // $scope.toggleCollapsibleMenu = function () {
    //   $scope.isCollapsed = !$scope.isCollapsed;
    // };

    // // Collapsing the menu after navigation
    // $scope.$on('$stateChangeSuccess', function () {
    //   $scope.isCollapsed = false;
    // });

    $scope.brand = 'The Digital Garage';
    $scope.isCollapsed = true;
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
    });
    $scope.top = function() {
      if(document.querySelector(".main"))
        return document.querySelector(".main").getBoundingClientRect().top;
    };

    $scope.loginModal = function(){
      var loginModal = $modal.open({
        templateUrl: 'modules/core/client/views/modal/login.client.view.html',
        controller: 'LoginController',
        size: 'md',
        windowClass: 'login'
      });
    };
  }
]);

angular.module('core').controller('LoginController',['$scope', function($scope) {
  
}]);
