'use strict';

/**
 * @ngdoc overview
 * @name zpumpApp
 * @description
 * # zpumpApp
 *
 * Main module of the application.
 */
angular.module('zpumpApp', [
	'ngCookies',
	'ui.router',
	'ngTouch',
	'ngDialog',
	'adaptive.detection'
])
		.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
			function ($locationProvider, $stateProvider, $urlRouterProvider) {

				$urlRouterProvider.when('', '/');
				$urlRouterProvider.otherwise('/');

				$stateProvider
						.state('home', {
							url: '/',
							templateUrl: 'views/main.html'
						});

				// $locationProvider.html5Mode(true);
			}
		])

		.controller('AppCtrl', ['$scope', '$sce', 'ngDialog', '$rootScope', '$timeout',
			function ($scope, $sce, ngDialog, $rootScope, $timeout) {

				// REMOVE
				$rootScope.RUNLOCAL = true;

				//               On Load
				// ================================================

				// State Change Start
				$rootScope.$on('$stateChangeStart',
						//  event, toState, toParams, fromState
						function () {
							// $rootScope.previousState = fromState.name;
							// $rootScope.currentState = toState.name;

							// console.log($state);
							$scope.getShareUrl();
						}
				);


				$scope.preload = function () {

					var initialImagesToLoad = [
						'../images/background_w_paint_01.jpg',
						'../images/background_w_paint_02.jpg',
						'../images/background_w_paint_03.jpg',
						'../images/background_w_paint_04.jpg',
						'../images/background_w_paint_05.jpg',
						'../images/shoes_01_overlay.png',
						'../images/shoes_01.png',
						'../images/large-pump-hover.png',
						'../images/large-pump-pressed.png'
					];

					$scope.preloadSpecificImage(initialImagesToLoad, 'initialPreloadingDone');

					$rootScope.$on('initialPreloadingDone', function () {

						var imagesToRender = [],
								imgBuffer = [],
								imgLoaded = 0,
								img = undefined;

						// PS BG
						$scope.cnv = $('#aniCanvas')[0];
						$scope.cnv.width = 3585;
						$scope.cnv.height = 5100;
						$scope.ctx = $scope.cnv.getContext('2d');

						$.each(initialImagesToLoad, function (index, step) {

							if ($rootScope.RUNLOCAL) {
								step = step.replace('../', '');
							}

							imagesToRender.push(step);
						});

						// BGs
						var drawImage = function () {

							imgLoaded++;

							if (imgLoaded == 7) {

								var b_img;
								for (var i = 0; i <= 6; i++) {

									b_img = imgBuffer[i];

									if (i <= 4) {
										$scope.ctx.drawImage(b_img, 0, i * 1020, b_img.width, b_img.height);
									} else if (i == 5) {
										$scope.ctx.drawImage(b_img, 0, 0, b_img.width, b_img.height);
									} else if (i == 6 && $rootScope.isSafari) {
										$scope.ctx.drawImage(b_img, 0, 0, b_img.width, b_img.height);
									}
								}
							}
						};

						// only need the layers we are interested in again
						for (var i = 0; i <= 6; i++) {
							img = new Image();
							img.src = imagesToRender[i];
							img.index = i;

							//  this is keyed to initialImagesToLoad[], so keep this organized
							//  BG Images
							switch (i) {
								case 0:
								case 1:
								case 2:
								case 3:
								case 4:
								case 5:
									imgBuffer.push(img);
									img.addEventListener('load', function () {
										drawImage();
									});
									break;
								case 6:
									imgBuffer.push(img);
									img.addEventListener('load', function () {
										drawImage();
										$rootScope.footImage = this;
									});
									break;
							}
						}

						$timeout(function () {
							$scope.activatePage();
						}, 500);

						// load all images
						if ($rootScope.deviceResolution !== 'mobile') {
							$timeout(function () {
								$rootScope.$broadcast('initial-load-finished');
							}, 1000);
						}
					});

				};

				$scope.activatePage = function () {
					$('.main-bg').addClass('active');

					$timeout(function () {
						$('.intro-slide').addClass('active');
					}, 1500);

					$('.zpump-preloader.active').removeClass('active');
				};


				$scope.preloadSpecificImage = function (imageArr, broadcastName) {

					$scope.queue = new window.createjs.LoadQueue(false);

					// QUEUE FACTOIDS
					$.each(imageArr, function (index, step) {
						$scope.queue.loadFile(step);
					});

					$scope.queue.on('complete', function () {
						$rootScope.$broadcast(broadcastName);
					});

					$scope.queue.load();
				};


				//               Variables
				// ================================================
				$scope.emailCaptureForm = {};
				$scope.emailCaptureForm.email = '';


				//               Functions
				// ================================================
				$scope.setPageDetails = function (pageTitle, className) {
					$scope.pagetitle = pageTitle;
					document.title = pageTitle;
					$scope.pageClass = className;
					$scope.setShareTitle();
				};

				$scope.trustSrc = function (src) {
					return $sce.trustAsResourceUrl(src);
				};

				$scope.getIframeSrc = function (videoId, autoplay) {
					if (typeof autoplay === 'undefined') {
						autoplay = 0;
					}
					return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId + '?enablejsapi=1&origin=' + location.origin + '&rel=0&hd=1&autohide=1&modestbranding=1&autoplay=' + autoplay);
				};

				$scope.renderHtml = function (html) {
					return $sce.trustAsHtml(html);
				};


				// ================================================
				// ================================================
				function _preCloseCallback() {
					$('body').removeClass('ngdialog-open');
					$scope.overlayEmail = false;
					$rootScope.$broadcast('ngdialogclosed');

					$timeout(function () {
						$scope.$apply(function () {
							$rootScope.ngdialogopened = false;
						});
					});

					return true;
				}

				$scope.openVideoDialog = function (videoId, videoName) {
					$scope.videoId = videoId;
					$scope.videoName = videoName;

					$('.scene').removeClass('active');

					var dialog = ngDialog.open({
						template: 'views/_components/video-dialog.html',
						className: 'ngdialog-theme-plain',
						appendTo: 'html.zpump',
						scope: $scope,
						preCloseCallback: _preCloseCallback
					});

					dialog.closePromise.then(function () {
						try {
							if (utag_data.hasOwnProperty('video_event')) {
								utag.link({video_event: 'video_close'});
							}
						} catch (e) {
						}
					});
				};

				// e, $dialog
				$rootScope.$on('ngDialog.opened', function () {
					$('.ngdialog-close').html('<i class="icon icon-svg-close-c"></i><svg><rect x="0" y="0" fill="none" width="50" height="50"></rect></svg>');
					$('.ngdialog-close').on('click', function () {
						ngDialog.closeAll();
						$('.scene').addClass('active');
					});
					$rootScope.$broadcast('ngdialogopened');
					$rootScope.ngdialogopened = true;

					$timeout(function () {
						// add this functionality
						// addThis.init();
					}, 300);

				});

				$scope.emailCaptureDialog = function () {

					// console.log('emailCaptureDialog called');

					$scope.subscribe = {};
					$scope.subscribe.email = $scope.emailCaptureForm.email;
					$scope.overlayEmail = true;

					$('.scene').removeClass('active');

					ngDialog.open({
						template: 'views/_components/email-capture-dialog.html',
						className: 'ngdialog-theme-plain',
						appendTo: 'html.zpump',
						scope: $scope,
						preCloseCallback: _preCloseCallback
					});
				};

				// ================================================
				// ================================================


				$scope.getShareUrl = function () {
					$rootScope.shareUrl = location.protocol + '//' + location.host + location.pathname;
				};

				$scope.setShareTitle = function () {
					$rootScope.shareTitle = document.title;
				};


				// page ready
				$rootScope.$watch('deviceResolution', function () {
					if ('deviceResolution' in $rootScope) {
						if ($rootScope.deviceResolution !== 'mobile') {
							$scope.preload();
						} else {
							$scope.activatePage();
						}
					}
				}, true);
			}
		]);
