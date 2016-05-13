'use strict';

angular.module('app.core').controller('ProfileController', ['$scope', '$state', 'KeyAuth', 'ProfileService',
	function ($scope, $state, KeyAuth, ProfileService) {
		var vm= this;
		vm.user = KeyAuth.profile;

        vm.editProfile = function (profile){
            ProfileService.update(profile);
        };
	}
]);
