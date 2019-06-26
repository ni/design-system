import '../banner.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { BannerPage } from './banner-page.js';

describe('Banner', () => {
    beforeEach(function () {
        this.page = new BannerPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture('<mc-banner close-button-text="OK" visible></mc-banner>');
        });

        it('should show banner', function () {
            let banner = this.page.getBanner();

            expect(isVisible(banner)).toBeTruthy();
        });

        it('should be hidden by default', function () {
            createFixture('<mc-banner close-button-text="OK"></mc-banner>');

            let banner = this.page.getBanner();

            expect(isVisible(banner)).toBeFalsy();
        });

        it('should show OK button', function () {
            let button = this.page.getOkButton();

            expect(isVisible(button)).toBeTruthy();
            expect(button.textContent).toBe('OK');
        });

        it('should close banner on ok', function () {
            this.page.clickOk();

            let banner = this.page.getBanner();
            expect(isVisible(banner)).toBeFalsy();
        });

        it('should fire event on ok click', function () {
            let clicked = false;
            this.element.addEventListener('banner-close', function () {
                clicked = true;
            });

            this.page.clickOk();

            expect(clicked).toBeTruthy();
        });

        it('should not close banner on ok click when event was cancelled', function () {
            this.element.addEventListener('banner-close', function (evt) {
                evt.preventDefault();
            });

            this.page.clickOk();

            let banner = this.page.getBanner();
            expect(isVisible(banner)).toBeTruthy();
        });
    });

    describe('Custom banner content', () => {
        beforeEach(function () {
            this.element = createFixture(`
                <mc-banner visible close-button-text="OK">
                    <span slot="content">This site uses cookies. Happy browsing!!!</span>
                </mc-banner>`
            );
        });

        it('should show custom content', function () {
            let span = document.querySelector('span[slot="content"]');

            expect(span.innerHTML).toBe('This site uses cookies. Happy browsing!!!');
        });
    });
});
