'use strict';

/**
 * @ngdoc function
 * @name revisionbuddyApp.controller:TutorinfoCtrl
 * @description
 * # TutorinfoCtrl
 * Controller of the revisionbuddyApp
 */
angular.module('revisionbuddyApp')
  .controller('TutorinfoCtrl', function ($scope,buddyapi,courseViewService) {
    console.log("from tutoro")
      var course_id = courseViewService.getSelectedRevisionPack().course_id;
      
      $scope.tutorinfo = {};
      buddyapi.getTutorinfo(course_id)
        .then(function(tutorinfo){
          $scope.tutorinfo = tutorinfo;
        },function(err){
          console.log("error fetchign tutor info ");
          console.log(err);
          toastr.error("Error fetching tutor info")
        })
  });
