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
      template:
        '<div class="footer">Facing issues? Email us at <a href="mailto:support@vidyanext.com">support@vidyanext.com</a></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
