import { ListEditorPage } from '../../list-editor/test/list-editor-page.js';

export class TagViewerDetailsPage {
    constructor (element) {
        this._element = element;
    }

    getRoot () {
        return this._element ? this._element.shadowRoot : document.querySelector('sl-tagviewer-details').shadowRoot;
    }

    getPath () {
        return this.getRoot().querySelector('#tag-path');
    }

    getType () {
        return this.getRoot().querySelector('#tag-type');
    }

    getValueInput () {
        return this.getRoot().querySelector('#tag-value');
    }

    getValueErrorMessage () {
        return this.getRoot().querySelector('#tag-value-error-message');
    }

    getCollectAggregatesSelect () {
        return this.getRoot().querySelector('#tag-collect-aggregates');
    }

    getRetentionSelect () {
        return this.getRoot().querySelector('#tag-retention');
    }

    getRetentionDaysInput () {
        return this.getRoot().querySelector('#tag-retention-days');
    }

    getRetentionCountInput () {
        return this.getRoot().querySelector('#tag-retention-count');
    }

    getKeywordsListEditorPage () {
        return new ListEditorPage(this.getRoot().querySelector('#tag-keywords'));
    }

    getPropertiesListEditorPage () {
        return new ListEditorPage(this.getRoot().querySelector('#tag-properties'));
    }
}
