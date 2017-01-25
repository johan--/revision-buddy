'use strict';

/**
 * @ngdoc function
 * @name revisionbuddyApp.controller:CourseviewCtrl
 * @description
 * # CourseviewCtrl
 * Controller of the revisionbuddyApp
 */
angular.module('revisionbuddyApp')
  .controller('CourseviewCtrl', function ($scope,$rootScope,$window,buddyapi,courseViewService) {
      // see if there is course selected by user
      $scope.revisionCourse = courseViewService.selectedPack;
      $scope.frameUrl = "/views/selectcourse.html";
      $rootScope.$on('revisionPackageChanged', function () {
        //update rev package this trigger course nav redraw
        $scope.revisionCourse = courseViewService.selectedPack;
        console.log("package changed")
        console.log($scope.revisionCourse);
      });
      $rootScope.$on('pdfViewChanged', function (event,data) {
          $scope.loadingpdf = true;
          $scope.gViewUrl = "/views/selectcourse.html";
          console.log("event pdf");
          console.log(data);
          $scope.gViewUrl = data.gViewUrl;
         $scope.showGView = true;
      });

      $window.pdfLoaded=function(){
        $scope.$apply(function(){
          $scope.loadingpdf = false;
        })
      }
  });
