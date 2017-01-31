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
    //logout the user first it might be possible user reached here by back button
    //buddyapi.LogoutUser();
    $scope.userLoginDeatails = {"user_name":"",password:"",rememberme:true}
    $scope.doLogin = function(){
      //validate form
      if(!$scope.loginForm.$valid){
        //toastr.error("Correct highlighted fields","Login failed - Invalid data");
        $scope.enableValidation = true;
        return;
      }
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
          if(err.status == '401'){
            $scope.loginError = "Login Failed. Invalid username or password";
          }
          else if(err.status == '-1'){
            $scope.loginError = "Error connecting. Please check your intenet connection."
          }
          else{
            $scope.loginError = "Login failed. Something went wrong on the server";
          }
          dataLayer.push({
                    'event': 'loginFailed',
                    'username': $scope.userLoginDeatails.user_name,
                    'error':err.data
                });
          toastr.error(err.data,"Login failed");
        })
    }
  });
