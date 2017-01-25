'use strict';

describe('Controller: TutorinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('revisionbuddyApp'));

  var TutorinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TutorinfoCtrl = $controller('TutorinfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TutorinfoCtrl.awesomeThings.length).toBe(3);
  });
});
