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
        var defer = $q.defer();
        if (service.token) {
            defer.resolve(service.userOtpObj);
        } 
        else {
            var token = $cookies.get('_st');
            if (token) {
                //means user wants to be rememberd
                service.userLoginData = service.userLoginData || {};
                service.userLoginData.rememberme = true;
                service.validateUser(token).then(function(result){
                    defer.resolve(result);
                }, function(err){
                    console.log("Error : ", err);
                    defer.reject(err);
                });
            }
            else{
                //this defer is meant to work auth ngRoute
                //auth resolve.
                defer.reject(new Error("No token found. Please relogin."));
            }
        }
            return defer.promise;
    }
    
    service.validateUser = function(token) {
            var deferred = $q.defer();

            $http.get(myConfig.accountValidationUrl(token),{cache: false})
                .then(function(response) {
                    if (response.data == "Invalid Token") {
                        deferred.reject();
                    }
                    // service.user_name = response.data.token.user_name;
                    // //service.setLoggedInUser(token, response.data.token);
                    // deferred.resolve(response);
                    processSuccessResponse(response,deferred);
                    dataLayer.push({
                        'event': 'loginSuccess',
                        'username': service.username
                    });
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
                    processSuccessResponse(response,deferred);
                },
                function (err) {
                    console.log("Error : ", err);
                    service.otpError = true;
                    deferred.reject(err);
                });

            return deferred.promise;
    }
    function processSuccessResponse(response,deferred){
        service.username = response.data.user.user_name;
        service.firstname =response.data.user.firstname;
        service.lastname = response.data.user.lastname;
        service.revisionpack_subscriptions = response.data.user.revisionpack_subscriptions;
        var userObj = {};
        userObj['username'] = service.username;
        userObj['firstname'] = service.firstname;
        userObj['lastname']  = service.lastname;
        service.setLoggedInUser(response.data.token, userObj);
        getTocContents();
        console.log("user login successful with username and password");
        deferred.resolve(response);
    }
    service.LogoutUser = function(){
        service.token = null;
        service.userOtpObj = null;
        $cookies.remove('_st');
        $cookies.remove('_ttrobj');
        $rootScope.$emit('userLoggedOut');
    }
    service.setLoggedInUser = function(token, userObj) {
            if (service.token != token ) {
                service.token = token;
                service.userOtpObj = userObj;
                if (service.userLoginData.rememberme) {
                    $cookies.put('_st', service.token);
                    $cookies.putObject('_ttrobj', service.userOtpObj);
                }
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
        var defer = $q.defer();
        $q.all(tocPromiseChain).then(function(data) {
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
                    defer.resolve(response.data.signed_request);
                },function(err){
                    defer.reject();
                    console.log("error fetching TOC");
                });
        return defer.promise;
    }
    service.downloadContentPDF = function(filename,downloadname){
        var defer = $q.defer();

        service.getTOCContentUrl(filename)
            .then(function(pdfurl){
                $http({
                    method: 'GET',
                    url: pdfurl,
                    responseType: "blob"
                })
                .then(function(response){
                    toastr.info("Donwloading pdf for "+downloadname)

                    var blob = response.data;
                    var saveBlob = (function (blob,filename) {
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    return function (blob, fileName) {
                        var
                            url = window.URL.createObjectURL(blob);
                        a.href = url;
                        a.download = fileName;
                        a.click();
                        window.URL.revokeObjectURL(url);
                        };
                    }());
                    saveBlob(blob,downloadname);
                    defer.resolve();
                },function(err){
                    defer.reject();
                    console.log("error fetching TOC PDF");
                });       
            },function(err){
                toastr.error("Download pdf failed for "+downloadname+"Error downloading pdf");
            })
         
        
        return defer.promise;
    }
    service.getTutorinfo = function(course_id){
        var defer = $q.defer();
        // find tutor id from course_id
        var tutor_id = "";
        var found = $filter('filter')(service.revisionpack_subscriptions, {'course_id': course_id}, true);
        if (found.length) {
            tutor_id = found[0].tutor_id;
        } else {
            toastr.error("No tutor info available for this course;");
            defer.reject(new Error("No tutor mapping found"));
            return;
        }
        $http({
            method: 'GET',
            url: myConfig.getTutorInfoUrl(tutor_id),
            headers: {
                        'Authorization': 'Bearer ' + service.token
                    }
        })
        
        .then(function(response){
            var data = response.data;
            var profilepicUrl = null;
            if(data.tutor_personaldetails && data.tutor_personaldetails.profilepic){
                profilepicUrl = data.tutor_personaldetails.profilepic[0].url;
            }
            var infoObj = {
                profilepic:profilepicUrl,
                name:data.firstname + " "+ (data.lastname||""),
                location:data.location,
                phoneNumber:data.phone_number,
                email:data.email
            }
            defer.resolve(infoObj);
        },function(err){
            console.log(err);
            defer.reject();
        });
       // defer.resolve(mockTuturInfo);
        return defer.promise;
    }
  });
