'use strict';

/**
 * @ngdoc directive
 * @name zpumpApp.directive:backImg
 * @description
 * # backImg
 */
angular.module('zpumpApp')
    .directive('backImg', function() {
        return function(scope, element, attrs) {
            attrs.$observe('backImg', function(value) {
                element.css({
                    'background-image': 'url(' + value + ')'
                    // ,'background-size': 'cover'
                });
            });
        };
    });
