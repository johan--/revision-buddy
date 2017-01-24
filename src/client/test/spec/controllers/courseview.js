'use strict';

describe('Controller: CourseviewCtrl', function () {

  // load the controller's module
  beforeEach(module('revisionbuddyApp'));

  var CourseviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CourseviewCtrl = $controller('CourseviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
