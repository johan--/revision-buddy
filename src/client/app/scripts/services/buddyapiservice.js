'use strict';

/**
 * @ngdoc service
 * @name revisionbuddyApp.buddyapiService
 * @description
 * # buddyapiService
 * Service in the revisionbuddyApp.
 */ 
angular.module('revisionbuddyApp')
  .service('buddyapi', function ($rootScope,$http,$location,$q,$cookies,$filter,myConfig,courseViewService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /**
     * details of logged in user if any
     */
    var userDetails = null;
    var service = this;
    service.revisionpacks = [];
    this.getLoggedInUser = function(){
      if (service.token) {
                return service.userOtpObj;
            } else {
                var token = $cookies.get('_st');
                if (token) {
                  service.validateUser(token).then(function(result){
                      return result;
                  }, function(err){
                      console.log("Error : ", err);
                  });
                }
            }
            return null;
    }
    service.validateUser = function(token) {
            var deferred = $q.defer();

            $http.get(myConfig.accountValidationUrl(token),{cache: false})
                .then(function(response) {
                    console.log(response);
                    if (response.data == "Invalid Token") {
                        deferred.reject();
                    }
                    service.user_name = response.data.token.user_name;
                    //service.setLoggedInUser(token, response.data.token);
                    deferred.resolve(response);
                }, function(err) {
                    console.log("Error : ", err);
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    /**
     * var userData = {"user_name":"","password": $scope.loginPassword }
     */
    service.loginWithUserName = function(userLoginData){
            var deferred = $q.defer();
            service.userLoginData = userLoginData;
            $http({
                method: 'POST',
                url: myConfig.loginWithUserNameUrl(),
                data: service.userLoginData,
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    service.username = response.data.user.user_name;
                    service.firstname =response.data.user.firstname;
                    service.lastname = response.data.user.lastname;
                    service.revisionpack_subscriptions = response.data.user.revisionpack_subscriptions
                    console.log(response.data.user);
                    var userObj = {};
                    userObj['username'] = service.username;
                    userObj['firstname'] = service.firstname;
                    userObj['lastname']  = service.lastname;
                    service.setLoggedInUser(response.data.token, userObj);
                    getTocContents();
                    console.log("user login successful with username and password");
                    deferred.resolve(response);
                },
                function (err) {
                    console.log("Error : ", err);
                    service.otpError = true;
                    deferred.reject(err);
                });

            return deferred.promise;
    }
    service.setLoggedInUser = function(token, userObj) {
            if (service.token != token) {
                service.token = token;
                service.userOtpObj = userObj;
                $cookies.put('_st', service.token);
                $cookies.putObject('_ttrobj', service.userOtpObj);
                $rootScope.$emit('userChanged', {
                    data: userObj
                });
            }
        };
    /**
     * iterates over course_ids in userData 
     * and fetches courseDetails 
     * used as one time activity will be called by validate and login  functions
     */
    var getTocContents = function(){
    //   //makes call to api server to get course Deatils
    //   //update course list here and in courseViewService
        var tocPromiseChain = service.revisionpack_subscriptions.map(getTocPromise)
        console.log("promise chain");
        console.log(tocPromiseChain);
        var defer = $q.defer();
        $q.all(tocPromiseChain).then(function(data) {
            console.log("ALL INITIAL PROMISES RESOLVED");
            console.log(data);
            defer.resolve(data);
        });
        return defer.promise;
    }
    var getTocPromise = function(rObj){
        var defer = $q.defer();
        $http({
                    method: 'GET',
                    url: myConfig.getTocUrl(rObj.course_id),
                    headers: {
                        'Authorization': 'Bearer ' + service.token
                    }
                })
                .then(function(response){
                    console.log("revision packs");
                    console.log(response.data);
                    service.revisionpacks.push(response.data);
                    defer.resolve(response.data);
                },function(err){
                    defer.reject();
                    console.log("error fetching TOC");
                });
        return defer.promise;
    }
    service.getRevisionPackData = function(){
      return getTocContents();
    }
    service.getTOCContentUrl = function(filename){
        var defer = $q.defer();
         $http({
                    method: 'GET',
                    url: myConfig.getTocpdfUrl(filename),
                    headers: {
                        'Authorization': 'Bearer ' + service.token
                    }
                })
                .then(function(response){
                    console.log("get pdf url");
                    console.log(response.data);
                    defer.resolve(response.data.signed_request);
                },function(err){
                    defer.reject();
                    console.log("error fetching TOC");
                });
        return defer.promise;
    }
    service.getContentPDF = function(pdfurl){
        var defer = $q.defer();
        console.log("request url --> "+pdfurl);
         $http({
                    method: 'GET',
                    url: pdfurl
                })
                .then(function(response){
                    console.log("PDF blob");
                    console.log(response);
                },function(err){
                    defer.reject();
                    console.log("error fetching TOC PDF");
                });
        return defer.promise;
    }
    service.getTutorinfo = function(course_id){
        var defer = $q.defer();
        // var mockTuturInfo = {
        //     username:ObiWan,
        //     profilepicUrl:"",
        //     phoneNumber:"9988776655",
        //     email:"ObiWan@starfleet.com"
        // }
        // find tutor id from course_id
        console.log(service.revisionpack_subscriptions);
        var tutor_id = "";
        var found = $filter('filter')(service.revisionpack_subscriptions, {'course_id': course_id}, true);
        if (found.length) {
            //$scope.selected = JSON.stringify(found[0]);
            tutor_id = found[0].tutor_id;
            alert(tutor_id);
        } else {
            toastr.error("No tutor info available for this course;");
            defer.reject(new Error("No tutor mapping found"));
            return;
        }
        $http({
            method: 'GET',
            url: myConfig.getTutorInfoUrl(tutor_id)
        })
        .then(function(response){
            defer.resolve(response);
        },function(err){
            console.log(err);
            defer.reject();
        });
       // defer.resolve(mockTuturInfo);
        return defer.promise;
    }
  });
