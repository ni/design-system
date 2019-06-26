export class LandingPage {
    getRoot () {
        return document.querySelector('mc-landing').shadowRoot;
    }

    getLandingPage () {
        return this.getRoot().querySelector('#mc-landing-page');
    }

    getPrimaryHeaders () {
        return this.getRoot().querySelectorAll('.mc-landing-primary .mc-landing-tile-header');
    }

    getSecondaryHeaders () {
        return this.getRoot().querySelectorAll('.mc-landing-secondary .mc-landing-row-header');
    }

    getPrimaryDescriptions () {
        return this.getRoot().querySelectorAll('.mc-landing-primary .mc-landing-tile-description');
    }

    getSecondaryDescriptions () {
        return this.getRoot().querySelectorAll('.mc-landing-secondary .mc-landing-row-description');
    }

    getTertiaryDescriptions () {
        return this.getRoot().querySelectorAll('.mc-landing-tertiary .mc-landing-description');
    }

    getPrimaryActions () {
        return this.getRoot().querySelectorAll('.mc-landing-primary .mc-landing-call-to-action');
    }

    getSecondaryActions () {
        return this.getRoot().querySelectorAll('.mc-landing-secondary .mc-landing-call-to-action');
    }

    getTertiaryActions () {
        return this.getRoot().querySelectorAll('.mc-landing-tertiary a');
    }
}
