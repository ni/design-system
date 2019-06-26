export class FilterBuilderPage {
    constructor (element) {
        this._element = element;
    }

    getRoot () {
        return this._element ? this._element.shadowRoot : document.querySelector('sl-filter-builder').shadowRoot;
    }

    getMain () {
        return this.getRoot().querySelector('.sl-filter-builder-main');
    }

    getRows () {
        return this.getRoot().querySelectorAll('.sl-filter-builder-row');
    }

    getRow (index) {
        return this.getRows()[index];
    }

    getRemoveButton (index) {
        return this.getRow(index).querySelector('.sl-filter-builder-remove');
    }

    clickRemoveButton (index) {
        let removeButton = this.getRemoveButton(index);
        removeButton.click();
    }

    getFieldSelector (index) {
        return this.getRow(index).querySelector('.sl-filter-builder-fieldselector');
    }

    getFieldSelectorOperation (index) {
        return this.getRow(index).querySelector('.sl-filter-builder-select-operation');
    }

    getKeyInput (index) {
        return this.getRow(index).querySelector('.sl-filter-builder-key');
    }

    getValueInput (index) {
        return this.getRow(index).querySelector('.sl-filter-builder-value');
    }

    getOperation (index) {
        return this.getRow(index).querySelector('.sl-filter-builder-operation');
    }
}
