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
        $scope.contentParent= courseViewService.getActiveContentParentName();
        //$scope.courseContent = courseViewService.getSelectedRevisionPack();
        $scope.triggerDownload = function(child){
          console.log(child);
            var downloadFileName = child.node_name;
            if(child.parent_name){
              downloadFileName += " - " +child.parent_name;
            }
            downloadFileName+=".pdf";

            buddyapi.downloadContentPDF(child.file_name,downloadFileName)
            .then(function(){
                toastr.success("Pdf download for :"+child.node_name+" successful.","PDF download successful.");
            },function(){
              toastr.error("pdf download failed for "+child.node_name,"Error downloading pdf");
            })
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
          $scope.contentParent = child.parent_name || child.node_name;
          courseViewService.setActiveContent(child);
          buddyapi.getTOCContentUrl(child.file_name)
            .then(function(pdfUrl){
                $scope.gViewUrl = "http://docs.google.com/viewer?url="+encodeURIComponent(pdfUrl)+"&embedded=true";
                console.log($scope.gViewUrl);
                $rootScope.$broadcast('pdfViewChanged',{'gViewUrl':$scope.gViewUrl,'node':child});
              },
              function(err){

              });
        }
        $scope.outerContentView = function(course){
           if(!(course.children && course.children.length > 0)){
            if(course.file_name){
              courseViewService.setActiveContent(course);
              $scope.triggerContentView(course);
            }
            else{
              toastr.error("No PDf content Available for this node.")
            }
           }
        }
        $rootScope.$on('revisionPackageChanged',function(){
          $scope.contentParent = null;
        });
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
