'use strict';

(function() {
	// Filesystems Controller Spec
	describe('Filesystems Controller Tests', function() {
		// Initialize global variables
		var FilesystemsController,
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

			// Initialize the Filesystems controller.
			FilesystemsController = $controller('FilesystemsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Filesystem object fetched from XHR', inject(function(Filesystems) {
			// Create sample Filesystem using the Filesystems service
			var sampleFilesystem = new Filesystems({
				name: 'New Filesystem'
			});

			// Create a sample Filesystems array that includes the new Filesystem
			var sampleFilesystems = [sampleFilesystem];

			// Set GET response
			$httpBackend.expectGET('filesystems').respond(sampleFilesystems);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.filesystems).toEqualData(sampleFilesystems);
		}));

		it('$scope.findOne() should create an array with one Filesystem object fetched from XHR using a filesystemId URL parameter', inject(function(Filesystems) {
			// Define a sample Filesystem object
			var sampleFilesystem = new Filesystems({
				name: 'New Filesystem'
			});

			// Set the URL parameter
			$stateParams.filesystemId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/filesystems\/([0-9a-fA-F]{24})$/).respond(sampleFilesystem);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.filesystem).toEqualData(sampleFilesystem);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Filesystems) {
			// Create a sample Filesystem object
			var sampleFilesystemPostData = new Filesystems({
				name: 'New Filesystem'
			});

			// Create a sample Filesystem response
			var sampleFilesystemResponse = new Filesystems({
				_id: '525cf20451979dea2c000001',
				name: 'New Filesystem'
			});

			// Fixture mock form input values
			scope.name = 'New Filesystem';

			// Set POST response
			$httpBackend.expectPOST('filesystems', sampleFilesystemPostData).respond(sampleFilesystemResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Filesystem was created
			expect($location.path()).toBe('/filesystems/' + sampleFilesystemResponse._id);
		}));

		it('$scope.update() should update a valid Filesystem', inject(function(Filesystems) {
			// Define a sample Filesystem put data
			var sampleFilesystemPutData = new Filesystems({
				_id: '525cf20451979dea2c000001',
				name: 'New Filesystem'
			});

			// Mock Filesystem in scope
			scope.filesystem = sampleFilesystemPutData;

			// Set PUT response
			$httpBackend.expectPUT(/filesystems\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/filesystems/' + sampleFilesystemPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid filesystemId and remove the Filesystem from the scope', inject(function(Filesystems) {
			// Create new Filesystem object
			var sampleFilesystem = new Filesystems({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Filesystems array and include the Filesystem
			scope.filesystems = [sampleFilesystem];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/filesystems\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFilesystem);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.filesystems.length).toBe(0);
		}));
	});
}());