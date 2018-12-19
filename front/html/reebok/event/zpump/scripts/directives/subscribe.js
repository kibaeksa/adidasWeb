'use strict';

/**
 * @ngdoc directive
 * @name zpumpApp.directive:subscribe
 * @description
 * # subscribe
 */
angular.module('zpumpApp')
		.directive('subscribe', ['subscribe', 'ngDialog', '$timeout', '$rootScope', function (subscribe, ngDialog, $timeout) {
			return {
				restrict: 'A',
				/*scope: {
				 preset: '='
				 },*/
				controller: function ($scope, $attrs) {

					$scope.responseReceived = false;
					$scope.emailFormSuccessful = false;
					$scope.emailFormSubmitted = false;
					$scope.dateNotValid = false;
					$scope.ageNotValid = false;
					$scope.emailNotValid = false;
					$scope.subscribe = {};

					$scope.preset = $scope.$parent.$eval($attrs.preset);

					if ($scope.preset) {
						$scope.subscribe = $scope.preset;
					}

					function isValidDate(year, month, day) {
						var d = new Date(year, month, day);
						if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
							return true;
						}
						return false;
					}

					$scope.formStarted = function (pageClass, overlayEmail) {

						if (overlayEmail === undefined || overlayEmail === false && typeof utag !== 'undefined') {
							//console.log('formStarted');
							//console.log(pageClass, overlayEmail);
							utag.link({
								event_category: 'BRAND|ZPUMP',
								event_name: 'EMAIL SIGNUP',
								signup_location: 'FOOTER',
								signup_step: 'START'
							});
						}

					};

					$scope.submit = function () {

						$scope.emailFormSubmitted = true;
						$scope.responseReceived = false;

						$scope.tempSubscribe = $scope.subscribe;
						$scope.tempSubscribe.birthDate = $scope.subscribe.year + '-' + $scope.subscribe.month + '-' + $scope.subscribe.day;

						var parsedYear = parseInt($scope.subscribe.year);
						var parsedMonth = parseInt($scope.subscribe.month) - 1;
						var parsedDay = parseInt($scope.subscribe.day);

						if (!isValidDate(parsedYear, parsedMonth, parsedDay)) {
							$scope.dateNotValid = true;
						} else {
							$scope.dateNotValid = false;
							/*if (typeof utag !== 'undefined') {
							 utag.link({ event_category: 'BRAND|ZPUMP', event_name: 'EMAIL SIGNUP', signup_location: 'HEADER', signup_step: 'START' });

							 console.log($scope.tempSubscribe.email);
							 }*/

							subscribe.get($scope.subscribe).success(function (data) {
								//  console.log(data);

								switch (data.message) {
									case 'InvalidAge':
										$scope.ageNotValid = true;
										$scope.emailFormSuccessful = false;
										break;
									case 'InvalidEmail':
										$scope.emailNotValid = true;
										$scope.emailFormSuccessful = false;
										break;
									case 'Success':
										$scope.emailFormSuccessful = true;
										$scope.reset(true);
										$timeout(function () {
											ngDialog.close();
										}, 3000);
										break;
								}

								$scope.responseReceived = true;

								if (typeof utag !== 'undefined') {
									// , customer_encrypted_email: '{ENCRYPTED EMAIL ADDRESS}', euci: '{UNIQUE ID}'
									utag.link({
										customer_email: $scope.tempSubscribe.email,
										event_category: 'BRAND|ZPUMP',
										event_name: 'EMAIL SIGNUP',
										signup_location: 'HEADER',
										signup_step: 'SUCCESS'
									});
								}
							})
									.error(function (response) {
										//  console.log(response);
										// ngDialog.close();
										$scope.emailFormSuccessful = false;
										$scope.responseReceived = true;
										$scope.reset(false);
									});
						}


					};

					$scope.reset = function (param) {

						$timeout(function () {
							$scope.$apply(function () {
								$scope.emailFormSubmitted = false;
								$scope.emailFormSuccessful = false;
								$scope.responseReceived = false;
							});
						}, 3000);

						if (param !== false) {
							$scope.subscribe = {};
							$scope.subscribeForm.$setPristine();
						}
					};

				},
				// scope, element, attrs
				link: function postLink() {

				}
			};
		}]);
