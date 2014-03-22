'use strict';

describe('Directive: flash', function () {

  // load the directive's module
  beforeEach(module('42StackApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<flash></flash>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the flash directive');
  }));
});
