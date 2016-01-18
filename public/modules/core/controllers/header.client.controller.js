'use strict';

angular.module('app.core').controller('HeaderCoreController', ['$scope', 'Menus', '$state', 'Auth',
	function ($scope, Menus, $state, Auth) {
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