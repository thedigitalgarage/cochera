'use strict';

angular.module('app.core').controller('ProfileController', ['$scope', '$state', 
	function ($scope, $state) {
		var vm= this;
		vm.user = {
			name: 'leo',
			last: 'clavijo',
			email: 'joleocl@gmail.com',
			date: new Date()
		};
	}
]);
