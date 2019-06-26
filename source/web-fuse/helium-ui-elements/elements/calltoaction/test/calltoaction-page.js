export class CallToActionPage {
    getRoot () {
        return document.querySelector('mc-calltoaction').shadowRoot;
    }

    getCallToAction () {
        return this.getRoot().querySelector('.mc-calltoaction-main');
    }

    getHeader () {
        return this.getRoot().querySelector('.mc-calltoaction-main h3');
    }

    getButton () {
        return this.getRoot().querySelector('.mc-calltoaction-button');
    }

    getMessage () {
        return this.getRoot().querySelector('#mc-calltoaction-message');
    }

    getHelp () {
        return this.getRoot().querySelector('#mc-calltoaction-help');
    }

    clickButton () {
        this.getButton().click();
    }
}
