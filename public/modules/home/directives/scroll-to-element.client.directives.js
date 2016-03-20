'use strict';

/* Edits by Thomas  */

angular.module('app.home')
    .directive('scrollToElement', function() {
        return {
            scope: {
                scrollToElement: '='
            },
            link: function(scope, element, attrs) {
                element.bind('click', function () {
                    if (attrs.href) {
                        var el = $(attrs.href);
                        if (el.length) {
                            el = el[0];
                        }
                        el.scrollIntoView(true);
                    }
                });
            }
        };
    });
