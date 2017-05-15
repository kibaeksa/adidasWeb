'use strict';

/**
 * @ngdoc directive
 * @name zpumpApp.directive:utilities
 * @description
 * # utilities
 */
angular.module('zpumpApp')
		.directive('utilities', ['$rootScope', '$timeout', 'tracking', 'addThis', '$detection', function ($rootScope, $timeout, tracking, addThis, $detection) {
			return {
				restrict: 'A',
				controller: function ($scope) {

					var $win = $(window),
							winWidth = $win.width(),
							tempRes = 'mobile';

					$scope.init = function () {

						// default state
						$win.scrollTop(0);

						//               Bind
						// ================================================
						$win.on('resize', function () {
							winWidth = $(this).width();


							var isTablet = false;

							// set device resolution
							if (winWidth < 800) {
								tempRes = 'mobile';
								//} else if (winWidth >= 768 && winWidth < 1024) {
								//  tempRes = 'tablet';
							} else if (winWidth >= 1024) {
								tempRes = 'desktop';
							} else if (winWidth >= 768 && winWidth < 1024) {
								tempRes = 'tablet';
							}


							if ((winWidth >= 850) && ($detection.isiOS() || $detection.isAndroid() )) {
								isTablet = true;
								tempRes = 'tablet';
								//  console.log('TABLET');
							}


							$('main.body.zpump').removeClass('mobile tablet desktop').addClass(tempRes);

							$timeout(function () {
								$scope.$apply(function () {
									$rootScope.deviceResolution = tempRes;
									$rootScope.isTablet = isTablet;
								});
							});
						});

						$rootScope.ie = $rootScope.isFirefox = false;


						$rootScope.isSafari = $detection.getUserAgent().search('Safari') && $detection.getUserAgent().search('Version') != -1;

						if (!!navigator.userAgent.match(/msie/i)) {
							$rootScope.ie = true;
							$('html').addClass('ie');
						}

						if (!!navigator.userAgent.match(/firefox/i)) {
							$rootScope.isFirefox = true;
						}

						// uncomment to see ie transitions
						// $rootScope.ie = true; $('html').addClass('ie');

						$timeout(function () {
							$win.resize(); // init resize event
							// tracking.init(); // broadcast deviceResReady
							addThis.init(); // addthis init
						}, 0);

					};

					$scope.init();
					$win.resize();
				},
				// scope, element, attrs
				link: function postLink() {
				}
			};
		}]);