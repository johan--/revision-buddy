'use strict';

/**
 * @ngdoc function
 * @name revisionbuddyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the revisionbuddyApp
 */
angular.module('revisionbuddyApp')
  .controller('LoginCtrl', function ($scope,$location,buddyapi) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.doLogin = function(){

    }
  });
