'use strict';

/* Edits by Thomas  */

angular.module('app.home')
	.directive('scrollPosition', function($window) {
		return {
			scope: {
				scroll: '=scrollPosition'
			},
			link: function(scope, element, attrs) {
				var windowEl = angular.element($window);
				var handler = function() {
					scope.scroll = windowEl.scrollTop();
				};
				windowEl.on('scroll', scope.$apply.bind(scope, handler));
				handler();
			}
		};
	});