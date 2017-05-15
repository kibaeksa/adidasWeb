'use strict';

/**
 * @ngdoc directive
 * @name zpumpApp.directive:slider
 * @description
 * # slider
 */

angular.module('zpumpApp')
		.directive('slider', ['sliderapi', '$timeout', '$rootScope', function (sliderapi, $timeout, $rootScope) {
			return {
				restrict: 'A',
				controller: function ($scope) {

					// scroll settings
					$scope.lastAnimation = 0;
					$scope.quietPeriod = 750;
					$scope.animationTime = 1000;
					$rootScope.deltaChangeVar = 1;

					$scope.currentPage = 0;
					$scope.currentSlide = '.slide-0';
					$scope.xPos = 2315;
					$scope.yPos = 0;
					$scope.currentID = 0;
					$scope.scale = 1;
					$scope.alreadyLoadedBG = 1;

					// main.body
					$scope.elementToMove = '';
					$scope.in2p5 = false;

					$scope.initialLoad = true;
					// $scope.slides;

					// , .canvas-wrapper
					$scope.elementsToMove = '.main-bg, .slider';
					$scope.secondaryElementsToMove = $('.canvas-wrapper');
					$scope.canvasTopValue = -300;

					$scope.firstSlideAction = true;

					$scope.positionArray = [
						//{x: 2315, y: 50, trackName: 'HOME'},
						{x: 2315, y: 0, trackName: 'HOME'},
						{x: 2315, y: -895, trackName: 'TECHNOLOGY'},
						{x: 900, y: -1355, trackName: 'CUSTOMFIT'},
						{x: 2600, y: -1795, trackName: 'FUSESTOFOOT'},
						{x: 1740, y: -2625, trackName: 'ULTIMATEHANDLING'},
						{x: 1230, y: -3785, trackName: 'PUMPTOLAUNCH'},
						{x: 1230, y: -3785}
					];

					// resolve dependencies
					$scope.resolve = function () {

						 if ($rootScope.RUNLOCAL) {
							sliderapi.get()
									.success(function (data) {
										if ((!$rootScope.RUNLOCAL && data.defaultProperties.slides) || ($rootScope.RUNLOCAL && data.slides)) {
											// $scope.slides = sliderapi.formatData(data.slides);

											$scope.slides = data.slides;
											$rootScope.languageObj = data.language;
											window.scvsrcid = $rootScope.languageObj.scvsrcid;
											window.emailID = $rootScope.languageObj.emailID;

											$timeout(function () {

												$(document).ready(function () {
													$scope.init();
													$scope.initialLoad = false;
												});
											}, 10);

										}
									})
									.error(function (data) {
										console.log(data);
									});

						} else {
							$scope.slides = window.jsonData.slides;
							$rootScope.languageObj = window.jsonData.language;
							window.scvsrcid = $rootScope.languageObj.scvsrcid;
							window.emailID = $rootScope.languageObj.emailID;


							$timeout(function () {
								$(document).ready(function () {
									$scope.init();
									$scope.initialLoad = false;
								});
							}, 10);
						}

					};


					// initialize slider
					$scope.init = function () {

						if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
							$('.menu').css('-webkit-filter', 'none');
						}

						$('body').addClass('initial-slide');

						// var responsiveHeight = $(window).height();
						var responsiveHeight = window.innerHeight;

						if ($rootScope.deviceResolution &&
								$rootScope.deviceResolution === 'desktop') {
							// set background
							$scope.setBg();
							$scope.setSlidePositions();
						} else {
							$('html.zpump .module.slider .scene, html.zpump .body').css('height', responsiveHeight);
						}

						//  bind scroll to anchor links
						$('.scroll-to-cta').on('mouseup', function (e) {
							e.preventDefault();

							var $this = $(this);
							$scope.slideAction(parseInt($this.attr('data-to')));

							if ($this.hasClass('animatedpump:not(.lastpump)')) {

								if (typeof utag !== 'undefined') {
									utag.link({
										event_category: 'BRAND|ZPUMP',
										event_name: 'CLICKPUMP|' + $scope.positionArray[$scope.currentID - 1].trackName
									});
									$scope.lastTracked = $scope.current;
								}
							}

							return false;
						});


						$('.zpumplogo').on('mouseup', function (e) {
							e.preventDefault();

							var $this = $(this);
							$scope.slideAction($this.attr('data-to'));

							return false;
						});

						$('.last-pump').on('mouseup', function (e) {
							e.preventDefault();

							$('html,body').animate({
								scrollTop: $('.prefooter').offset().top
							}, 400);

							$scope.alreadySlided = true;
							$scope.trackEnd();

							if (typeof utag !== 'undefined') {
								utag.link({event_category: 'BRAND|ZPUMP', event_name: 'CLICKPUMP|PUMPTOLAUNCH'});
								$scope.lastTracked = $scope.current;
							}

							return false;
						});

						$('.prefooter-nav-button').on('mouseup', function (e) {
							e.preventDefault();

							var $this = $(this);
							$scope.slideAction($this.attr('data-to'));

							$timeout(function () {
								$('html,body').animate({
									scrollTop: $('.prefooter').offset().top
								}, 400);
							}, 50);

							$scope.alreadySlided = true;
							$scope.trackEnd();

							return false;
						});

						$rootScope.currentSlideName = $scope.positionArray[$scope.currentID].trackName;
						
                        $( '#noUi-slider' ).noUiSlider({
                            start: 1,
                            step: 1,
                            behaviour: 'drag-tap',
                            orientation: 'vertical',
                            range: {
                                min: 1,
                                max: 6
                            }
                        }).on('slide', function() {
                            var val = parseInt($( '#noUi-slider' ).val());
                            $scope.slideAction(val - 1, false);
                        }).on('set', function() {

                                var val = parseInt($( '#noUi-slider' ).val());

                                if (val >= $scope.positionArray.length - 1) {
                                    $(this).parent().addClass('hidden');
                                } else {
                                    $(this).parent().removeClass('hidden');
                                }
                        });
					};


					$scope.slideAction = function (dataTo, isSlide) {

						var timeNow = new Date().getTime();
						if (timeNow - $scope.lastAnimation < $scope.quietPeriod + $scope.animationTime) {
							if (isSlide) {
								return;
							}
						}

						if (dataTo >= $scope.slides.length) {
							return false;
						}

						if ($scope.firstSlideAction) {
							$scope.firstSlideAction = false;

							$timeout(function () {
								$('body').addClass('removeCanvas');
								$('.canvas-wrapper').remove();
							}, 200);
						}

						var responsiveHeight = window.innerHeight;

						$scope.currentID = dataTo;

						if ($scope.currentID === 0) {
							$('.zpumplogo').removeClass('active');
						} else {
							$('.zpumplogo').addClass('active');
						}
						var id = '.slide-' + $scope.currentID;
						// return if clicked on the same, don't do anything

						if ($scope.currentSlide === id) {
							return false;
						}

						$('.scene').css('z-index', 1);
						$(id).css('z-index', 100);

						if (id === '.slide-0') {
							$('body').addClass('initial-slide');
						} else {
							$('body').removeClass('initial-slide');
						}

						$('.main-bg').css('overflow', 'visible');

						if ($rootScope.deviceResolution && $rootScope.deviceResolution === 'desktop') {
							$scope.xPos = $scope.positionArray[$scope.currentID].x;
							$scope.yPos = $scope.positionArray[$scope.currentID].y;
							var yVal = parseInt($scope.yPos * $scope.scale);
							if (yVal > 0) {
								yVal = 84;
							}

							var xVal = $scope.getLeftPosition() + 'px';
							TweenMax.to('.main-bg, .slider', 0.7, {
								y: yVal + 'px',
								x: xVal,
								z: 0.01,
								ease: Quad.easeOut
							});
						} else {
							TweenMax.to($scope.elementsToMove, 0.7, {
								y: parseInt(-1 * $scope.currentID * responsiveHeight) + 'px',
								ease: Quad.easeOut
							});
						}

						$('.main-bg').css('overflow', 'hidden');

						$timeout(function () {
							$scope.$apply(function () {

								var currentPageInternal = parseInt($scope.currentID);
								$timeout(function () {
									$scope.currentPage = parseInt($scope.currentID);
								}, 500);
								$scope.currentSlide = id;

								$('html, body').stop().animate({scrollTop: 0}, 0);

								if (currentPageInternal + 1 === $scope.slides.length) {
									//$timeout(function() {}, 500);
									$('body').addClass('footer-in-view');
									$('html, body').stop().animate({scrollTop: 0}, 0);
									$scope.onLastPage = true;

								} else {
									$scope.onLastPage = false;
									$('body').removeClass('footer-in-view');
								}
							});
						}, 0);
						$scope.trackSlide();
						$scope.lastAnimation = timeNow;

						$('#noUi-slider').val($scope.currentID + 1);
					};

					// setBg
					$scope.setBg = function () {
						// get screen
						var viewHeight = $(window).height();

						$scope.scale = viewHeight / 900;

						if ($scope.scale > 1.15) {
							$scope.scale = 1.15;
						} else if ($scope.scale < 0.85) {
							$scope.scale = 0.85;
						}

						$('.main-bg').css({
							'width': parseInt(3585 * $scope.scale),
							'height': parseInt(5100 * $scope.scale)
						});

						// concrete-bg offset
						$('#aniCanvas').css({
							'margin-top': parseInt($scope.canvasTopValue * $scope.scale)
						});


						// intro canvas
						$('#intro-canvas').css({
							'width': parseInt(3585 * $scope.scale),
							'height': parseInt(1275 * $scope.scale)
						});

						$('.canvas-wrapper').css({
							'width': parseInt(3585 * $scope.scale),
							'height': parseInt(5100 * $scope.scale)
						});

						// set max height on the body
						$('html.zpump .body').css({
							'max-height': viewHeight,
							'height': viewHeight
						});

						$('.main-bg').css('overflow', 'visible');

						var yVal = parseInt($scope.yPos * $scope.scale);
						if (yVal > 0) {
							yVal = 84;
						}

						var xVal = $scope.getLeftPosition() + 'px';
						var shoeXVal = $scope.getLeftPosition() + parseInt($scope.scale * 2);

						TweenMax.to($scope.elementsToMove, 0, {y: yVal + 'px', x: xVal, z: 0.01});

						$scope.secondaryElementsToMove.animate({
							marginTop: (yVal - Math.abs(parseInt($scope.canvasTopValue)) * $scope.scale),
							marginLeft: shoeXVal + 'px'
						}, 0);

						$('.main-bg').css('overflow', 'hidden');
					};

					// setSlidePositions
					$scope.setSlidePositions = function () {

						var $windowR = $(window);
						var viewWidth = $windowR.width();
						var viewHeight = $windowR.height();
						for (var i = 0; i < 6; i++) {
							var tempName = '.slide-' + i;
							var tempMarginTop = $scope.positionArray[i].y;

							// console.log(tempMarginTop * $scope.scale);
							var tempMarginLeft = $scope.positionArray[i].x;
							var wOffset = (tempMarginLeft * $scope.scale);
							tempMarginLeft = wOffset - (viewWidth * 0.5);

							$(tempName).css({
								'top': parseInt(-tempMarginTop * $scope.scale) + 'px',
								'left': parseInt(tempMarginLeft) + 'px',
								'width': viewWidth + 'px',
								'height': viewHeight + 'px',
								'position': 'absolute'
							});
						}

					};

					$(window).resize(function () {

						if ($rootScope.deviceResolution &&
								$rootScope.deviceResolution === 'desktop') {
							$scope.setBg();
							$scope.setSlidePositions();
						}

					});

					$scope.getLeftPosition = function () {
						var $windowR = $(window);
						var viewWidth = $windowR.width();
						var wOffset = ($scope.xPos * $scope.scale);
						var leftVar = -wOffset + (viewWidth * 0.5);
						return parseInt(leftVar);
					};

					$scope.initScroll = function (event, delta) {

						var deltaOfInterest = delta;
						var timeNow = new Date().getTime();
						// Cancel scroll if currently animating or within quiet period
						if (timeNow - $scope.lastAnimation < $scope.quietPeriod + $scope.animationTime) {
							event.preventDefault();
							return;
						}

						if (deltaOfInterest <= ($rootScope.deltaChangeVar * -1)) {
							$scope.goToPage('next');
						} else if (deltaOfInterest >= $rootScope.deltaChangeVar) {
							$scope.goToPage('prev');
						}
						$scope.lastAnimation = timeNow;

					};

					$scope.goToPage = function (direction) {

						if (typeof $scope.slides === 'undefined' || typeof $scope.slides.length === 'undefined' ||
								(parseInt($scope.currentID) === 0 && direction === 'prev') ||
								(parseInt($scope.currentID) + 1 === $scope.slides.length && direction === 'next')) {
							// console.log('aborted');
							return false;
						}

						var goTo;

						if (direction === 'next') {
							goTo = parseInt($scope.currentID) + 1;
						} else {
							goTo = parseInt($scope.currentID) - 1;
						}
						// trigger
						//$('.slider-controller .scroll-to-cta[data-to=\'' + goTo + '\']').trigger('mouseup');
						$scope.slideAction(goTo);
					};

					// tracking slide
					$scope.trackSlide = function () {
						var prepareTagObj = {};
						var slideName = $scope.positionArray[$scope.currentID].trackName;

						$rootScope.currentSlideName = slideName;

						prepareTagObj.page_category = 'RUNNING';
						prepareTagObj.page_name = slideName;
						prepareTagObj.page_type = 'SECTION_LANDING';

						$scope.track(prepareTagObj);
					};

					// tracking end
					$scope.trackEnd = function () {
						var prepareTagObj = {};

						prepareTagObj.page_category = 'RUNNING';
						prepareTagObj.page_name = 'END';
						prepareTagObj.page_type = 'SECTION_LANDING';

						$scope.track(prepareTagObj);
					};

					$scope.track = function (trackingObj) {

						if (typeof utag !== 'undefined') {
							utag.view(trackingObj);
						}
					};

					$scope.resolve();

				},

				// scope, element, attrs
				link: function postLink($scope) {


					$(document).keyup(function (e) {
						if (e.keyCode === 37 || e.keyCode === 38) {
							$scope.goToPage('prev');
						} else if (e.keyCode === 39 || e.keyCode === 40) {
							$scope.goToPage('next');
						}
					});

					$(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {


						var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
						if (!$scope.onLastPage) {
							event.preventDefault();
							$scope.initScroll(event, delta);
						}

						if ($scope.onLastPage && $rootScope.deviceResolution === 'desktop') {
							var deltaOfInterest = delta;
							var timeNow = new Date().getTime();

							if (!$scope.alreadySlided) {
								// Cancel scroll if currently animating or within quiet period
								if (timeNow - $scope.lastAnimation < $scope.quietPeriod + $scope.animationTime) {
									event.preventDefault();
									return;
								}
							}

							var $viewport = $('html,body');

							if (deltaOfInterest <= ($rootScope.deltaChangeVar * -1)) {
								if (!$scope.alreadySlided) {

									// check if not animating
									if (!$viewport.hasClass('animating') && (deltaOfInterest * -1) < 100) {
										$viewport.addClass('animating');
										$viewport.stop().animate({
											scrollTop: 100
										}, 100, function () {
											$timeout(function () {
												$viewport.removeClass('animating');
											}, 100);
										});
									}

									$timeout(function () {
										$scope.alreadySlided = true;
									}, 1);
								}

							} else if (deltaOfInterest >= $rootScope.deltaChangeVar) {
								if ($scope.alreadySlided) {

									// check if not animating
									if (!$viewport.hasClass('animating')) {
										if ($('body').scrollTop() < 150) {
											$viewport.addClass('animating');
											$viewport.stop().animate({
												scrollTop: 0
											}, 100, function () {
												$timeout(function () {
													$viewport.removeClass('animating');
												}, 100);
											});

											$timeout(function () {
												$scope.alreadySlided = false;
											}, 1);
										}
									}
								} else {
									$scope.goToPage('prev');
								}
							}
							$scope.lastAnimation = timeNow;
						}


					});


					$('main.body').swipe({
						// Generic swipe handler for all directions
						// event, direction, distance, duration, fingerCount, fingerData
						swipe: function (event, direction) {
							// alert(direction);
							// console.log(direction);
							if (!$rootScope.ngdialogopened) {
								if (direction === 'down') {
									$scope.goToPage('prev');
								} else if (direction === 'up') {
									if ($scope.onLastPage) {
										$('html, body').stop().animate({scrollTop: $('.prefooter').offset().top}, 1000);
									}
									$scope.goToPage('next');
								}
							}

						},
						//Default is 75px, set to 0 for demo so any distance triggers swipe
						threshold: 0
					});
				}
			};
		}]);
