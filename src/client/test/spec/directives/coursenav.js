'use strict';

describe('Directive: coursenav', function () {

  // load the directive's module
  beforeEach(module('revisionbuddyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<coursenav></coursenav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the coursenav directive');
  }));
});
