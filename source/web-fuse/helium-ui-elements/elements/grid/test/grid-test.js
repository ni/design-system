import '../grid.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { GridPage } from './grid-page.js';

describe('SL Grid', () => {
    let generateItems = function (count) {
        let result = [];
        for (let i = 1; i <= count; i++) {
            result.push({
                id: i,
                name: 'webapp ' + i,
                nameUrl: 'https://www.systemlinkcloud.com/' + i,
                sharing: 'public',
                dateCreated: new Date(2019, 2, 3, 14, 1, 1, 123),
                update: 'UPDATE'
            });
        }
        return result;
    };

    let loadItems = function (totalCount, page, pageSize, sortBy, sortOrder) {
        let allItems = generateItems(totalCount);
        if (sortBy === 'name' && sortOrder === 'desc') {
            allItems.reverse();
        }

        let startIndex = (page - 1) * pageSize;
        let endIndex = page * pageSize;
        return allItems.slice(startIndex, endIndex);
    };

    let isCellVisible = function (cell) {
        return window.getComputedStyle(cell).getPropertyValue('width') !== '0px';
    };

    beforeEach(function () {
        localStorage.clear();
        this.page = new GridPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-grid page-size="5" locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
                   <sl-grid-column type="checkbox" name="selection" width="35px"></sl-grid-column>
                   <sl-grid-column type="icon-menu" name="edit" width="30px" icon="&#xf013;">
                     <sl-grid-column-item name="rename" title="Rename"></sl-grid-column-item>
                     <sl-grid-column-item name="delete" title="Delete"></sl-grid-column-item>
                     <sl-grid-column-item name="modify-policy" title="Modify security policy"></sl-grid-column-item>
                   </sl-grid-column>
                   <sl-grid-column type="icon" name="share" width="30px" icon="&#xf1e0;"></sl-grid-column>
                   <sl-grid-column type="url" name="name" title="Name" field="name"></sl-grid-column>
                   <sl-grid-column type="text" optional="true" name="sharing" title="Sharing" field="sharing" width="100px" show-on-mobile="false"></sl-grid-column>
                   <sl-grid-column type="date" optional="true" show="false" name="dateCreated" title="Date added" field="dateCreated" width="200px" show-on-mobile="false"></sl-grid-column>
                   <sl-grid-column type="button" name="update" title="" field="update" width="100px" show-on-mobile="false"></sl-grid-column>
                 </sl-grid>`);
            this.element.data = {
                items: loadItems(11, 1, 5),
                totalCount: 11
            };
            this.element.addEventListener('grid-update-data', (e) => {
                let page = e.detail.page;
                let pageSize = e.detail.pageSize;
                let sortBy = e.detail.sortBy;
                let sortOrder = e.detail.sortOrder;
                this.element.data = {
                    items: loadItems(11, page, pageSize, sortBy, sortOrder),
                    totalCount: 11
                };
            });
        });

        it('should show grid', function () {
            let main = this.page.getMain();

            expect(isVisible(main)).toBeTruthy();
        });

        it('should render header', function () {
            let headerTexts = this.page.getHeaderTexts();

            expect(headerTexts[0].textContent).toBe('');
            expect(headerTexts[1].textContent).toBe('');
            expect(headerTexts[2].textContent).toBe('');
            expect(headerTexts[3].textContent).toBe('Name');
            expect(headerTexts[4].textContent).toBe('Sharing');
            expect(headerTexts[5].textContent).toBe('Date added');
            expect(headerTexts[6].textContent).toBe('');
        });

        it('should render url cell', function () {
            let cell = this.page.getCell(0, 3);
            let link = this.page.getLink(cell);

            expect(link.textContent).toBe('webapp 1');
            expect(link.href).toBe('https://www.systemlinkcloud.com/1');
        });

        it('should render text cell', function () {
            let cell = this.page.getCell(0, 4);
            expect(cell.textContent).toBe('public');
        });

        it('should render date cell', function () {
            let cell = this.page.getCell(0, 5);
            expect(cell.textContent).toBe('Mar 3, 2019 at 2:01 PM');
        });

        it('should render button cell', function () {
            let cell = this.page.getCell(0, 6);
            let button = this.page.getButton(cell);

            expect(button.textContent).toBe('UPDATE');
        });

        it('should render checkbox cell', function () {
            let cell = this.page.getCell(0, 0);
            let checkbox = this.page.getInput(cell);

            expect(isVisible(checkbox)).toBeTruthy();
            expect(checkbox.checked).toBe(false);
        });

        it('should hide column when show is false', function () {
            let cell = this.page.getCell(0, 5);

            expect(isCellVisible(cell)).toBeFalsy();
        });

        it('should not display show/hide menu for checkbox/icon/icon-menu columns', function () {
            expect(this.page.getHeaderCellMenuButtons().length).toBe(4);
        });

        it('should not display show/hide menu when there are no optional columns', function () {
            this.element = createFixture(
                `<sl-grid page-size="5" locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
                    <sl-grid-column type="text" name="name" title="Name" field="name"></sl-grid-column>
                 </sl-grid>`);
            this.element.data = {
                items: [
                    { name: 'my-name' },
                    { name: 'my-name2' }
                ],
                totalCount: 2
            };

            expect(this.page.getHeaderCellMenuButtons().length).toBe(0);
        });
    });

    describe('Show/Hide columns', () => {
        let gridHtml =
            `<sl-grid id="my-grid" page-size="5" locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
                <sl-grid-column optional="true" type="text" name="name" title="Name" field="name"></sl-grid-column>
                <sl-grid-column type="text" name="description" title="Description" field="description"></sl-grid-column>
                <sl-grid-column optional="true" show="false" type="text" name="updated" title="Updated" field="updated"></sl-grid-column>
            </sl-grid>`;
        let data = {
            items: [
                { name: 'my-name', description: 'my-description', updated: '2017' },
                { name: 'my-name2', description: 'my-description2', updated: '2018' }
            ],
            totalCount: 2
        };

        beforeEach(function () {
            this.element = createFixture(gridHtml);
            this.element.data = data;
        });

        it('should show menu with all optional columns and check the visible ones', function () {
            this.page.clickHeaderCellMenuButton(0);

            let items = this.page.getHeaderCellMenuItems();

            expect(items.length).toBe(2);
            expect(items[0].textContent).toBe('Name');
            expect(items[1].textContent).toBe('Updated');

            let checkboxes = this.page.getHeaderCellMenuCheckboxes();
            expect(checkboxes.length).toBe(2);
            expect(checkboxes[0].checked).toBe(true);
            expect(checkboxes[1].checked).toBe(false);
        });

        it('should hide column when de-selecting', function () {
            this.page.clickHeaderCellMenuButton(0);

            this.page.clickHeaderCellMenuItem(0);

            let cell = this.page.getCell(0, 0);
            expect(isCellVisible(cell)).toBeFalsy();
        });

        it('should show column when selecting and deselecting', function () {
            this.page.clickHeaderCellMenuButton(0);

            this.page.clickHeaderCellMenuItem(0);
            this.page.clickHeaderCellMenuItem(0);

            let cell = this.page.getCell(0, 0);
            expect(isCellVisible(cell)).toBeTruthy();
        });

        it('should load local storage settings and hide previously shown columns', function () {
            this.page.clickHeaderCellMenuButton(0);
            this.page.clickHeaderCellMenuItem(0);

            this.element = createFixture(gridHtml);
            this.element.data = data;

            let cell = this.page.getCell(0, 0);
            expect(isCellVisible(cell)).toBeFalsy();
        });

        it('should load local storage settings and show previously hidden columns', function () {
            this.page.clickHeaderCellMenuButton(0);
            this.page.clickHeaderCellMenuItem(1);

            this.element = createFixture(gridHtml);
            this.element.data = data;

            let cell = this.page.getCell(0, 2);
            expect(isCellVisible(cell)).toBeTruthy();
        });
    });

    describe('Select All', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-grid page-size="5" show-select-all="true" locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
                    <sl-grid-column type="checkbox" name="selection" width="35px"></sl-grid-column>
                    <sl-grid-column type="text" name="name" title="Name" field="name"></sl-grid-column>
                 </sl-grid>`);
            this.element.data = {
                items: [
                    { name: 'my-name' },
                    { name: 'my-name2' }
                ],
                totalCount: 2
            };
        });

        it('should check all checkboxes', function () {
            let selectAll = this.page.getSelectAll();

            selectAll.click();

            for (let checkbox of this.page.getCheckboxes()) {
                expect(checkbox.checked).toBe(true);
            }
        });

        it('should uncheck all checkboxes', function () {
            let selectAll = this.page.getSelectAll();
            selectAll.click();

            selectAll.click();

            for (let checkbox of this.page.getCheckboxes()) {
                expect(checkbox.checked).toBe(false);
            }
        });

        it('checking all single checkboxes should also check select-all checkbox', function () {
            for (let checkbox of this.page.getCheckboxes()) {
                checkbox.click();
            }

            let selectAll = this.page.getSelectAll();
            expect(selectAll.checked).toBe(true);
        });

        it('unchecking a single checkbox should also uncheck select-all checkbox', function () {
            let selectAll = this.page.getSelectAll();
            selectAll.click();

            let checkbox = this.page.getCheckboxes()[0];
            checkbox.click();

            expect(selectAll.checked).toBe(false);
        });
    });

    describe('Paging', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-grid page-size="5" locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
                   <sl-grid-column type="text" name="name" title="Name" field="name"></sl-grid-column>
                 </sl-grid>`);
            this.element.data = {
                items: loadItems(11, 1, 5),
                totalCount: 11
            };
        });

        it('should render only items of the current page', function () {
            let rows = this.page.getRows();

            expect(rows.length).toBe(5);
            expect(this.page.getCell(0, 0).textContent).toBe('webapp 1');
            expect(this.page.getCell(1, 0).textContent).toBe('webapp 2');
            expect(this.page.getCell(2, 0).textContent).toBe('webapp 3');
            expect(this.page.getCell(3, 0).textContent).toBe('webapp 4');
            expect(this.page.getCell(4, 0).textContent).toBe('webapp 5');
        });

        it('should fire grid-update event on pager change event', function () {
            let event;
            this.element.addEventListener('grid-update-data', (e) => {
                event = e;
            });

            this.page.clickNextPage();

            expect(event.detail.page).toBe(2);
            expect(event.detail.pageSize).toBe(5);
        });
    });

    describe('DataBinding', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-grid page-size="5" locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
                   <sl-grid-column type="text" name="name" title="Name" field="name.value"></sl-grid-column>
                   <sl-grid-column type="text" name="title" title="Title" field="title.value"></sl-grid-column>
                 </sl-grid>`);
            this.element.data = {
                items: [
                    { name: { value: 'my-name' } }
                ],
                totalCount: 1
            };
        });

        it('should support nested fields', function () {
            let rows = this.page.getRows();

            expect(rows.length).toBe(1);
            expect(this.page.getCell(0, 0).textContent).toBe('my-name');
        });

        it('should render empty cell when field does not exist', function () {
            let rows = this.page.getRows();

            expect(rows.length).toBe(1);
            expect(this.page.getCell(0, 1).textContent).toBe('');
        });
    });

    describe('Sorting', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-grid page-size="5" locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
                   <sl-grid-column type="text" name="name" title="Name" field="name"></sl-grid-column>
                   <sl-grid-column type="text" name="other" title="Other" field="other"></sl-grid-column>
                 </sl-grid>`);
            this.element.data = {
                items: loadItems(11, 1, 5),
                totalCount: 11
            };
        });

        it('should fire grid-update event on header click with ascending sort order', function () {
            let event;
            this.element.addEventListener('grid-update-data', (e) => {
                event = e;
            });

            this.page.clickHeaderText(0);

            expect(event.detail.sortBy).toBe('name');
            expect(event.detail.sortOrder).toBe('asc');
        });

        it('should fire grid-update event on second header click with descending sort order', function () {
            let event;
            this.element.addEventListener('grid-update-data', (e) => {
                event = e;
            });

            this.page.clickHeaderText(0);
            this.page.clickHeaderText(0);

            expect(event.detail.sortBy).toBe('name');
            expect(event.detail.sortOrder).toBe('desc');
        });

        it('should fire grid-update event on third header click without sort order', function () {
            let event;
            this.element.addEventListener('grid-update-data', (e) => {
                event = e;
            });

            this.page.clickHeaderText(0);
            this.page.clickHeaderText(0);
            this.page.clickHeaderText(0);

            expect(event.detail.sortBy).toBeUndefined();
            expect(event.detail.sortOrder).toBeUndefined();
        });

        it('should fire grid-update event with descending sort order when clicking another column', function () {
            let event;
            this.element.addEventListener('grid-update-data', (e) => {
                event = e;
            });

            this.page.clickHeaderText(0);
            this.page.clickHeaderText(1);

            expect(event.detail.sortBy).toBe('other');
            expect(event.detail.sortOrder).toBe('asc');
        });
    });

    describe('Icons', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-grid locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
                   <sl-grid-column type="icon-menu" name="edit" width="30px" icon="&#xf013;">
                     <sl-grid-column-item name="rename" title="Rename"></sl-grid-column-item>
                     <sl-grid-column-item name="delete" title="Delete"></sl-grid-column-item>
                     <sl-grid-column-item name="modify-policy" title="Modify security policy"></sl-grid-column-item>
                   </sl-grid-column>
                   <sl-grid-column type="icon" name="share" width="30px" icon="&#xf1e0;"></sl-grid-column>
                 </sl-grid>`);
            this.element.data = {
                items: loadItems(10, 1, 10),
                totalCount: 10
            };
        });

        it('should fire action event on icon cell click', function () {
            let event;
            this.element.addEventListener('grid-action', (e) => {
                event = e;
            });

            this.page.clickCell(0, 1);

            expect(event.detail.action).toBe('share');
            expect(event.detail.item.id).toBe(1);
            expect(event.detail.item.name).toBe('webapp 1');
        });

        it('should fire action event on menu entry click', function () {
            let event;
            this.element.addEventListener('grid-action', (e) => {
                event = e;
            });

            this.page.clickCell(3, 0);
            this.page.clickMenuEntry(0);

            expect(event.detail.action).toBe('rename');
            expect(event.detail.item.id).toBe(4);
            expect(event.detail.item.name).toBe('webapp 4');
        });
    });
});
