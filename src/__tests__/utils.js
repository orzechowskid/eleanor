import utils from '../utils.js';

class MockStore {
    constructor() {
        this.actionHistory = [];
        this.dispatch = jest.fn(function(action) {
            this.actionHistory.push(action);
        });
        this.getState = jest.fn();
    }
};

describe(`the buildRouteMaps function`, function() {
    
});

describe(`the dispatchAction function`, function() {
    const mockRouteMaps = utils.buildRouteMaps([{
        route: `/page1`,
        component: `foo`
    }, {
        route: `/page2`,
        component: `bar`
    }]);
    const mockRoute = `/page1`;
    const mockStore = new MockStore();

    it(`dispatches a Flux Standard Action`, function() {
        utils.dispatchAction(mockRouteMaps, mockRoute, mockStore);

        expect(mockStore.actionHistory.length).toEqual(1);

        const dispatchedAction = mockStore.actionHistory[0];

        expect(dispatchedAction.meta).toBeDefined();
        expect(dispatchedAction.payload).toBeDefined();
        expect(dispatchedAction.type).toBeDefined();
    });
});
