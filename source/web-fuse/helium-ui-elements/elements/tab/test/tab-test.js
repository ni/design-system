import '../tab.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { TabPage } from './tab-page.js';

describe('Tab', () => {
    beforeEach(function () {
        this.page = new TabPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture(`<mc-tab id="mc-security-tab">
                <mc-tab-item name="apikeys" icon="&#xe900" text="API keys"></mc-tab-item>
                <mc-tab-item name="policies" icon="&#xe901" text="Policies"></mc-tab-item>
                <span slot="content-0">My first content</span>
                <span slot="content-1">My second content</span>
            </mc-tab>`);
        });

        it('should show tab', function () {
            let tab = this.page.getTab();

            expect(isVisible(tab)).toBeTruthy();
        });

        it('should show tab items', function () {
            let items = this.page.getTabMenuEntries();

            expect(items.length).toBe(2);
            expect(items[0].textContent).toContain('API keys');
            expect(items[1].textContent).toContain('Policies');
        });

        it('should show content of first tab', function () {
            let contentFirstTab = this.page.getTabContent(0);
            let contentSecondTab = this.page.getTabContent(1);

            expect(isVisible(contentFirstTab)).toBeTruthy();
            expect(isVisible(contentSecondTab)).toBeFalsy();
        });

        it('should show content of second tab after tab change', function () {
            this.page.clickTabMenuEntry(1);

            let contentFirstTab = this.page.getTabContent(0);
            let contentSecondTab = this.page.getTabContent(1);

            expect(isVisible(contentFirstTab)).toBeFalsy();
            expect(isVisible(contentSecondTab)).toBeTruthy();
        });

        it('should show content of second tab after changing active-index attribute', function () {
            this.element.setAttribute('active-index', 1);

            let contentFirstTab = this.page.getTabContent(0);
            let contentSecondTab = this.page.getTabContent(1);

            expect(isVisible(contentFirstTab)).toBeFalsy();
            expect(isVisible(contentSecondTab)).toBeTruthy();
        });

        it('should fire tab-change event on menu entry click', function () {
            let changeEvent;
            this.element.addEventListener('tab-change', function (e) {
                changeEvent = e;
            });

            this.page.clickTabMenuEntry(1);

            expect(changeEvent.detail.name).toBe('policies');
            expect(changeEvent.detail.index).toBe(1);
        });

        it('should fire tab-change event on active-index attribute change', function () {
            let changeEvent;
            this.element.addEventListener('tab-change', function (e) {
                changeEvent = e;
            });

            this.element.setAttribute('active-index', 1);

            expect(changeEvent.detail.name).toBe('policies');
            expect(changeEvent.detail.index).toBe(1);
        });

        it('should fire tab-change event only when active-index actually changed', function () {
            this.element.setAttribute('active-index', 1);

            let changeEvent;
            this.element.addEventListener('tab-change', function (e) {
                changeEvent = e;
            });

            this.element.setAttribute('active-index', 1);

            expect(changeEvent).toBeUndefined();
        });
    });
});
