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
    var userLoginDeatails = $scope.userLoginDeatails = {};
    $scope.doLogin = function(){
      buddyapi.loginWithUserName(userLoginDeatails)
        .then(function(){
          //login successful go to home page
          $location.path("/home");
        },
        function(err){
          //handle error
          console.log(err);
        })
    }
  });
