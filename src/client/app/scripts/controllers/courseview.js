'use strict';

/**
 * @ngdoc function
 * @name revisionbuddyApp.controller:CourseviewCtrl
 * @description
 * # CourseviewCtrl
 * Controller of the revisionbuddyApp
 */
angular.module('revisionbuddyApp')
  .controller('CourseviewCtrl', function ($scope,buddyapi,courseViewService) {
      // see if there is course selected by user
      $scope.revisionCourse = courseViewService.selectedPack;
      $scope.$watch('revisionCourse', function (newVal, oldVal, scope) {
        if(newVal){
          $scope.revisionCourse = newVal;
        }  
      });
  });
