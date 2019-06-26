export class AutocompletePage {
    constructor (parent) {
        this._parent = parent || document;
    }
    getRoot () {
        return this._parent.querySelector('mc-autocomplete').shadowRoot;
    }

    getInput () {
        return this.getRoot().querySelector('#autocompletable-input');
    }

    getPlaceholder () {
        return this.getRoot().querySelector('#autocompletable-input').getAttribute('placeholder');
    }

    getErrorMessage () {
        return this.getRoot().querySelector('#mc-autocomplete-error-message');
    }

    getDropDown () {
        return this.getRoot().querySelector('#drop-down-list');
    }

    getDropDownItems () {
        return this.getDropDown().getElementsByTagName('div');
    }

    clickDropDownItem (index) {
        return this.getDropDown().getElementsByTagName('div')[index].click();
    }

    setInputValue (newValue) {
        let editBox = this.getInput();
        editBox.value = newValue;
        let inputEvent = new CustomEvent('input');
        editBox.dispatchEvent(inputEvent);
    }
}
