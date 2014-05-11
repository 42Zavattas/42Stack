'use strict';

describe('Service: Resetsocket', function () {

	// load the service's module
	beforeEach(module('42StackApp'));

	// instantiate service
	var Resetsocket;
	beforeEach(inject(function (_Resetsocket_) {
		Resetsocket = _Resetsocket_;
	}));

	it('should do something', function () {
		expect(!!Resetsocket).toBe(true);
	});

});
