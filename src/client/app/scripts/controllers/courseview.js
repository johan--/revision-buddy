'use strict';

/**
 * @ngdoc function
 * @name revisionbuddyApp.controller:CourseviewCtrl
 * @description
 * # CourseviewCtrl
 * Controller of the revisionbuddyApp
 */
angular.module('revisionbuddyApp')
  .controller('CourseviewCtrl', function ($scope,$rootScope,buddyapi,courseViewService) {
      // see if there is course selected by user
      $scope.revisionCourse = courseViewService.selectedPack;
      $rootScope.$on('revisionPackageChanged', function () {
        //update rev package this trigger course nav redraw
        $scope.revisionCourse = courseViewService.selectedPack;
        console.log("package changed")
        console.log($scope.revisionCourse);
      });
      $rootScope.$on('pdfViewChanged', function (event,data) {
          console.log("event pdf");
          console.log(data);
          $scope.gViewUrl = data.gViewUrl;
         $scope.showGView = true;
      })
  });
