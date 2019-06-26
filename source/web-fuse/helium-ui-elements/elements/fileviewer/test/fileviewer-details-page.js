import { ListEditorPage } from '../../list-editor/test/list-editor-page.js';

export class FileViewerDetailsPage {
    constructor (element) {
        this._element = element;
    }

    getRoot () {
        return this._element ? this._element.shadowRoot : document.querySelector('sl-fileviewer-details').shadowRoot;
    }

    getNameInput () {
        return this.getRoot().querySelector('#file-name');
    }

    getExtension () {
        return this.getRoot().querySelector('#file-extension');
    }

    getCreated () {
        return this.getRoot().querySelector('#file-created');
    }

    getSize () {
        return this.getRoot().querySelector('#file-size');
    }

    getPropertiesListEditorPage () {
        return new ListEditorPage(this.getRoot().querySelector('#file-properties'));
    }
}
