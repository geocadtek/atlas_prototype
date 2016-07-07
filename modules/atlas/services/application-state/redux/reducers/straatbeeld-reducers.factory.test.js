describe('The straatbeeldReducers factory', function () {
    var straatbeeldReducers,
        defaultState,
        inputStateWithStraatbeeld;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_straatbeeldReducers_, _DEFAULT_STATE_) {
            straatbeeldReducers = _straatbeeldReducers_;
            defaultState = _DEFAULT_STATE_;
        });

        inputStateWithStraatbeeld = angular.copy(defaultState);

        inputStateWithStraatbeeld.straatbeeld = {
            id: 1,
            location: null,
            camera: {
                location: [51.0, 4.0],
                heading: 1,
                pitch: 2,
                fov: 3
            },
            isLoading: false
        };
    });

    describe('FETCH_STRAATBEELD', function () {
        describe('can have a reference to a panorama scene', function () {
            it('by ID', function () {
                var inputState = angular.copy(defaultState),
                    output;

                output = straatbeeldReducers.FETCH_STRAATBEELD(inputState, 123);

                expect(output.straatbeeld.id).toBe(123);
                expect(output.straatbeeld.location).toBeNull();
            });

            it('or by location', function () {
                var inputState = angular.copy(defaultState),
                    output;

                output = straatbeeldReducers.FETCH_STRAATBEELD(inputState, [52.987, 4.321]);

                expect(output.straatbeeld.id).toBeNull();
                expect(output.straatbeeld.location).toEqual([52.987, 4.321]);
            });
        });

        it('resets the (previous) camera location', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.straatbeeld = {
                id: 122,
                camera: {
                    location: [52.123, 4.789],
                    heading: 0,
                    pitch: 0,
                    fov: 60
                },
                isLoading: false
            };

            output = straatbeeldReducers.FETCH_STRAATBEELD(inputState, 123);
            expect(output.straatbeeld.camera.location).toBeNull();
        });

        it('sets a loading indicator for straatbeeld and the map', function () {
            var inputState = angular.copy(defaultState),
                output;

            output = straatbeeldReducers.FETCH_STRAATBEELD(inputState, 123);

            expect(output.straatbeeld.isLoading).toBe(true);
            expect(output.map.isLoading).toBe(true);
        });

        it('remembers the heading, pitch and fov from the oldState', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.straatbeeld = {
                id: 122,
                camera: {
                    location: [52.123, 4.789],
                    heading: 100,
                    pitch: 101,
                    fov: 102
                },
                isLoading: false
            };

            output = straatbeeldReducers.FETCH_STRAATBEELD(inputState, 123);

            expect(output.straatbeeld.camera.heading).toBe(100);
            expect(output.straatbeeld.camera.pitch).toBe(101);
            expect(output.straatbeeld.camera.fov).toBe(102);
        });

        it('removes the highlighted object from the map', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.map.highlight = {some: 'object'};

            output = straatbeeldReducers.FETCH_STRAATBEELD(inputState, 123);

            expect(output.map.highlight).toBeNull();
        });

        it('resets search, detail and page', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.search = {some: 'object'};
            inputState.detail = {some: 'object'};
            inputState.page = 'somePage';

            output = straatbeeldReducers.FETCH_STRAATBEELD(inputState, 123);

            expect(output.search).toBeNull();
            expect(output.detail).toBeNull();
            expect(output.page).toBeNull();
        });
    });

    describe('SHOW_STRAATBEELD', function () {
        var showStraatbeeldPayload;

        beforeEach(function () {
            showStraatbeeldPayload = {
                id: 98765,
                camera: {
                    location: [51.5, 4.5],
                    heading: 7,
                    pitch: 8,
                    fov: 9
                }
            };
        });

        it('sets the ID when searching by location and it removes the search location', function () {
            var inputState = angular.copy(inputStateWithStraatbeeld),
                output;

            inputState.straatbeeld.id = null;
            inputState.straatbeeld.location = [52.4, 4.52];

            output = straatbeeldReducers.SHOW_STRAATBEELD(inputState, showStraatbeeldPayload);

            expect(output.straatbeeld.id).toBe(98765);
            expect(output.straatbeeld.location).toBeNull();
        });

        it('removes the loading indicators from the map and straatbeeld', function () {
            var inputState = angular.copy(inputStateWithStraatbeeld),
                output;

            inputState.map.isLoading = true;
            inputState.straatbeeld.isLoading = true;

            output = straatbeeldReducers.SHOW_STRAATBEELD(inputStateWithStraatbeeld, showStraatbeeldPayload);

            expect(output.map.isLoading).toBe(false);
            expect(output.straatbeeld.isLoading).toBe(false);
        });

        it('sets the heading, pitch and fov if there is no previous value known', function () {
            var inputState = angular.copy(inputStateWithStraatbeeld),
                output;

            delete inputState.straatbeeld.camera.heading;
            delete inputState.straatbeeld.camera.pitch;
            delete inputState.straatbeeld.camera.fov;

            output = straatbeeldReducers.SHOW_STRAATBEELD(inputState, showStraatbeeldPayload);

            expect(output.straatbeeld.camera.heading).toBe(7);
            expect(output.straatbeeld.camera.pitch).toBe(8);
            expect(output.straatbeeld.camera.fov).toBe(9);
        });

        it('won\'t set the heading, pitch and fov if there is a previous value known', function () {
            var inputState = angular.copy(inputStateWithStraatbeeld),
                output;

            output = straatbeeldReducers.SHOW_STRAATBEELD(inputState, showStraatbeeldPayload);

            expect(output.straatbeeld.camera.heading).toBe(1);
            expect(output.straatbeeld.camera.pitch).toBe(2);
            expect(output.straatbeeld.camera.fov).toBe(3);
        });
    });
});