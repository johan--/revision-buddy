'use strict';

describe('Service: buddyapiService', function () {

  // load the service's module
  beforeEach(module('revisionbuddyApp'));

  // instantiate service
  var buddyapiService;
  beforeEach(inject(function (_buddyapiService_) {
    buddyapiService = _buddyapiService_;
  }));

  it('should do something', function () {
    expect(!!buddyapiService).toBe(true);
  });

});
