'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
 //   $scope.authentication = Authentication;

	$scope.top = {
		backstretch: [
			'modules/core/client/img/big/big-1.jpg',
			'modules/core/client/img/big/big-2.jpg',
			'modules/core/client/img/big/big-3.jpg',
			'modules/core/client/img/big/big-4.jpg',
		]
	};
	$scope.clients = [
		'modules/core/client/img/clients/logo-1.png',
        'modules/core/client/img/clients/logo-2.png',
        'modules/core/client/img/clients/logo-3.png',
        'modules/core/client/img/clients/logo-4.png',
        'modules/core/client/img/clients/logo-5.png',
        'modules/core/client/img/clients/logo-6.png',
        'modules/core/client/img/clients/logo-7.png',
        'modules/core/client/img/clients/logo-8.png',
        'modules/core/client/img/clients/logo-9.png',
        'modules/core/client/img/clients/logo-10.png'
	];
  }
]);
