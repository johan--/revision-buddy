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
      console.log($scope.revisionCourse);
      $scope.frameUrl = "/views/selectcourse.html";
      $scope.showGView = false;
      $scope.showCollapseCourseNav = false;

      $scope.toggleCollapseCourseNav = function(){
          $scope.showCollapseCourseNav = !$scope.showCollapseCourseNav;
      }
      $scope.downloadpdf = function(){
        buddyapi.getTOCContentUrl($scope.contentNode.file_name)
            .then(function(pdfUrl){
                var link = document.createElement('a');
                link.href = pdfUrl;
                link.targer = "_self";
                link.download = $scope.contentNode.file_name+".pdf";
                document.body.appendChild(link);
                console.log(link);
                link.click();
              },
              function(err){

              });
      }
      $rootScope.$on('revisionPackageChanged', function () {
        //update rev package this trigger course nav redraw
        $scope.revisionCourse = courseViewService.selectedPack;
        $scope.showGView = false;
        $scope.loadingpdf = false;
        console.log("package changed")
        console.log($scope.revisionCourse);
      });
      $rootScope.$on('pdfViewChanged', function (event,data) {
          $scope.loadingpdf = true;
          $scope.gViewUrl = data.gViewUrl;
          $scope.contentNode = data.node;
          $scope.contentTitle = $scope.contentNode.node_name;
          $scope.showGView = true;
          $scope.showCollapseCourseNav = false;
      });

      $window.pdfLoaded=function(){
        if(!$scope.$$phase) {
          //$digest or $apply
          $scope.$apply(function(){
            $scope.loadingpdf = false;
          })
        }
      }
  });
