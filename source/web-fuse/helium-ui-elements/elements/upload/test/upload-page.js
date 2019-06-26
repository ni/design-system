export class UploadPage {
    constructor (element) {
        this._element = element;
    }

    getRoot () {
        return this._element ? this._element.shadowRoot : document.querySelector('mc-upload').shadowRoot;
    }

    getUpload () {
        return this.getRoot().querySelector('.mc-upload-main');
    }

    getBrowse () {
        return this.getRoot().querySelector('.mc-upload-drop-browse');
    }

    getFormText () {
        return this.getRoot().querySelector('.mc-upload-drop-form-text');
    }

    getErrorMessage () {
        return this.getRoot().querySelector('.mc-upload-error-message');
    }

    getInput () {
        return this.getRoot().querySelector('.mc-upload-input');
    }

    getLinks () {
        return this.getRoot().querySelectorAll('.mc-upload-links p');
    }

    clickLink (i) {
        return this.getLinks()[i].querySelector('a').click();
    }

    getDataTransfer (content, fileName) {
        try {
            let dataTransfer = new DataTransfer();
            dataTransfer.items.add(new File([content], fileName));
            return dataTransfer;
        } catch (error) {
            let dataTransfer = {
                'files': [new File([content], fileName)]
            };
            return dataTransfer;
        }
    }

    startUpload (content, fileName) {
        let dataTransfer = this.getDataTransfer(content, fileName);
        let input = this.getInput();
        spyOnProperty(input, 'files', 'get').and.callFake(() => { return dataTransfer.files; });
        input.dispatchEvent(new Event('change'));
    }
}
