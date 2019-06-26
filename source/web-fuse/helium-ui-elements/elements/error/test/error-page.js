export class ErrorPage {
    getRoot () {
        return document.querySelector('mc-error').shadowRoot;
    }

    getCode () {
        return this.getRoot().querySelector('.mc-error-code');
    }

    getMessage () {
        return this.getRoot().querySelector('.mc-error-message');
    }

    getLink () {
        return this.getRoot().querySelector('.mc-error-link');
    }
}
