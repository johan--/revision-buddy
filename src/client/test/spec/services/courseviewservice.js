'use strict';

describe('Service: courseViewService', function () {

  // load the service's module
  beforeEach(module('revisionbuddyApp'));

  // instantiate service
  var courseViewService;
  beforeEach(inject(function (_courseViewService_) {
    courseViewService = _courseViewService_;
  }));

  it('should do something', function () {
    expect(!!courseViewService).toBe(true);
  });

});
