import '../filter-builder.js';

import { createFixture, isVisible, selectOption, enterValue } from '../../test/test-utils.js';
import { FilterBuilderPage } from './filter-builder-page.js';

describe('SL Filter Builder', () => {
    beforeEach(function () {
        this.page = new FilterBuilderPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-filter-builder>
                    <sl-filter-builder-item name="path" text="Path">
                        <sl-filter-builder-operation name="MATCHES" text="matches"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                    <sl-filter-builder-item name="keywords" text="Keywords">
                        <sl-filter-builder-operation name="EQUALS" text="equals"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                    <sl-filter-builder-item name="properties" text="Properties" type="KeyValue">
                        <sl-filter-builder-operation name="EQUALS" text="equals"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                 </sl-filter-builder>`);
        });

        it('should support multiple operations', function () {
            this.element = createFixture(
                `<sl-filter-builder>
                    <sl-filter-builder-item name="path" text="Path">
                        <sl-filter-builder-operation name="MATCHES" text="matches"></sl-filter-builder-operation>
                        <sl-filter-builder-operation name="NOT_MATCHES" text="does not match"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                 </sl-filter-builder>`);

            this.element.addEventListener('filter', (e) => {
                this.clickEvent = e;
            });

            let propertySelectName = 'path';
            let propertyOperatorName = 'NOT_MATCHES';
            let propertyValue = 'path_value';
            selectOption(this.page.getFieldSelector(0), propertySelectName);
            selectOption(this.page.getFieldSelectorOperation(0), propertyOperatorName);

            enterValue(this.page.getValueInput(0), propertyValue);

            expect(this.clickEvent.detail).toEqual({
                filters: [
                    { name: propertySelectName, operation: propertyOperatorName, value: propertyValue }
                ]
            });
        });

        it('should show the filter builder', function () {
            let main = this.page.getMain();

            expect(isVisible(main)).toBeTruthy();
        });

        it('should a single row with disabled remove button and field selector', function () {
            let rows = this.page.getRows();
            expect(rows.length).toBe(1);

            let removeButton = this.page.getRemoveButton(0);
            expect(removeButton.classList.contains('sl-filter-builder-remove-disabled')).toBeTruthy();

            let fieldSelector = this.page.getFieldSelector(0);
            expect(fieldSelector.value).toBe('Select...');
        });

        it('should add new filer row on field selection', function () {
            selectOption(this.page.getFieldSelector(0), 'path');

            let rows = this.page.getRows();
            expect(rows.length).toBe(2);
        });

        it('should remove filter row on X click', function () {
            selectOption(this.page.getFieldSelector(0), 'properties');

            this.page.clickRemoveButton(0);

            let rows = this.page.getRows();
            expect(rows.length).toBe(1);

            let fieldSelector = this.page.getFieldSelector(0);
            let keyInput = this.page.getKeyInput(0);
            let operation = this.page.getOperation(0);
            let valueInput = this.page.getValueInput(0);
            expect(fieldSelector.value).toBe('Select...');
            expect(keyInput).toBeNull();
            expect(operation).toBeNull();
            expect(valueInput).toBeNull();
        });

        it('should show value input for MATCHES operator', function () {
            selectOption(this.page.getFieldSelector(0), 'path');

            let keyInput = this.page.getKeyInput(0);
            let operation = this.page.getOperation(0);
            let valueInput = this.page.getValueInput(0);

            expect(keyInput).toBeNull();
            expect(operation.textContent).toBe('matches');
            expect(valueInput).toBeDefined();
        });

        it('should show value input for EQUALS operator', function () {
            selectOption(this.page.getFieldSelector(0), 'keywords');

            let keyInput = this.page.getKeyInput(0);
            let operation = this.page.getOperation(0);
            let valueInput = this.page.getValueInput(0);

            expect(keyInput).toBeNull();
            expect(operation.textContent).toBe('equals');
            expect(valueInput).toBeDefined();
        });

        it('should show key and value input for KeyValue filter', function () {
            selectOption(this.page.getFieldSelector(0), 'properties');

            let keyInput = this.page.getKeyInput(0);
            let operation = this.page.getOperation(0);
            let valueInput = this.page.getValueInput(0);

            expect(keyInput).toBeDefined();
            expect(operation.textContent).toBe('equals');
            expect(valueInput).toBeDefined();
        });

        it('should change inputs when changing field', function () {
            selectOption(this.page.getFieldSelector(0), 'keywords');

            selectOption(this.page.getFieldSelector(0), 'properties');

            let keyInput = this.page.getKeyInput(0);
            let operation = this.page.getOperation(0);
            let valueInput = this.page.getValueInput(0);

            expect(keyInput).toBeDefined();
            expect(operation.textContent).toBe('equals');
            expect(valueInput).toBeDefined();
        });

        it('should fire filter event on value change', function () {
            this.element.addEventListener('filter', (e) => {
                this.clickEvent = e;
            });
            selectOption(this.page.getFieldSelector(0), 'path');

            enterValue(this.page.getValueInput(0), 'my-tag-path');

            expect(this.clickEvent.detail).toEqual({
                filters: [
                    { name: 'path', operation: 'MATCHES', value: 'my-tag-path' }
                ]
            });
        });

        it('should fire filter event with multiple filter expressions', function () {
            this.element.addEventListener('filter', (e) => {
                this.clickEvent = e;
            });

            selectOption(this.page.getFieldSelector(0), 'path');
            enterValue(this.page.getValueInput(0), 'my-tag-path');

            selectOption(this.page.getFieldSelector(1), 'properties');
            enterValue(this.page.getKeyInput(1), 'prop-key');
            enterValue(this.page.getValueInput(1), 'prop-value');

            expect(this.clickEvent.detail).toEqual({
                filters: [
                    { name: 'path', operation: 'MATCHES', value: 'my-tag-path' },
                    { name: 'properties', operation: 'EQUALS', key: 'prop-key', value: 'prop-value' }
                ]
            });
        });

        it('should show validation error when value is empty', function () {
            selectOption(this.page.getFieldSelector(0), 'properties');
            enterValue(this.page.getKeyInput(0), 'my-key');

            expect(this.page.getValueInput(0).classList).toContain('error');
        });

        it('should not fire filter event when value is empty', function () {
            this.element.addEventListener('filter', (e) => {
                this.clickEvent = e;
            });
            selectOption(this.page.getFieldSelector(0), 'properties');
            enterValue(this.page.getKeyInput(0), 'my-key');

            expect(this.clickEvent).toBeUndefined();
        });

        it('should show validation error when key is empty', function () {
            selectOption(this.page.getFieldSelector(0), 'properties');
            enterValue(this.page.getValueInput(0), 'my-value');

            expect(this.page.getKeyInput(0).classList).toContain('error');
        });

        it('should not fire filter event when key is empty', function () {
            this.element.addEventListener('filter', (e) => {
                this.clickEvent = e;
            });
            selectOption(this.page.getFieldSelector(0), 'properties');
            enterValue(this.page.getValueInput(0), 'my-value');

            expect(this.clickEvent).toBeUndefined();
        });
    });
});
