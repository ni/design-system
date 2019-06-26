import '../toolbar.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { ToolbarPage } from './toolbar-page.js';

describe('Toolbar', () => {
    beforeEach(function () {
        this.page = new ToolbarPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture(`<mc-toolbar>
                <mc-toolbar-item name="new" text="+ New"></mc-toolbar-item>
                <mc-toolbar-item name="upload" text="+ Upload" show-on-mobile="false"></mc-toolbar-item>
            </mc-toolbar>`);
        });

        it('should show toolbar', function () {
            let toolbar = this.page.getToolbar();

            expect(isVisible(toolbar)).toBeTruthy();
        });

        it('should show toolbar items', function () {
            let items = this.page.getToolbarItems();

            expect(items.length).toBe(2);
            expect(items[0].textContent).toBe('+ New');
            expect(items[1].textContent).toBe('+ Upload');
        });

        it('should show icon for toolbar items', function () {
            this.element = createFixture(`<mc-toolbar>
                <mc-toolbar-item name="create" text="Create"></mc-toolbar-item>
                <mc-toolbar-item name="remove" icon="&#xf00d" text="Remove"></mc-toolbar-item>
            </mc-toolbar>`);

            let icons = this.page.getToolbarIcons();

            expect(icons.length).toBe(1);
        });

        it('should show icon on right for toolbar items', function () {
            this.element = createFixture(`<mc-toolbar>
                <mc-toolbar-item name="create" text="Create"></mc-toolbar-item>
                <mc-toolbar-item name="remove" icon="&#xf0d7" icon-position="right" text="Remove"></mc-toolbar-item>
            </mc-toolbar>`);

            let icons = this.page.getToolbarIcons();

            expect(icons.length).toBe(1);
        });

        it('should fire toolbar-item-click event on item click', function () {
            let event = false;
            this.element.addEventListener('toolbar-item-click', function (e) {
                event = e;
            });

            this.page.clickToolbarItem(0);

            expect(event.detail.name).toBe('new');
        });

        it('should not fire toolbar-item-click event when disabled', function () {
            this.element.setAttribute('disabled', 'true');
            let event = false;
            this.element.addEventListener('toolbar-item-click', function (e) {
                event = e;
            });

            this.page.clickToolbarItem(1);

            expect(event).toBe(false);
        });

        it('should disable a single toolbar item', function () {
            this.element = createFixture(`<mc-toolbar>
                <mc-toolbar-item name="new" text="+ New" disabled="true"></mc-toolbar-item>
                <mc-toolbar-item name="upload" text="+ Upload"></mc-toolbar-item>
            </mc-toolbar>`);

            let event = false;
            this.element.addEventListener('toolbar-item-click', function (e) {
                event = e;
            });

            this.page.clickToolbarItem(0);
            expect(event).toBe(false);

            this.page.clickToolbarItem(1);
            expect(event.detail.name).toBe('upload');
        });

        it('should fire toolbar-item-click event on nested toolbar items in a drop-down', function () {
            this.element = createFixture(`<mc-toolbar>
                <mc-toolbar-item name="export" text="Export to CSV" show-on-mobile="false">
                    <mc-toolbar-item name="export-history" text="Export History"></mc-toolbar-item>
                    <mc-toolbar-item name="export-details" text="Export Details"></mc-toolbar-item>
                </mc-toolbar-item>
            </mc-toolbar>`);

            let event = false;
            this.element.addEventListener('toolbar-item-click', function (e) {
                event = e;
            });

            this.page.clickToolbarItem(0);
            expect(event.detail.name).toBe('export');

            this.page.clickDropdownItem(0);
            expect(event.detail.name).toBe('export-history');

            this.page.clickDropdownItem(1);
            expect(event.detail.name).toBe('export-details');
        });
    });
});
