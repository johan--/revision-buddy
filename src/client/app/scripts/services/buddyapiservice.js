'use strict';

/**
 * @ngdoc service
 * @name revisionbuddyApp.buddyapiService
 * @description
 * # buddyapiService
 * Service in the revisionbuddyApp.
 */ 
angular.module('revisionbuddyApp')
  .service('buddyapi', function ($rootScope,$http,$location,$q,$cookies,myConfig,courseViewService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /**
     * details of logged in user if any
     */
    var userDetails = null;
    var mockedRevisionPacks = [
                            {
                              board : "CBSE",
                              class : "10",
                              subject: "Maths",
                              course_id:"maths_cbse_10",
                              content: [{
                                  node_name: "Unit-1",
                                  file_name: "someguid",
                                  file_type: "pdf",
                                  children: [
                                    {
                                          node_name: "Revision Notes - chapter 1",
                                          file_name: "someGuid",
                                          file_type: "pdf"
                                      },
                                      {
                                          node_name: "Revision Notes - chapter 2",
                                          file_name: "someGuid",
                                          file_type: "pdf"
                                      }
                                    ]
                              },
                              {
                                  node_name: "Unit-2",
                                  file_name: "someguid",
                                  file_type: "pdf",
                                  children: [
                                    {
                                          node_name: "Revision Notes - chapter 1",
                                          file_name: "someGuid",
                                          file_type: "pdf"
                                      },
                                      {
                                          node_name: "Revision Notes - chapter 2",
                                          file_name: "someGuid",
                                          file_type: "pdf"
                                      }
                                    ]
                              }
                              ]
                          },
                          {
                              board : "CBSE",
                              class : "10",
                              subject: "Physics",
                              course_id:"phy_cbse_10",
                              content: [{
                                  node_name: "Unit-1",
                                  file_name: "someguid",
                                  file_type: "pdf",
                                  children: [
                                    {
                                          node_name: "Revision Notes - chapter 1",
                                          file_name: "someGuid",
                                          file_type: "pdf"
                                      },
                                      {
                                          node_name: "Revision Notes - chapter 2",
                                          file_name: "someGuid",
                                          file_type: "pdf"
                                      }
                                    ]
                              },
                              {
                                  node_name: "Unit-2",
                                  file_name: "someguid",
                                  file_type: "pdf",
                                  children: [
                                    {
                                          node_name: "Revision Notes - chapter 1",
                                          file_name: "someGuid",
                                          file_type: "pdf"
                                      },
                                      {
                                          node_name: "Revision Notes - chapter 2",
                                          file_name: "someGuid",
                                          file_type: "pdf"
                                      }
                                    ]
                              }
                              ]
                          },
                          {
                              board : "CBSE",
                              class : "10",
                              subject: "Chemistry",
                              course_id:"chem_cbse_10",                              
                              content: [{
                                  node_name: "Unit-1",
                                  file_name: "someguid",
                                  file_type: "pdf",
                                  children: [
                                {
                                      node_name: "Revision Notes - chapter 1",
                                      file_name: "someGuid",
                                      file_type: "pdf"
                                  },
                              {
                                      node_name: "Revision Notes - chapter 2",
                                      file_name: "someGuid",
                                      file_type: "pdf"
                                  }
                                    ]
                              }]
                          },
                          {
                              board : "CBSE",
                              class : "10",
                              subject: "Biology",
                              course_id:"bio_cbse_10",                              
                              content: [{
                                  node_name: "Unit-1",
                                  file_name: "someguid",
                                  file_type: "pdf",
                                  children: [
                                {
                                      node_name: "Revision Notes - chapter 1",
                                      file_name: "someGuid",
                                      file_type: "pdf"
                                  },
                              {
                                      node_name: "Revision Notes - chapter 2",
                                      file_name: "someGuid",
                                      file_type: "pdf"
                                  }
                                    ]
                              }]
                          }
                          ]
    var service = this;
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
    //   var defer = $q.defer();
    //   //do api call to loign
    //   //make call to getTocContents
    //   //for now mocking
    //   var userDetails = mocked_user;
    //   getTocContents();
    //   defer.resolve(userDetails);
    //   return defer.promise;
    //make a call to identity login API
            var deferred = $q.defer();
            service.userLoginData = userLoginData;
            console.log("logging with");
            console.log(service.userLoginData);
            $http({
                method: 'POST',
                url: myConfig.loginWithUserNameUrl(),
                data: service.userLoginData,
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    //service.user_name = response.data.user.user_name;
                    console.log(response.data.user);
                    service.hideNavbar = false;
                    service.setLoggedInUser(response.data.token, userLoginData);
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
      //makes call to api server to get course Deatils
      //update course list here and in courseViewService
      courseViewService.updateRevisionPackList(mockedRevisionPacks);
    }

    service.getRevisionPackData = function(){
      var defer = $q.defer();
      //do api call to fetch revsion packs 
      //for now mocking
      
      defer.resolve(mockedRevisionPacks);
      return defer.promise;
    }
  });
