'use strict';

/**
 * @ngdoc directive
 * @name reebokApp.directive:youtubePlayer
 * @description
 * # youtubePlayer
 */
angular.module('zpumpApp')

    .directive('youtubePlayer',['$window', '$timeout', function($window, $timeout) {

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                scope.videoid = attrs.id.toString();
                scope.videoName = attrs.videoName;

                var player;

                var onStateChangeListener = function(event) {

                    var tempPlayer = event.target;

                    var trackingObj = {
                        video_name     : scope.videoName.toUpperCase(),
                        video_position : '',
                        video_length   : tempPlayer.getDuration() - 1,
                        video_event    : '',
                        video_category : 'ZPUMP'
                    };

                    // access the elapsed and total time
                    try {
                        trackingObj.video_position = Math.round(parseFloat(tempPlayer.getCurrentTime()));
                    } catch(ex) {
                        trackingObj.video_position = 0;
                    }

                    if (typeof(utag) === 'undefined'){
                        return false;
                    }

                    switch(event.data) {
                        case 5:
                        case -1:
                            // open play complete pause
                            if (tempPlayer.open) {
                                tempPlayer.open = false;
                                trackingObj.video_event = 'video_close';
                                utag.link(trackingObj);
                            }
                            break;
                        case 1:
                            if (!tempPlayer.open){
                                tempPlayer.open = true;
                                trackingObj.video_event = 'video_start';
                            } else {
                                trackingObj.video_event = 'video_play';
                            }
                            utag.link(trackingObj);
                            break;
                        case 0:
                            tempPlayer.open = false;
                            trackingObj.video_event = 'video_complete';
                            utag.link(trackingObj);
                            break;
                        case 2:
                            trackingObj.video_event = 'video_stop';
                            utag.link(trackingObj);
                            break;
                    }

                };

                var createPlayer = function() {
                    player = new YT.Player(scope.videoid, {
                        events: {
                            'onStateChange': onStateChangeListener
                        }
                    });

                };

                $window.onYouTubeIframeAPIReady = function() {
                    createPlayer();
                };

                $timeout(function(){

                    var tag = document.createElement('script');
                    tag.src = 'https://www.youtube.com/iframe_api';
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    try {
                        createPlayer();
                    } catch(e) {}

                }, 0);

            }
        };

    }]);