'use strict';

/**
 * @ngdoc service
 * @name zpumpApp.bmhtracking
 * @description
 * # tracking
 * Factory in the zpumpApp.
 */
angular.module('zpumpApp')
		.factory('tracking', ['$rootScope',
			function ($rootScope) {

				return {
					init: function () {
						var isMobile = {
							is_mobile: ($rootScope.deviceResolution === 'desktop') ? false : true
						};
						angular.extend(utag_data, isMobile);
					},
					track: function (trackingObj) {

						if (typeof utag !== 'undefined') {
							//  console.log(trackingObj);
							utag.view(trackingObj);
						}

					}
				};
			}

		]);