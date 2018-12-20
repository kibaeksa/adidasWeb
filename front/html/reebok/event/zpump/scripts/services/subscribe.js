'use strict';

/**
 * @ngdoc service
 * @name zpumpApp.subscribe
 * @description
 * # subscribe
 * Factory in the zpumpApp.
 */
angular.module('zpumpApp')
		.factory('subscribe', ['$http', '$locale', '$cookies', '$rootScope', function ($http, $locale, $cookies) {

			// Public API here
			return {

				get: function (getObject) {
					getObject.emailPageId = window.emailID;
					getObject.scvsrcid = window.scvsrcid;
					getObject.storeid = '0';
					getObject.device = 'desktop';

					//  console.log(getObject.emailPageId);
					//  console.log(getObject.scvsrcid);
					var locale = 'en';


					if (typeof window.Reebok !== 'undefined') {
						if ('currentBreakpoint' in window.Reebok.Core) {
							getObject.device = window.Reebok.Core.currentBreakpoint;
						}

						if ('languageBranch' in window.Reebok.siteInfo) {
							locale = window.Reebok.siteInfo.languageBranch;
						}
					}

					var serviceURL = '/api/Newsletter/Signup/';

					return $http({
						url: serviceURL,
						method: 'GET',
						params: getObject,
						headers: {
							'token': $cookies.seasurf_token,
							'locale': locale    // 'locale': $locale.id
						}
					});
				}
			};
		}]);
