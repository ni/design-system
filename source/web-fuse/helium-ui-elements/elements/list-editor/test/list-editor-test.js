import '../list-editor.js';

import { createFixture, isVisible, focus, enterValue } from '../../test/test-utils.js';
import { ListEditorPage } from './list-editor-page.js';

describe('SL List Editor', () => {
    beforeEach(function () {
        this.page = new ListEditorPage();
    });

    describe('List Edit', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-list-editor placeholder="Keyword"></sl-list-editor>`);
            this.element.data = ['keywordA', 'keywordB'];
        });

        it('should show the list editor', function () {
            let main = this.page.getMain();

            expect(isVisible(main)).toBeTruthy();
        });

        it('should show only one input', function () {
            let inputs = this.page.getInputs(0);

            expect(inputs.length).toBe(1);
        });

        it('should render the data rows', function () {
            let rows = this.page.getRows();
            expect(rows.length).toBe(3);

            let inputsFirstRow = this.page.getInputs(0);
            expect(inputsFirstRow[0].value).toBe('keywordA');

            let inputsSecondRow = this.page.getInputs(1);
            expect(inputsSecondRow[0].value).toBe('keywordB');

            let inputsThirdRow = this.page.getInputs(2);
            expect(inputsThirdRow[0].value).toBe('');
        });

        it('should add a new row on focus of the last rows input', function () {
            let inputs = this.page.getInputs(2);
            focus(inputs[0]);

            let rows = this.page.getRows();
            expect(rows.length).toBe(4);
        });

        it('should delete a row on delete icon click', function () {
            this.page.clickIcon(1);

            let rows = this.page.getRows();
            expect(rows.length).toBe(2);
        });

        it('should fire list-change event on delete icon click', function () {
            this.element.addEventListener('list-change', (e) => {
                this.clickEvent = e;
            });
            this.page.clickIcon(1);

            expect(this.clickEvent.detail).toEqual({ data: ['keywordA'] });
        });

        it('should fire list-change event on input change', function () {
            this.element.addEventListener('list-change', (e) => {
                this.clickEvent = e;
            });
            enterValue(this.page.getInputs(0)[0], 'new keyword');

            expect(this.clickEvent.detail).toEqual({ data: ['new keyword', 'keywordB'] });
        });
    });

    describe('KeyValue Edit', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-list-editor type="KeyValue" key-placeholder="Key" value-placeholder="Value"></sl-list-editor>`);
            this.element.data = [
                { key: 'key-a', value: 'value-a' },
                { key: 'key-b', value: 'value-b' }
            ];
        });

        it('should show the list editor', function () {
            let main = this.page.getMain();

            expect(isVisible(main)).toBeTruthy();
        });

        it('should show inputs for key and value', function () {
            let inputs = this.page.getInputs(0);

            expect(inputs.length).toBe(2);
        });

        it('should render the data rows', function () {
            let rows = this.page.getRows();
            expect(rows.length).toBe(3);

            let inputsFirstRow = this.page.getInputs(0);
            expect(inputsFirstRow[0].value).toBe('key-a');
            expect(inputsFirstRow[1].value).toBe('value-a');

            let inputsSecondRow = this.page.getInputs(1);
            expect(inputsSecondRow[0].value).toBe('key-b');
            expect(inputsSecondRow[1].value).toBe('value-b');

            let inputsThirdRow = this.page.getInputs(2);
            expect(inputsThirdRow[0].value).toBe('');
            expect(inputsThirdRow[1].value).toBe('');
        });

        it('should add a new row on focus of the last rows key input', function () {
            let inputs = this.page.getInputs(2);
            focus(inputs[0]);

            let rows = this.page.getRows();
            expect(rows.length).toBe(4);
        });

        it('should add a new row on focus of the last rows value input', function () {
            let inputs = this.page.getInputs(2);
            focus(inputs[1]);

            let rows = this.page.getRows();
            expect(rows.length).toBe(4);
        });

        it('should delete a row on delete icon click', function () {
            this.page.clickIcon(1);

            let rows = this.page.getRows();
            expect(rows.length).toBe(2);
        });

        it('should fire list-change event on delete icon click', function () {
            this.element.addEventListener('list-change', (e) => {
                this.clickEvent = e;
            });
            this.page.clickIcon(1);

            expect(this.clickEvent.detail).toEqual({ data: [{ key: 'key-a', value: 'value-a' }] });
        });

        it('should fire list-change event on key-input change', function () {
            this.element.addEventListener('list-change', (e) => {
                this.clickEvent = e;
            });
            enterValue(this.page.getInputs(0)[0], 'new key');

            expect(this.clickEvent.detail).toEqual({
                data: [
                    { key: 'new key', value: 'value-a' },
                    { key: 'key-b', value: 'value-b' }
                ]
            });
        });

        it('should fire list-change event on value-input change', function () {
            this.element.addEventListener('list-change', (e) => {
                this.clickEvent = e;
            });
            enterValue(this.page.getInputs(0)[1], 'new value');

            expect(this.clickEvent.detail).toEqual({
                data: [
                    { key: 'key-a', value: 'new value' },
                    { key: 'key-b', value: 'value-b' }
                ]
            });
        });
    });
});
