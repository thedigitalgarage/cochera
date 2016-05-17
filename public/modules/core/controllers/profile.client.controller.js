'use strict';

angular.module('app.core')
    .controller('ProfileController', ['$scope', '$state', 'ProfileService',
	function ($scope, $state, ProfileService) {
		var vm= this;

        vm.editProfile = function (profile){
            ProfileService.update(profile);
        };
	}
]);
