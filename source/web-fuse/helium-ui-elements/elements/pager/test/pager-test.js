import '../pager.js';

import { createFixture, isVisible, selectOption, enterValue } from '../../test/test-utils.js';
import { PagerPage } from './pager-page.js';

describe('Pager', () => {
    beforeEach(function () {
        this.page = new PagerPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-pager page="1" page-size="20" items="49" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>`);
        });

        it('should show pager', function () {
            let pager = this.page.getPager();

            expect(isVisible(pager)).toBeTruthy();
        });

        it('should show pager controls', function () {
            let itemText = this.page.getItemText();
            let input = this.page.getGoToPageInput();
            let options = this.page.getPageSizeOptions();

            expect(itemText.textContent).toBe('1-20 of 49');
            expect(input.value).toBe('1');
            expect(options.length).toBe(3);
            expect(options[0].textContent).toBe('5');
            expect(options[1].textContent).toBe('10');
            expect(options[2].textContent).toBe('20');
        });

        it('should show pager without items', function () {
            this.element = createFixture(
                `<mc-pager go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>`);

            let itemText = this.page.getItemText();

            expect(itemText.textContent).toBe('0-0 of 0');
        });

        it('should render multiple pagers on the same page', function () {
            this.element = createFixture(
                `<mc-pager page="1" page-size="20" items="50" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>
                 <mc-pager page="2" page-size="10" items="105" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>`);

            let count = this.page.getPagerCount();

            expect(count).toBe(2);
        });

        it('should change page on next click', function () {
            this.page.clickNext();

            let itemText = this.page.getItemText();
            let input = this.page.getGoToPageInput();

            expect(itemText.textContent).toBe('21-40 of 49');
            expect(input.value).toBe('2');
        });

        it('should change page on previous click', function () {
            this.element = createFixture(
                `<mc-pager page="3" page-size="10" items="22" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>`);

            this.page.clickPrevious();

            let itemText = this.page.getItemText();
            let input = this.page.getGoToPageInput();

            expect(itemText.textContent).toBe('11-20 of 22');
            expect(input.value).toBe('2');
        });

        it('should stay on last page when clicking next', function () {
            this.element = createFixture(
                `<mc-pager page="3" page-size="10" items="22" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>`);

            this.page.clickNext();

            let itemText = this.page.getItemText();
            let input = this.page.getGoToPageInput();

            expect(itemText.textContent).toBe('21-22 of 22');
            expect(input.value).toBe('3');
        });

        it('should stay on first page when clicking previous', function () {
            this.page.clickPrevious();

            let itemText = this.page.getItemText();
            let input = this.page.getGoToPageInput();

            expect(itemText.textContent).toBe('1-20 of 49');
            expect(input.value).toBe('1');
        });

        it('should fire event on next click', function () {
            this.element.addEventListener('page-change', (e) => {
                this.clickEvent = e;
            });

            this.page.clickNext();

            expect(this.clickEvent.detail).toEqual({ page: 2, pageSize: 20, items: 49 });
        });

        it('should fire event on previous click', function () {
            this.element = createFixture(
                `<mc-pager page="2" page-size="10" items="22" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>`);

            this.element.addEventListener('page-change', (e) => {
                this.clickEvent = e;
            });

            this.page.clickPrevious();

            expect(this.clickEvent.detail).toEqual({ page: 1, pageSize: 10, items: 22 });
        });

        it('should fire event on page size change', function () {
            this.element.addEventListener('page-change', (e) => {
                this.clickEvent = e;
            });

            selectOption(this.page.getPageSizeSelect(), '5');

            expect(this.clickEvent.detail).toEqual({ page: 1, pageSize: 5, items: 49 });
        });

        it('should fire event on go to page input', function () {
            this.element.addEventListener('page-change', (e) => {
                this.clickEvent = e;
            });

            enterValue(this.page.getGoToPageInput(), '3');

            expect(this.clickEvent.detail).toEqual({ page: 3, pageSize: 20, items: 49 });
        });
    });
});
