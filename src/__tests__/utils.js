/* eslint-env jest */
/* eslint func-names: off */

import {
    buildRouteMaps,
    dispatchAction
} from '../utils';

class MockStore {
    constructor() {
        this.actionHistory = [];
        this.dispatch = jest.fn(function(action) {
            this.actionHistory.push(action);
        });
        this.getState = jest.fn();
    }
}

describe(`the buildRouteMaps function`, function() {
    
});

describe(`the dispatchAction function`, function() {
    const mockRouteMaps = buildRouteMaps([{
        route: `/page1`,
        component: `foo`
    }, {
        route: `/page2`,
        component: `bar`
    }, {
        route: `/page3/id/:id/details`,
        component: `baz`
    }]);
    let mockStore = null;

    beforeEach(function() {
        mockStore = new MockStore();
    });

    it(`dispatches a Flux Standard Action`, function() {
        dispatchAction(mockRouteMaps, `/page1`, mockStore);

        expect(mockStore.actionHistory.length).toEqual(1);

        const dispatchedAction = mockStore.actionHistory[0];

        expect(dispatchedAction.meta).toBeDefined();
        expect(dispatchedAction.payload).toBeDefined();
        expect(dispatchedAction.type).toBeDefined();
    });

    it(`dispatches an action with a 'meta' field of the correct shape`, function() {
        dispatchAction(mockRouteMaps, `/page3/id/foobar/details`, mockStore);

        expect(mockStore.actionHistory.length).toEqual(1);

        const dispatchedAction = mockStore.actionHistory[0];

        expect(dispatchedAction.meta.path).toEqual(`/page3/id/foobar/details`);
        expect(dispatchedAction.meta.routeParams).toEqual({
            id: `foobar`
        });
    });

    it(`does nothing if a matching route isn't found`, function() {
        dispatchAction(mockRouteMaps, `/nooooooope`, mockStore);

        expect(mockStore.actionHistory.length).toEqual(0);
    });
});
