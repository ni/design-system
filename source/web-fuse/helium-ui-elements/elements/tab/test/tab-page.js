export class TabPage {
    getRoot () {
        return document.querySelector('mc-tab').shadowRoot;
    }

    getTab () {
        return this.getRoot().querySelector('.mc-tab-main');
    }

    getTabContent (i) {
        return document.querySelector(`*[slot="content-${i}"]`);
    }

    getTabMenuEntries () {
        return this.getRoot().querySelectorAll('.mc-tab-menu-entry');
    }

    clickTabMenuEntry (i) {
        this.getTabMenuEntries()[i].click();
    }
}
