'use strict';

angular.module('app.core').controller('HeaderCoreController', ['$scope', 'Menus', '$state', 
	function ($scope, Menus, $state) {
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.logoutKeyCloak = function(){
        	//$window.keycloakAuth.logout();
        	$state.go('home.main');
    	};
	}
]);