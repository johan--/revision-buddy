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
    $scope.userLoginDeatails = {"user_name":"",password:""};
    $scope.doLogin = function(){
      buddyapi.loginWithUserName($scope.userLoginDeatails)
        .then(function(){
          dataLayer.push({
                    'event': 'loginSuccess',
                    'username': $scope.userLoginDeatails.user_name
                });
          //login successful go to home page
          $location.path("/home");
        },
        function(err){
          //handle error
          console.log(err);
          dataLayer.push({
                    'event': 'loginFailed',
                    'username': $scope.userLoginDeatails.user_name,
                    'error':err.data
                });
          toastr.error("login failed");
        })
    }
  });
