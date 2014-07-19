'use strict';

(function() {
	// Benes Controller Spec
	describe('Benes Controller Tests', function() {
		// Initialize global variables
		var BenesController,
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

			// Initialize the Benes controller.
			BenesController = $controller('BenesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bene object fetched from XHR', inject(function(Benes) {
			// Create sample Bene using the Benes service
			var sampleBene = new Benes({
				name: 'New Bene'
			});

			// Create a sample Benes array that includes the new Bene
			var sampleBenes = [sampleBene];

			// Set GET response
			$httpBackend.expectGET('benes').respond(sampleBenes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.benes).toEqualData(sampleBenes);
		}));

		it('$scope.findOne() should create an array with one Bene object fetched from XHR using a beneId URL parameter', inject(function(Benes) {
			// Define a sample Bene object
			var sampleBene = new Benes({
				name: 'New Bene'
			});

			// Set the URL parameter
			$stateParams.beneId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/benes\/([0-9a-fA-F]{24})$/).respond(sampleBene);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bene).toEqualData(sampleBene);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Benes) {
			// Create a sample Bene object
			var sampleBenePostData = new Benes({
				name: 'New Bene'
			});

			// Create a sample Bene response
			var sampleBeneResponse = new Benes({
				_id: '525cf20451979dea2c000001',
				name: 'New Bene'
			});

			// Fixture mock form input values
			scope.name = 'New Bene';

			// Set POST response
			$httpBackend.expectPOST('benes', sampleBenePostData).respond(sampleBeneResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bene was created
			expect($location.path()).toBe('/benes/' + sampleBeneResponse._id);
		}));

		it('$scope.update() should update a valid Bene', inject(function(Benes) {
			// Define a sample Bene put data
			var sampleBenePutData = new Benes({
				_id: '525cf20451979dea2c000001',
				name: 'New Bene'
			});

			// Mock Bene in scope
			scope.bene = sampleBenePutData;

			// Set PUT response
			$httpBackend.expectPUT(/benes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/benes/' + sampleBenePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid beneId and remove the Bene from the scope', inject(function(Benes) {
			// Create new Bene object
			var sampleBene = new Benes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Benes array and include the Bene
			scope.benes = [sampleBene];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/benes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBene);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.benes.length).toBe(0);
		}));
	});
}());