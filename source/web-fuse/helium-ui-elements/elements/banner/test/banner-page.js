export class BannerPage {
    constructor (parent) {
        this._parent = parent || document;
    }

    getRoot () {
        return this._parent.querySelector('mc-banner').shadowRoot;
    }

    getBanner () {
        return this.getRoot().querySelector('.mc-banner-modal');
    }

    getOkButton () {
        return this.getRoot().querySelector('.mc-banner-button-ok');
    }

    clickOk () {
        this.getOkButton().click();
    }
}
