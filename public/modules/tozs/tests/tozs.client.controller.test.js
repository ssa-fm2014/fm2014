'use strict';

(function() {
	// Tozs Controller Spec
	describe('Tozs Controller Tests', function() {
		// Initialize global variables
		var TozsController,
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

			// Initialize the Tozs controller.
			TozsController = $controller('TozsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Toz object fetched from XHR', inject(function(Tozs) {
			// Create sample Toz using the Tozs service
			var sampleToz = new Tozs({
				name: 'New Toz'
			});

			// Create a sample Tozs array that includes the new Toz
			var sampleTozs = [sampleToz];

			// Set GET response
			$httpBackend.expectGET('tozs').respond(sampleTozs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tozs).toEqualData(sampleTozs);
		}));

		it('$scope.findOne() should create an array with one Toz object fetched from XHR using a tozId URL parameter', inject(function(Tozs) {
			// Define a sample Toz object
			var sampleToz = new Tozs({
				name: 'New Toz'
			});

			// Set the URL parameter
			$stateParams.tozId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/tozs\/([0-9a-fA-F]{24})$/).respond(sampleToz);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.toz).toEqualData(sampleToz);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Tozs) {
			// Create a sample Toz object
			var sampleTozPostData = new Tozs({
				name: 'New Toz'
			});

			// Create a sample Toz response
			var sampleTozResponse = new Tozs({
				_id: '525cf20451979dea2c000001',
				name: 'New Toz'
			});

			// Fixture mock form input values
			scope.name = 'New Toz';

			// Set POST response
			$httpBackend.expectPOST('tozs', sampleTozPostData).respond(sampleTozResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Toz was created
			expect($location.path()).toBe('/tozs/' + sampleTozResponse._id);
		}));

		it('$scope.update() should update a valid Toz', inject(function(Tozs) {
			// Define a sample Toz put data
			var sampleTozPutData = new Tozs({
				_id: '525cf20451979dea2c000001',
				name: 'New Toz'
			});

			// Mock Toz in scope
			scope.toz = sampleTozPutData;

			// Set PUT response
			$httpBackend.expectPUT(/tozs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/tozs/' + sampleTozPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid tozId and remove the Toz from the scope', inject(function(Tozs) {
			// Create new Toz object
			var sampleToz = new Tozs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Tozs array and include the Toz
			scope.tozs = [sampleToz];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/tozs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleToz);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.tozs.length).toBe(0);
		}));
	});
}());