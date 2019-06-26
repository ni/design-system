import { Router } from '../Router.js';

describe('Router', () => {
    describe('Basic Navigation', () => {
        it('should fire navigation event if the current location is different to the initialized location', function () {
            let navigationEvent = false;

            new Router({ pathname: '/data/files' }, '/data/tags')
                .route(/files/, () => {
                    navigationEvent = true;
                })
                .listen();

            expect(navigationEvent).toBeTruthy();
        });

        it('should NOT fire navigation event if the current location is the initialized location', function () {
            let navigationEvent = false;

            new Router({ pathname: '/data/tags' }, '/data/tags')
                .route(/.*/, () => {
                    navigationEvent = true;
                })
                .listen();

            expect(navigationEvent).toBeFalsy();
        });

        it('navigateTo should fire event', function () {
            let navigationEvent = false;

            let router = new Router({ pathname: '/data/tags' }, '/data/tags')
                .route(/.*/, () => {
                    navigationEvent = true;
                });

            router.navigateTo('/data/files');

            expect(navigationEvent).toBeTruthy();
        });

        it('navigateTo should NOT fire event if path has not changed', function () {
            let navigationEvent = false;

            let router = new Router({ pathname: '/data/tags' }, '/data/tags')
                .route(/.*/, () => {
                    navigationEvent = true;
                });

            router.navigateTo('/data/tags');

            expect(navigationEvent).toBeFalsy();
        });

        it('navigateTo should fire event of first matching route', function () {
            let navigationEvent = false;

            let router = new Router({ pathname: '/data/tags' }, '/data/tags')
                .route(/not matching/, () => {
                })
                .route(/data\/files/, () => {
                    navigationEvent = true;
                });

            router.navigateTo('/data/files');

            expect(navigationEvent).toBeTruthy();
        });

        it('navigateTo should fire event with match details', function () {
            let matchedRoute = false;

            let router = new Router({ pathname: '/data/tags' }, '/data/tags')
                .route(/data\/files\/(.*)/, (e) => {
                    matchedRoute = e[0];
                });

            router.navigateTo('/data/files/1234');

            expect(matchedRoute).toBe('1234');
        });
    });

    describe('History', () => {
        async function clickBrowserButton (click) {
            let promise = new Promise((resolve, reject) => {
                window.addEventListener('popstate', function (e) {
                    resolve();
                });
            });
            click();
            return promise;
        }

        async function clickBrowserBackButton () {
            return clickBrowserButton(() => window.history.back());
        }

        async function clickBrowserForwardButton () {
            return clickBrowserButton(() => window.history.forward());
        }

        it('should store history on navigation', async function () {
            let backNavigationEvent = false;

            let router = new Router({ pathname: '/data/files' }, '/data/tags')
                .route(/data\/files/, (e) => {
                    backNavigationEvent = e;
                })
                .listen();

            router.navigateTo('/data/files');
            router.navigateTo('/data/storage');

            await clickBrowserBackButton();

            expect(backNavigationEvent).toBeTruthy();
        });

        it('should store multiple history entries', async function () {
            let matchedRoute = false;

            let router = new Router({ pathname: '/data/files' }, '/data/tags')
                .route(/(.*)/, (e) => {
                    matchedRoute = e[0];
                })
                .listen();

            router.navigateTo('/data/files');
            router.navigateTo('/data/storage');
            router.navigateTo('/data/files');

            await clickBrowserBackButton();
            expect(matchedRoute).toBe('/data/storage');

            await clickBrowserBackButton();
            expect(matchedRoute).toBeTruthy('/data/files');

            await clickBrowserForwardButton();
            expect(matchedRoute).toBe('/data/storage');
        });
    });
});
