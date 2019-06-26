export class FooterPage {
    getRoot () {
        return document.querySelector('mc-footer').shadowRoot;
    }

    getFooter () {
        return this.getRoot().querySelector('#mc-footer-page');
    }

    getCopyright () {
        return this.getRoot().querySelector('#mc-footer-copyright');
    }

    getLegal () {
        return this.getRoot().querySelector('#mc-footer-legal');
    }

    getPrivacy () {
        return this.getRoot().querySelector('#mc-footer-privacy');
    }
}
