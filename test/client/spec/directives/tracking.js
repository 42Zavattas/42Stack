'use strict';

describe('Directive: tracking', function () {

  // load the directive's module
  beforeEach(module('42StackApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tracking></tracking>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tracking directive');
  }));
});
