export class DialogPage {
    constructor (element) {
        this._element = element;
    }

    getRoot () {
        return this._element ? this._element.shadowRoot : document.querySelector('mc-dialog').shadowRoot;
    }

    getDialog () {
        return this.getRoot().querySelector('.mc-dialog-modal');
    }

    getDialogContent () {
        return this.getRoot().querySelector('.mc-dialog-content');
    }

    getHeader () {
        return this.getRoot().querySelector('.mc-dialog-header');
    }

    getLeftButton () {
        return this.getRoot().querySelector('.mc-dialog-button-left');
    }

    getRightButton () {
        return this.getRoot().querySelector('.mc-dialog-button-right');
    }

    getRightButtonText () {
        return this.getRoot().querySelector('#mc-dialog-button-text-right');
    }

    getMiddleButtonText () {
        return this.getRoot().querySelector('#mc-dialog-button-text-middle');
    }

    getLeftButtonText () {
        return this.getRoot().querySelector('#mc-dialog-button-text-left');
    }

    getMiddleButton () {
        return this.getRoot().querySelector('.mc-dialog-button-middle');
    }

    getLeftIcon () {
        return this.getRoot().querySelector('#mc-dialog-icon-left-button');
    }

    getMiddleIcon () {
        return this.getRoot().querySelector('#mc-dialog-icon-middle-button');
    }

    getRightIcon () {
        return this.getRoot().querySelector('#mc-dialog-icon-right-button');
    }

    getFooterLink () {
        return this.getRoot().querySelector('#mc-dialog-footer-link');
    }

    getInput () {
        return this.getRoot().querySelector('.mc-input');
    }

    enterInput (value) {
        let input = this.getInput();
        input.value = value;
        input.dispatchEvent(new Event('input'));
    }

    getErrorMessage () {
        return this.getRoot().querySelector('.mc-dialog-error-message');
    }

    clickLeftButton () {
        this.getLeftButton().click();
    }

    clickMiddleButton () {
        this.getMiddleButton().click();
    }

    clickRightButton () {
        this.getRightButton().click();
    }

    clickFooterLink () {
        return this.getFooterLink().click();
    }
}
