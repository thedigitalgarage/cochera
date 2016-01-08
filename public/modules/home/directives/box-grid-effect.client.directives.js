'use strict';

/* Edits by Thomas  */

angular.module('app.home')
    .directive('boxGridEffects', function () {
        return {
            restrict: 'A',
            scope: {
                boxGridEffects: '@'
            },
            link: function (scope, element) {
                element.on('mouseenter', function() {
                    element.addClass(scope.boxGridEffects);
                });
                element.on('mouseleave', function() {
                    element.removeClass(scope.boxGridEffects);
                });
            }
        };
    });