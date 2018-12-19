'use strict';

/**
 * @ngdoc service
 * @name zpumpApp.slider
 * @description
 * # slider
 * Factory in the zpumpApp.
 */
angular.module('zpumpApp')
		.factory('sliderapi', ['$http', '$rootScope', function ($http, $rootScope) {

// Public API here
			return {
				get: function () {

					var serviceURL = '/Global/ExtensionModules/ZPumpFusionExtensionMod/module.json';
					// if local
					if ($rootScope.RUNLOCAL) {
						serviceURL = 'scripts/data/slider.json';
					}

					return $http.get(serviceURL, {cache: true});
				}
			};

		}]);
