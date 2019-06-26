export class HeaderPage {
    getRoot () {
        return document.querySelector('mc-header').shadowRoot;
    }

    getHeader () {
        return this.getRoot().querySelector('header');
    }

    getAppTitle () {
        return this.getRoot().querySelector('.mc-header-app-title');
    }

    getActiveCategory () {
        return this.getRoot().querySelector('.mc-header-active');
    }

    getCategories () {
        return this.getRoot().querySelectorAll('.mc-header-category');
    }

    getUserName () {
        return this.getRoot().querySelector('#mc-header-user-name');
    }

    getUserMenuButton () {
        return this.getRoot().querySelector('.mc-header-user-menu-button');
    }

    getHelpMenuButton () {
        return this.getRoot().querySelector('.mc-header-help-menu-button');
    }

    getUserMenuEntries () {
        return this.getRoot().querySelectorAll('#mc-header-user-menu a');
    }

    getHelpMenuEntries () {
        return this.getRoot().querySelectorAll('#mc-header-help-menu a');
    }
}
