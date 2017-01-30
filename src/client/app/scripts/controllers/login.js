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
          if(!buddyapi.revisionpack_subscriptions || buddyapi.revisionpack_subscriptions.length == 0){
            dataLayer.push({
                'event': 'deactivatedUserLogin',
                'username': $scope.userLoginDeatails.user_name
            });
            toastr.error("You haven't subscribed any Revision Pack yet. Please contact Support.","Login failed");
            buddyapi.LogoutUser();
          }
          else{
              dataLayer.push({
                'event': 'loginSuccess',
                'username': $scope.userLoginDeatails.user_name
              });
            //login successful go to home page
            $location.path("/home");
          }
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
