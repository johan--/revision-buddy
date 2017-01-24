'use strict';

/**
 * @ngdoc service
 * @name revisionbuddyApp.buddyapiService
 * @description
 * # buddyapiService
 * Service in the revisionbuddyApp.
 */ 
angular.module('revisionbuddyApp')
  .service('buddyapi', function ($http,$location,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /**
     * details of logged in user if any
     */
    var userDetails = null;
    this.getLoggedInUser = function(){
      return userDetails;
    }
    /**
     * accepts token validates against local token and agaisnt api
     */
    this.validateUser = function(token){

    }
    /**
     * var userData = {"username":"","password": $scope.loginPassword }
     */
    this.login = function(userLoginDetails){
      var defer = $q.defer();
      //do api call to loign 
      //for now mocking
      return defer.promise;
    
    }
  });
