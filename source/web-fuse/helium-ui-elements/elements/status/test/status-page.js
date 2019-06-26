export class StatusPage {
    getRoot () {
        return document.querySelector('mc-status').shadowRoot;
    }

    getStatusMessageHolder () {
        return this.getRoot().getElementById('status-message');
    }

    getStatusMessage () {
        return this.getRoot().getElementById('status-message').innerText;
    }

    getStatusAdditionalMessageHolder () {
        return this.getRoot().getElementById('status-additional-message');
    }

    getStatusAdditionalMessage () {
        return this.getRoot().getElementById('status-additional-message').innerText;
    }

    getTitleHolder () {
        return this.getRoot().getElementById('status-title');
    }

    getTitle () {
        return this.getRoot().getElementById('status-title').innerText;
    }

    getIcon () {
        return this.getRoot().getElementById('status-icon');
    }
}
