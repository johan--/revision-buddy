'use strict';

/**
 * @ngdoc directive
 * @name revisionbuddyApp.directive:footer
 * @description
 * # footer
 */
angular.module('revisionbuddyApp')
  .directive('footer', function () {
    return {
      template: '<div class="footer">Facing issues? Email us at support@vidyanext.com</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
