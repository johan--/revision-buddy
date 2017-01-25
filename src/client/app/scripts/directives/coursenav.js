'use strict';

/**
 * @ngdoc directive
 * @name revisionbuddyApp.directive:coursenav
 * @description
 * # coursenav
 */
angular.module('revisionbuddyApp')
  .directive('coursenav', function ($rootScope,buddyapi,courseViewService) {
    return {
      // template: `<div class="coursenav"></div>`,
      templateUrl:"/views/coursenav.html",
      restrict: 'E',
      scope: {
        courseContent: '=content'
      },
      controller: function($scope) {
        console.log($scope.courseContent);
        $scope.showGView = false;
        //$scope.courseContent = courseViewService.getSelectedRevisionPack();
        $scope.triggerDownload = function(child){
          console.log(child);
          buddyapi.getTOCContentUrl(child.file_name)
            .then(function(pdfUrl){
                var link = document.createElement('a');
                link.href = pdfUrl;
                link.targer = "_self";
                var fname = trim(child.node_name,'"');
                link.download = fname+".pdf";
                document.body.appendChild(link);
                console.log(link);
                link.click();
              },
              function(err){

              });
        }
        function trim(s, mask) {
            while (~mask.indexOf(s[0])) {
                s = s.slice(1);
            }
            while (~mask.indexOf(s[s.length - 1])) {
                s = s.slice(0, -1);
            }
            return s;
        }
        $scope.triggerContentView = function(child){
          buddyapi.getTOCContentUrl(child.file_name)
            .then(function(pdfUrl){
                $scope.gViewUrl = "http://docs.google.com/viewer?url="+encodeURIComponent(pdfUrl)+"&embedded=true";
                console.log($scope.gViewUrl);
                $rootScope.$broadcast('pdfViewChanged',{'gViewUrl':$scope.gViewUrl});
              },
              function(err){

              });
        }
        $scope.outerContentView = function(course){
           if(!(course.children && course.children.length > 0)){
            console.log("will download "+course.file_name);
            console.log(course);
            if(course.file_name){
              $scope.triggerContentView(course);
            }
            else{
              toastr.error("No PDf content Available for this node.")
            }
           }
        }
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
