'use strict';

(function() {
	// Coffees Controller Spec
	describe('Coffees Controller Tests', function() {
		// Initialize global variables
		var CoffeesController,
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

			// Initialize the Coffees controller.
			CoffeesController = $controller('CoffeesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Coffee object fetched from XHR', inject(function(Coffees) {
			// Create sample Coffee using the Coffees service
			var sampleCoffee = new Coffees({
				name: 'New Coffee'
			});

			// Create a sample Coffees array that includes the new Coffee
			var sampleCoffees = [sampleCoffee];

			// Set GET response
			$httpBackend.expectGET('coffees').respond(sampleCoffees);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.coffees).toEqualData(sampleCoffees);
		}));

		it('$scope.findOne() should create an array with one Coffee object fetched from XHR using a coffeeId URL parameter', inject(function(Coffees) {
			// Define a sample Coffee object
			var sampleCoffee = new Coffees({
				name: 'New Coffee'
			});

			// Set the URL parameter
			$stateParams.coffeeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/coffees\/([0-9a-fA-F]{24})$/).respond(sampleCoffee);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.coffee).toEqualData(sampleCoffee);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Coffees) {
			// Create a sample Coffee object
			var sampleCoffeePostData = new Coffees({
				name: 'New Coffee'
			});

			// Create a sample Coffee response
			var sampleCoffeeResponse = new Coffees({
				_id: '525cf20451979dea2c000001',
				name: 'New Coffee'
			});

			// Fixture mock form input values
			scope.name = 'New Coffee';

			// Set POST response
			$httpBackend.expectPOST('coffees', sampleCoffeePostData).respond(sampleCoffeeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Coffee was created
			expect($location.path()).toBe('/coffees/' + sampleCoffeeResponse._id);
		}));

		it('$scope.update() should update a valid Coffee', inject(function(Coffees) {
			// Define a sample Coffee put data
			var sampleCoffeePutData = new Coffees({
				_id: '525cf20451979dea2c000001',
				name: 'New Coffee'
			});

			// Mock Coffee in scope
			scope.coffee = sampleCoffeePutData;

			// Set PUT response
			$httpBackend.expectPUT(/coffees\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/coffees/' + sampleCoffeePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid coffeeId and remove the Coffee from the scope', inject(function(Coffees) {
			// Create new Coffee object
			var sampleCoffee = new Coffees({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Coffees array and include the Coffee
			scope.coffees = [sampleCoffee];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/coffees\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCoffee);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.coffees.length).toBe(0);
		}));
	});
}());