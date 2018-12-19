'use strict';

/**
 * @ngdoc directive
 * @name zpumpApp.directive:utilities
 * @description
 * # utilities
 */
angular.module('zpumpApp')
		.directive('intro', ['$window', '$rootScope', '$timeout', function ($window, $rootScope, $timeout) {
			return {
				restrict: 'A',
				scope: true,

				controller: function ($scope) {

					$scope.hasLoaded = false;

					// init animation
					$scope.init = function () {
						if ($rootScope.deviceResolution && $rootScope.deviceResolution !== 'mobile') {
							$rootScope.swiffystage = new swiffy.Stage(document.getElementById('intro-canvas'),
									$window.zpumpIntoAnimation, {});
							$scope.hasLoaded = true;
						}
					};

					$rootScope.$on('initial-load-finished', function () {
						$scope.runIntro();
					});

					$scope.runIntro = function() {
						if($scope.hasLoaded) {
							$rootScope.swiffystage.setBackground(null);
							$rootScope.swiffystage.start();

							$timeout(function () {
								$scope.cnv = $('#aniCanvas')[0];
								$scope.ctx = $scope.cnv.getContext('2d');
								$scope.ctx.drawImage($rootScope.footImage, 0, 0, $rootScope.footImage.width, $rootScope.footImage.height);
								delete $rootScope.footImage;

								$('.canvas-wrapper').fadeOut('slow', function () {
									$('.canvas-wrapper').remove();
								});
							}, 1800);


							if (typeof addthis !== 'undefined') {
								addthis.toolbox('.addthis_toolbox');
							}
						}
						else {
							$timeout(function () {
								$scope.runIntro();
							}, 250);
						}
					};

					$scope.preInit = function () {
						var serviceURL = '/Global/ExtensionModules/ZPumpFusionExtensionMod/scripts/introanimation.js';

						// if local
						if ($rootScope.RUNLOCAL) {
							serviceURL = 'scripts/data/introanimation.js';
						}

						$.getScript(serviceURL).done(function () {
							// load script if not mobile
							$.getScript('https://www.gstatic.com/swiffy/v7.1/runtime.js').done(function () {
								$scope.init();
							});
						});
					};

					$scope.preInit();

				},
				// scope, element, attrs
				link: function postLink() {
				}
			};
		}]);
