'use strict';

/**
 * @ngdoc directive
 * @name revisionbuddyApp.directive:header
 * @description
 * # header
 */
angular.module('revisionbuddyApp')
  .directive('header', function ($location,buddyapi,courseViewService) {
    return {
      templateUrl:'/views/header.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.isHome = $location.url() === "/home" || $location.url() === "/";
        console.log(scope.isHome);
        if(!scope.isHome){
          scope.courseList =[];
          scope.selectedCourse = courseViewService.selectedPack;
          buddyapi.getRevisionPackData()
            .then(function(rPack){
               scope.courseList = rPack;
            });
        }
        scope.changeCourse = function(course){
            courseViewService.selectRevisionPack(course);
            scope.selectedCourse = courseViewService.selectedPack;
        }
        scope.getSubColor = function(sub){
          console.log("get sub color "+sub);
          var subject = sub.toLowerCase();
            if(subject == "maths"){
              return "#DF6A59";
            }
            else if(subject == "physics"){
              return "#0097A7"
            }
            else if(subject == "biology"){
              return "#26C6DA"
            }
            else if(subject == "chemistry"){
              return "#FFCA28"
            }
            else{
              //TODO: reutrn some default course color.
              return "#DF6A59";
            }
        }
        // var url = $location.url();
        // if(url ==="/login") scope.showHeader = false;
      }
    };
  });
