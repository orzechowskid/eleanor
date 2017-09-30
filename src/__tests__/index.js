import Eleanor from '../index.js';

class MockStore {
    constructor() {
        this.actionHistory = [];
        this.dispatch = jest.fn(function(action) {
            this.actionHistory.push(action);
        });
        this.getState = jest.fn();
    }
};

const MOCK_ROUTES = [{
    route: `/page1`,
    component: `foo`
}, {
    route: `/page2`,
    component: `bar`
}];

describe(`the router constructor`, function() {
    it(`starts routing if the proper option is set at instantiation time`, function() {
        const store = new MockStore();
        const router = new Eleanor({
            initialRoute: `/page1`,
            routes: MOCK_ROUTES,
            startRouting: true,
            store
        });

        window.addEventListener = jest.fn(function() {
            console.log(`hellooo`);
        });
        expect(window.addEventListener).toHaveBeenCalledWith({ foo: `asdf` });
    });

    it(`throws if no store is provided at instantiation time`, function() {
        expect(function() {
            const foo = new Eleanor();
        }).toThrow();
    });
});

describe(`the router's setLocation function`, function() {
    const store = new MockStore();
    const router = new Eleanor({
        initialRoute: `/page1`,
        routes: MOCK_ROUTES,
        startRouting: true,
        store
    });

    it(`calls window.location.assign`, function() {
        window.location.assign = jest.fn();
        router.setLocation(`/page2`);

        expect(window.location.assign).toBeCalledWith(`#/page2`);
    });
});
