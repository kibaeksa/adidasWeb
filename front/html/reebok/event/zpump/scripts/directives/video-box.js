'use strict';

/**
 * @ngdoc directive
 * @name zpumpApp.directive:utilities
 * @description
 * # utilities
 */
angular.module('zpumpApp')
    .directive('videoBox', ['tracking', function(tracking) {
        return {
            restrict: 'A',
            controller: function($scope) {

                $scope.activeTab = 0;
                $scope.videoActive = false;

                $scope.toggleVideo = function() {
                    $scope.videoActive = !$scope.videoActive;
                };

                $scope.activateTab = function(tabId) {
                    $scope.activeTab = tabId;
                };

            },
            // scope, element, attrs
            link: function postLink() {}
        };
    }]);
