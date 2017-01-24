'use strict';

/**
 * @ngdoc service
 * @name revisionbuddyApp.buddyapiService
 * @description
 * # buddyapiService
 * Service in the revisionbuddyApp.
 */ 
angular.module('revisionbuddyApp')
  .service('buddyapi', function ($http,$location,$q,courseViewService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /**
     * details of logged in user if any
     */
    var userDetails = null;

    var mocked_user = {user_name: "luke",
                        firstname: "luke",
                        lastname: "skywalker",
                        email: "luke_skywalker@starfleet.com",
                        email_confirmed: true,
                        phone_number: "1234567890",
                        phone_number_confirmed: true,
                        active: true,
                        parent_lead_id: "",
                        parent_name: "darth vader",
                        course_subscriptions: [
                            {
                                course_id: "CBSE X MATHS",
                                tutor_id: "obi-wan"
                            },
                            {
                                course_id: "CBSE X MATHS",
                                tutor_id: "obi-wan"
                            }
                          ]
                        }

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
    this.getLoggedInUser = function(){
      return userDetails;
    }
    /**
     * accepts token validates against local token and agaisnt api
     */
    this.validateUser = function(token){
      //do api call to validate the user token
      var userDetails = mocked_user;
      getTocContents();
      defer.resolve(userDetails);
      return defer.promise;
    }
    /**
     * var userData = {"username":"","password": $scope.loginPassword }
     */
    this.loginWithUserName = function(userLoginDetails){
      var defer = $q.defer();
      //do api call to loign
      //make call to getTocContents
      //for now mocking
      var userDetails = mocked_user;
      getTocContents();
      defer.resolve(userDetails);
      return defer.promise;
    }
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

    this.getRevisionPackData = function(){
      var defer = $q.defer();
      //do api call to fetch revsion packs 
      //for now mocking
      
      defer.resolve(mockedRevisionPacks);
      return defer.promise;
    }
  });
