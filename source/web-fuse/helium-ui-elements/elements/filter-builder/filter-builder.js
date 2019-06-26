import iconsCss from '../common/styles/icons.css';
import inputCss from '../common/styles/input.css';
import selectCss from '../common/styles/select.css';
import filterBuilderCss from './filter-builder.css';

import { componentUtils } from '../common/component-utils.js';

const styles = [iconsCss, inputCss, selectCss, filterBuilderCss];

(function () {
    class SLFilterBuilder extends HTMLElement {
        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
                let config = this._createConfig();
                this._renderItems(config);
            }
        }

        _createConfig () {
            let items = [...this.querySelectorAll('sl-filter-builder-item')];
            return items.map((item) => {
                return {
                    name: item.getAttribute('name'),
                    text: item.getAttribute('text'),
                    operations: this._createOperationsConfig(item),
                    type: item.getAttribute('type')
                };
            });
        }

        _createOperationsConfig (element) {
            let items = [...element.querySelectorAll('sl-filter-builder-operation')];
            return items.map((item) => {
                return {
                    name: item.getAttribute('name'),
                    text: item.getAttribute('text')
                };
            });
        }

        _render () {
            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);

            let main = document.createElement('div');
            main.classList.add('sl-filter-builder-main');
            this.shadowRoot.appendChild(main);
        }

        _renderItems (config) {
            let main = this._getMain();
            main.innerHTML = '';
            this._createNewFilterRowIfNotExists(config);
        }

        _createNewFilterRowIfNotExists (config) {
            let emptyRow = this.shadowRoot.querySelector('.sl-filter-builder-remove-disabled');
            if (emptyRow) {
                return;
            }

            let row = this._createNewFilterRow(config);
            this._getMain().appendChild(row);
        }

        _createNewFilterRow (config) {
            let row = document.createElement('div');
            row.classList.add('sl-filter-builder-row');

            let remove = this._createRemove();
            remove.addEventListener('click', () => {
                if (row && row.parentNode) {
                    row.parentNode.removeChild(row);
                }
                this._fireFilterEventIfValid();
            });

            let fields = this._createFieldSelector(config);
            fields.addEventListener('change', (e) => {
                let item = this._findItemByName(config, fields.value);
                this._populateFilterOperations(row, item);
                this._createNewFilterRowIfNotExists(config);
            });

            row.appendChild(remove);
            row.appendChild(fields);

            return row;
        }

        _createRemove () {
            let remove = document.createElement('div');
            remove.classList.add('fa');
            remove.classList.add('sl-filter-builder-remove');
            remove.classList.add('sl-filter-builder-remove-disabled');
            remove.innerHTML = '&#xf00d;';
            return remove;
        }

        _createFieldSelector (config) {
            let fieldSelector = document.createElement('select');
            fieldSelector.classList.add('mc-select');
            fieldSelector.classList.add('sl-filter-builder-fieldselector');
            fieldSelector.appendChild(this._createDefaultOption());
            for (let item of config) {
                let option = document.createElement('option');
                option.textContent = item.text;
                option.value = item.name;
                fieldSelector.appendChild(option);
            }
            return fieldSelector;
        }

        _createDefaultOption () {
            let defaultOption = document.createElement('option');
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.classList.add('sl-filter-builder-empty-option');
            defaultOption.textContent = 'Select...';
            return defaultOption;
        }

        _findItemByName (items, name) {
            return items.find(item => {
                return item.name === name;
            });
        }

        _removeFilterOperations (row) {
            let operation = row.querySelector('.sl-filter-builder-operation');
            if (operation) {
                operation.remove();
            }
            let keyInput = row.querySelector('.sl-filter-builder-key');
            if (keyInput) {
                keyInput.remove();
            }
            let valueInput = row.querySelector('.sl-filter-builder-value');
            if (valueInput) {
                valueInput.remove();
            }
        }

        _populateFilterOperations (row, item) {
            this._removeFilterOperations(row);

            let remove = row.querySelector('.sl-filter-builder-remove');
            remove.classList.remove('sl-filter-builder-remove-disabled');

            let keyInput = this._createKeyInput();
            keyInput.addEventListener('change', () => {
                this._fireFilterEventIfValid();
            });
            let operation = this._createOperation(item);
            let valueInput = this._createValueInput(item);
            valueInput.addEventListener('change', () => {
                this._fireFilterEventIfValid();
            });

            row.appendChild(operation);
            if (item.type === 'KeyValue') {
                row.appendChild(keyInput);
            }
            row.appendChild(valueInput);
        }

        _createOperation (item) {
            if (item.operations.length === 1) {
                return this._createSingleOperation(item.operations);
            }
            return this._createMultiOperation(item.operations);
        }

        _createSingleOperation (operations) {
            let operation = document.createElement('div');
            operation.classList.add('sl-filter-builder-operation');
            operation.textContent = operations[0].text;
            operation.setAttribute('data-operation', operations[0].name);
            return operation;
        }

        _createMultiOperation (operations) {
            let operationSelect = document.createElement('select');
            operationSelect.classList.add('mc-select');
            operationSelect.classList.add('sl-filter-builder-operation');
            operationSelect.classList.add('sl-filter-builder-select-operation');
            return this._getSelectWithOperations(operationSelect, operations);
        }

        _getSelectWithOperations (operationSelect, operations) {
            operationSelect.appendChild(this._createDefaultOption());
            for (let operation of operations) {
                let option = document.createElement('option');
                option.textContent = operation.text;
                option.value = operation.name;
                operationSelect.appendChild(option);
            }
            return operationSelect;
        }

        _createKeyInput () {
            let valueInput = document.createElement('input');
            valueInput.classList.add('sl-filter-builder-key');
            valueInput.classList.add('mc-input');
            valueInput.placeholder = 'Key';
            return valueInput;
        }

        _createValueInput (item) {
            let valueInput = document.createElement('input');
            if (item.type === 'KeyValue') {
                valueInput.classList.add('sl-filter-builder-value-keyvalue');
            }
            valueInput.classList.add('sl-filter-builder-value');
            valueInput.classList.add('mc-input');
            valueInput.placeholder = 'Value';
            return valueInput;
        }

        _valid () {
            let inputs = this.shadowRoot.querySelectorAll('.sl-filter-builder-key, .sl-filter-builder-value');
            return this._validInputs(inputs);
        }

        _validInputs (inputs) {
            let isValid = true;
            for (let input of inputs) {
                if (input.value === '') {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            }
            return isValid;
        }

        _fireFilterEventIfValid () {
            if (this._valid()) {
                let filters = this._createRowFilters();
                this._fireFilterEvent(filters);
            }
        }

        _fireFilterEvent (filters) {
            let eventData = { filters: filters };
            this.dispatchEvent(new CustomEvent('filter', { detail: eventData }));
        }

        _createRowFilters () {
            let rows = [...this._getFilterRows()];
            return rows
                .map(this._createRowFilter.bind(this))
                .filter(function (f) {
                    return f !== undefined;
                });
        }

        _createRowFilter (row) {
            let fieldSelector = row.querySelector('.sl-filter-builder-fieldselector');
            let valueInput = row.querySelector('.sl-filter-builder-value');
            let operation = row.querySelector('.sl-filter-builder-operation');

            if (!fieldSelector || !operation || !valueInput) {
                return;
            }

            operation = this._getOperationValue(operation);

            let filter = {
                name: fieldSelector.value,
                operation: operation,
                value: valueInput.value
            };

            let keyInput = row.querySelector('.sl-filter-builder-key');
            if (keyInput) {
                filter.key = keyInput.value;
            }
            return filter;
        }

        _getOperationValue (operation) {
            if (operation.type === 'select-one') {
                return operation.value;
            }
            return operation.getAttribute('data-operation');
        }

        _getFilterRows () {
            return this.shadowRoot.querySelectorAll('.sl-filter-builder-row');
        }

        _getMain () {
            return this.shadowRoot.querySelector('.sl-filter-builder-main');
        }
    }

    componentUtils.registerCustomElement('sl-filter-builder', SLFilterBuilder);
})();
