import iconsCss from '../common/styles/icons.css';
import inputCss from '../common/styles/input.css';
import listEditorCss from './list-editor.css';

import { componentUtils } from '../common/component-utils.js';

const styles = [iconsCss, inputCss, listEditorCss];

(function () {
    class SLListEditor extends HTMLElement {
        constructor () {
            super();

            this._data = [];
        }

        set data (data) {
            this._data = data;
            this._renderItems();
        }

        connectedCallback () {
            componentUtils.upgradeProperty(this, 'data');
            if (!this.shadowRoot) {
                this._type = this.getAttribute('type');
                this._keyPlaceHolder = this.getAttribute('placeholder') || this.getAttribute('key-placeholder') || '';
                this._valuePlaceHolder = this.getAttribute('value-placeholder') || '';
                this._render();
                this._renderItems();
            }
        }

        _render () {
            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);

            let main = document.createElement('div');
            main.classList.add('sl-list-editor-main');
            this.shadowRoot.appendChild(main);
        }

        _renderItems () {
            let main = this._getMain();
            main.innerHTML = '';

            for (let item of this._data) {
                this._appendRow(item);
            }

            this._appendNewRowIfNotExists();
        }

        _appendRow (item) {
            let row = document.createElement('div');
            row.classList.add('sl-list-editor-row');

            let icon = this._createRemoveIcon();
            icon.addEventListener('click', () => {
                row.remove();
                this._fireListChangeEvent();
            });
            row.appendChild(icon);

            let input = this._createKeyInput(item);
            input.addEventListener('change', () => {
                this._fireListChangeEvent();
            });
            row.appendChild(input);

            if (this._type === 'KeyValue') {
                let valueInput = this._createValueInput(item);
                valueInput.addEventListener('change', () => {
                    this._fireListChangeEvent();
                });
                row.appendChild(valueInput);
            }

            let main = this._getMain();
            main.appendChild(row);
            input.focus();
        }

        _createAddIcon () {
            let icon = document.createElement('div');
            icon.classList.add('sl-list-editor-icon');
            icon.classList.add('sl-list-editor-add-icon');
            return icon;
        }

        _createRemoveIcon () {
            let icon = document.createElement('div');
            icon.classList.add('fa');
            icon.classList.add('sl-list-editor-icon');
            icon.classList.add('sl-list-editor-remove-icon');
            icon.innerHTML = '&#xf00d;';
            return icon;
        }

        _createKeyInput (item) {
            let value = item || '';
            if (this._type === 'KeyValue') {
                value = item ? item.key : '';
            }
            return this._createInput(value, this._keyPlaceHolder);
        }

        _createValueInput (item) {
            let value = item || '';
            if (this._type === 'KeyValue') {
                value = item ? item.value : '';
            }
            return this._createInput(value, this._valuePlaceHolder);
        }

        _createInput (value, placeholder) {
            let input = document.createElement('input');
            input.classList.add('mc-input');
            input.classList.add('sl-list-editor-input');
            input.value = value || '';
            input.placeholder = placeholder;
            return input;
        }

        _appendNewRowIfNotExists () {
            let existingNewRow = this.shadowRoot.querySelector('.sl-list-editor-new-row');
            if (existingNewRow) {
                return;
            }
            let newRow = this._createNewRow();
            let main = this._getMain();
            main.appendChild(newRow);
        }

        _createNewRow () {
            let newRow = document.createElement('div');
            newRow.classList.add('sl-list-editor-row');
            newRow.classList.add('sl-list-editor-new-row');

            let icon = this._createAddIcon();
            newRow.appendChild(icon);

            let input = this._createKeyInput();
            input.addEventListener('focus', () => {
                newRow.remove();
                this._appendRow();
                this._appendNewRowIfNotExists();
            });
            newRow.appendChild(input);

            if (this._type === 'KeyValue') {
                let valueInput = this._createValueInput();
                valueInput.addEventListener('focus', () => {
                    newRow.remove();
                    this._appendRow();
                    this._appendNewRowIfNotExists();
                });
                newRow.appendChild(valueInput);
            }
            return newRow;
        }

        _fireListChangeEvent () {
            let eventData = {
                data: this._createList()
            };
            this.dispatchEvent(new CustomEvent('list-change', { detail: eventData }));
        }

        _createList () {
            let rows = [...this._getRows()];
            return rows
                .map((r) => this._getListItem(r))
                .filter(function (item) {
                    return item !== undefined;
                });
        }

        _getListItem (row) {
            let inputs = row.querySelectorAll('.sl-list-editor-input');
            if (!this._hasValue(inputs)) {
                return;
            }
            if (inputs.length === 2) {
                return { key: inputs[0].value, value: inputs[1].value };
            } else {
                return inputs[0].value;
            }
        }

        _hasValue (inputs) {
            for (let input of inputs) {
                if (input.value !== '') {
                    return true;
                }
            }
            return false;
        }

        _getRows () {
            return this.shadowRoot.querySelectorAll('.sl-list-editor-row');
        }

        _getMain () {
            return this.shadowRoot.querySelector('.sl-list-editor-main');
        }
    }

    componentUtils.registerCustomElement('sl-list-editor', SLListEditor);
})();
