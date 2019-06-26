export class StorageGraphPage {
    getRoot () {
        return document.querySelector('sl-storage-graph').shadowRoot;
    }

    getMain () {
        return this.getRoot().querySelector('.sl-storage-graph-main');
    }

    getHeader () {
        return this.getRoot().querySelector('.sl-storage-graph-header');
    }

    getLimit () {
        return this.getRoot().querySelector('.sl-storage-graph-limit');
    }

    getUsed () {
        return this.getRoot().querySelector('.sl-storage-graph-used');
    }

    getPercentage () {
        return this.getRoot().querySelector('.sl-storage-graph-percentage');
    }
}
