'use strict';

(function() {
	// Tracelogs Controller Spec
	describe('Tracelogs Controller Tests', function() {
		// Initialize global variables
		var TracelogsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Tracelogs controller.
			TracelogsController = $controller('TracelogsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Tracelog object fetched from XHR', inject(function(Tracelogs) {
			// Create sample Tracelog using the Tracelogs service
			var sampleTracelog = new Tracelogs({
				name: 'New Tracelog'
			});

			// Create a sample Tracelogs array that includes the new Tracelog
			var sampleTracelogs = [sampleTracelog];

			// Set GET response
			$httpBackend.expectGET('tracelogs').respond(sampleTracelogs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tracelogs).toEqualData(sampleTracelogs);
		}));

		it('$scope.findOne() should create an array with one Tracelog object fetched from XHR using a tracelogId URL parameter', inject(function(Tracelogs) {
			// Define a sample Tracelog object
			var sampleTracelog = new Tracelogs({
				name: 'New Tracelog'
			});

			// Set the URL parameter
			$stateParams.tracelogId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/tracelogs\/([0-9a-fA-F]{24})$/).respond(sampleTracelog);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tracelog).toEqualData(sampleTracelog);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Tracelogs) {
			// Create a sample Tracelog object
			var sampleTracelogPostData = new Tracelogs({
				name: 'New Tracelog'
			});

			// Create a sample Tracelog response
			var sampleTracelogResponse = new Tracelogs({
				_id: '525cf20451979dea2c000001',
				name: 'New Tracelog'
			});

			// Fixture mock form input values
			scope.name = 'New Tracelog';

			// Set POST response
			$httpBackend.expectPOST('tracelogs', sampleTracelogPostData).respond(sampleTracelogResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Tracelog was created
			expect($location.path()).toBe('/tracelogs/' + sampleTracelogResponse._id);
		}));

		it('$scope.update() should update a valid Tracelog', inject(function(Tracelogs) {
			// Define a sample Tracelog put data
			var sampleTracelogPutData = new Tracelogs({
				_id: '525cf20451979dea2c000001',
				name: 'New Tracelog'
			});

			// Mock Tracelog in scope
			scope.tracelog = sampleTracelogPutData;

			// Set PUT response
			$httpBackend.expectPUT(/tracelogs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/tracelogs/' + sampleTracelogPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid tracelogId and remove the Tracelog from the scope', inject(function(Tracelogs) {
			// Create new Tracelog object
			var sampleTracelog = new Tracelogs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Tracelogs array and include the Tracelog
			scope.tracelogs = [sampleTracelog];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/tracelogs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTracelog);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.tracelogs.length).toBe(0);
		}));
	});
}());