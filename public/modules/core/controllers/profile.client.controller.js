'use strict';

angular.module('app.core').controller('ProfileController', ['$scope', '$state', 'KeyAuth',
	function ($scope, $state, KeyAuth) {
		var vm= this;
		vm.user = KeyAuth.profile;
        console.log(vm);
        /*{
			name: 'leo',
			last: 'clavijo',
			email: 'joleocl@gmail.com',
			date: new Date()
		};*/
	}
]);
