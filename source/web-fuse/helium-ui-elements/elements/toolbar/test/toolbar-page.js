export class ToolbarPage {
    constructor (element) {
        this._element = element;
    }

    getRoot () {
        return this._element ? this._element.shadowRoot : document.querySelector('mc-toolbar').shadowRoot;
    }

    getToolbar () {
        return this.getRoot().querySelector('.mc-toolbar-main');
    }

    getToolbarItems () {
        return this.getRoot().querySelectorAll('.mc-toolbar-item');
    }

    getToolbarIcons () {
        return this.getRoot().querySelectorAll('.mc-toolbar-item-icon');
    }

    getDropDownItems () {
        return this.getRoot().querySelectorAll('.sl-dropdown-content > a');
    }

    clickToolbarItem (i) {
        this.getToolbarItems()[i].click();
    }

    clickDropdownItem (i) {
        this.getDropDownItems()[i].click();
    }
}
