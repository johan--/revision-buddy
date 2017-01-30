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
        if(!scope.isHome){
          scope.courseList =[];
          scope.selectedCourse = courseViewService.selectedPack;
          buddyapi.getRevisionPackData()
            .then(function(rPack){
               scope.courseList = rPack;
            });
        }
        scope.logout = function(){
          buddyapi.LogoutUser();
          $location.path("/login");
        }
        scope.userObj = buddyapi.getLoggedInUser();
        scope.changeCourse = function(course){
            courseViewService.selectRevisionPack(course);
            scope.selectedCourse = courseViewService.selectedPack;
            //trigger state change to courseViewService
            $location.path("/courseview")
        }
        scope.getSubColor = function(sub){
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

angular.module('revisionbuddyApp').filter('romanize', function() {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(num) {
    if (!+num)
      return num;
    var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
        "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
        "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
    while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }
});
