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
