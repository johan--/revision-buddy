'use strict';

/**
 * @ngdoc directive
 * @name revisionbuddyApp.directive:coursenav
 * @description
 * # coursenav
 */
angular.module('revisionbuddyApp')
  .directive('coursenav', function (courseViewService) {
    return {
      // template: `<div class="coursenav"></div>`,
      templateUrl:"/views/coursenav.html",
      restrict: 'E',
      scope: {
        courseContent: '=content'
      },
      controller: function($scope) {
        console.log($scope.courseContent);
        //$scope.courseContent = courseViewService.getSelectedRevisionPack();
        $scope.triggerDownload = function(child){
          alert(child.node_name);
        }
        $scope.triggerContentView = function(child){
          alert(child.node_name);
        }
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
