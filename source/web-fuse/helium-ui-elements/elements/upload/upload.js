import uploadCss from './upload.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [uploadCss];

(function () {
    class MCUpload extends HTMLElement {
        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
                this._attachEventHandlers();
            }
        }

        get startText () {
            return this.getAttribute('start-text');
        }

        set startText (value) {
            this.setAttribute('start-text', value);
        }

        get pendingText () {
            return this.getAttribute('pending-text');
        }

        set pendingText (value) {
            this.setAttribute('pending-text', value);
        }

        get successText () {
            return this.getAttribute('success-text');
        }

        set successText (value) {
            this.setAttribute('success-text', value);
        }

        get failureText () {
            return this.getAttribute('failure-text');
        }

        set failureText (value) {
            this.setAttribute('failure-text', value);
        }

        get uploadButtonText () {
            return this.getAttribute('upload-button-text');
        }

        set uploadButtonText (value) {
            this.setAttribute('upload-button-text', value);
        }

        get status () {
            return this.getAttribute('status');
        }

        set status (value) {
            this.setAttribute('status', value);
        }

        get fileType () {
            return this.getAttribute('file-type');
        }

        set fileType (value) {
            this.setAttribute('file-type', value);
        }

        get errorMessage () {
            return this.getAttribute('error-message');
        }

        set errorMessage (value) {
            this.setAttribute('error-message', value);
        }

        static get observedAttributes () {
            return ['status', 'file-type', 'error-message'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'status': {
                this._renderStatus(newValue);
                break;
            }
            case 'file-type': {
                this._renderStatus(this.status);
                this._getUploadInput().setAttribute('accept', newValue);
                break;
            }
            case 'error-message': {
                this._renderStatus(this.status);
                break;
            }
            }
        }

        _renderStatus (value) {
            switch (value) {
            case 'start': {
                this._setStatusStart();
                break;
            }
            case 'pending': {
                this._setStatusPending();
                break;
            }
            case 'success': {
                this._setStatusSuccess();
                break;
            }
            case 'failure': {
                this._setStatusFailure();
                break;
            }
            }
        }

        _render () {
            const template = document.createElement('template');
            template.innerHTML =
                html`<div class='mc-upload-main'>
                    <div class='mc-upload-drop-area'>
                        <form class='mc-upload-drop-form'>
                            <div class='mc-upload-status'></div>
                            <input type='file' accept="${this.fileType || '*'}" class='mc-upload-input'>
                            <div class='mc-upload-drop-form-text'></div>
                            <div class="mc-upload-links"></div>
                        </form>
                    </div>
                </div>`;

            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this._renderStatus(this.status || 'start');
        }

        _clearLinks () {
            let parent = this._getLinkContainer();
            parent.innerHTML = '';
        }

        _renderLinks (type) {
            this._clearLinks();
            let parent = this._getLinkContainer();
            let links = this._getLinks(type);
            for (let item of links) {
                let element = this._createLink(item);
                parent.appendChild(element);
            }
        }

        _createLink (item) {
            let link = document.createElement('a');
            link.href = '';
            link.textContent = item.text;
            link.addEventListener('click', (e) => {
                this._preventDefaults(e);
                this.dispatchEvent(new CustomEvent('upload-link-click', { detail: item }));
            });

            let container = document.createElement('p');
            container.id = item.name;
            container.appendChild(link);
            container.appendChild(document.createTextNode(' ' + item.description));

            return container;
        }

        _getLinks (type) {
            let links = [...this.querySelectorAll(type)];
            return links.map(function (item) {
                return {
                    name: item.getAttribute('name'),
                    text: item.getAttribute('text'),
                    description: item.getAttribute('description')
                };
            });
        }

        _attachEventHandlers () {
            this._getUploadInput().addEventListener('change', (e) => this._handleFileUpload(e));
            this._getDropArea().addEventListener('drop', (e) => this._handleFileUpload(e));

            let that = this;
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                that._getMain().addEventListener(eventName, (e) => that._preventDefaults(e));
            });

            ['dragenter', 'dragover'].forEach(eventName => {
                that._getDropArea().addEventListener(eventName, (e) => that._highlight(e));
            });

            ['dragleave', 'drop'].forEach(eventName => {
                that._getDropArea().addEventListener(eventName, (e) => that._unhighlight(e));
            });
        }

        _preventDefaults (e) {
            e.preventDefault();
            e.stopPropagation();
        };

        _highlight (e) {
            this._getDropArea().classList.add('highlight');
        };

        _unhighlight (e) {
            // 'dragleave' is also fired when dragging between child elements of dropArea
            let dropArea = this._getDropArea();
            if (!dropArea.contains(e.fromElement)) {
                dropArea.classList.remove('highlight');
            }
        };

        _getFileFromEvent (e) {
            let dataTransfer = e.dataTransfer; // drag-drop
            let target = e.target; // browse

            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                return dataTransfer.files[0];
            } else if (target && target.files && target.files.length) {
                return target.files[0];
            }
        }

        _setStatusStart () {
            let statusDiv = this._getStatusDiv();
            statusDiv.classList.add('mc-upload-start');
            statusDiv.classList.remove('mc-upload-pending', 'mc-upload-success', 'mc-upload-failure');

            let browse = document.createElement('a');
            browse.classList.add('mc-upload-drop-browse');
            browse.href = '';
            browse.textContent = this.uploadButtonText;
            browse.addEventListener('click', (e) => {
                this._preventDefaults(e);
                this._getUploadInput().click();
            });

            let formText = this._getFormText();
            formText.innerHTML = '';
            formText.appendChild(document.createTextNode(this.startText));
            formText.appendChild(browse);

            this._clearLinks();
        }

        _setStatusPending () {
            let statusDiv = this._getStatusDiv();
            statusDiv.classList.add('mc-upload-pending');
            statusDiv.classList.remove('mc-upload-start', 'mc-upload-success', 'mc-upload-failure');

            let formText = this._getFormText();
            formText.innerHTML = `<h3>${this.pendingText}</h3>`;

            this._clearLinks();
        }

        _setStatusSuccess () {
            let statusDiv = this._getStatusDiv();
            statusDiv.classList.add('mc-upload-success');
            statusDiv.classList.remove('mc-upload-start', 'mc-upload-pending', 'mc-upload-failure');

            let formText = this._getFormText();
            formText.innerHTML = `<h3>${this.successText}</h3>`;

            this._renderLinks('mc-upload-success-link');
        }

        _setStatusFailure () {
            let statusDiv = this._getStatusDiv();
            statusDiv.classList.add('mc-upload-failure');
            statusDiv.classList.remove('mc-upload-start', 'mc-upload-pending', 'mc-upload-success');

            let formText = this._getFormText();
            formText.innerHTML =
                `<h3>${this.failureText}</h3>
                 <h4 class="mc-upload-error-message">${this.errorMessage || 'An error has ocurred while uploading.'}</h4>`;

            this._renderLinks('mc-upload-failure-link');
        }

        _handleFileUpload (e) {
            let file = this._getFileFromEvent(e);
            if (!file) {
                return;
            }

            let detail = {
                file: file
            };
            this.dispatchEvent(new CustomEvent('upload-file-selected', { detail: detail }));
        }

        _getFormText () {
            return this.shadowRoot.querySelector('.mc-upload-drop-form-text');
        }

        _getStatusDiv () {
            return this.shadowRoot.querySelector('.mc-upload-status');
        }

        _getUploadInput () {
            return this.shadowRoot.querySelector('.mc-upload-input');
        }

        _getMain () {
            return this.shadowRoot.querySelector('.mc-upload-main');
        }

        _getDropArea () {
            return this.shadowRoot.querySelector('.mc-upload-drop-area');
        }

        _getLinkContainer () {
            return this.shadowRoot.querySelector('.mc-upload-links');
        }
    }

    componentUtils.registerCustomElement('mc-upload', MCUpload);
})();
