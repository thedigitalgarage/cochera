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
