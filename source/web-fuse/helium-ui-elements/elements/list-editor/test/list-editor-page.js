import { focus, enterValue } from '../../test/test-utils.js';

export class ListEditorPage {
    constructor (element) {
        this._element = element;
    }

    getRoot () {
        return this._element ? this._element.shadowRoot : document.querySelector('sl-list-editor').shadowRoot;
    }

    getRows () {
        return this.getRoot().querySelectorAll('.sl-list-editor-row');
    }

    getRow (index) {
        return this.getRows()[index];
    }

    getInputs (index) {
        return this.getRow(index).querySelectorAll('.sl-list-editor-input');
    }

    getIcon (index) {
        return this.getRow(index).querySelector('.sl-list-editor-icon');
    }

    clickIcon (index) {
        return this.getIcon(index).click();
    }

    getMain () {
        return this.getRoot().querySelector('.sl-list-editor-main');
    }

    enterListValue (rowIndex, value) {
        let newValueInput = this.getInputs(rowIndex)[0];
        focus(newValueInput);
        let valueInput = this.getInputs(rowIndex)[0];
        enterValue(valueInput, value);
    }

    enterListKeyValue (rowIndex, key, value) {
        let newKeyInput = this.getInputs(rowIndex)[0];
        focus(newKeyInput);
        let keyInput = this.getInputs(rowIndex)[0];
        enterValue(keyInput, key);
        let newValueInput = this.getInputs(rowIndex)[1];
        focus(newValueInput);
        let valueInput = this.getInputs(rowIndex)[1];
        enterValue(valueInput, value);
    }
}
