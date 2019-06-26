import '../list-editor/list-editor.js';

import { componentUtils } from '../common/component-utils.js';
import { dateUtils } from '../common/date-utils.js';
import { html } from '../../library/html-utils.js';

import inputCss from '../common/styles/input.css';
import fileviewerStyle from './fileviewer.css';

const styles = [inputCss, fileviewerStyle];

(function () {
    class SLFileViewerDetails extends HTMLElement {
        set data (data) {
            this._data = data;
            this._render();
        }

        set i18n (i18n) {
            this._i18n = i18n;
            this._render();
        }

        connectedCallback () {
            componentUtils.upgradeProperty(this, 'data');
            componentUtils.upgradeProperty(this, 'i18n');
            this._render();
        }

        _render () {
            if (!this.shadowRoot && this._i18n) {
                this._renderMain();
            }
            this._renderData();
        }

        _renderMain () {
            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);

            let container = document.createElement('div');
            container.classList.add('sl-fileviewer-details-main');
            this.shadowRoot.appendChild(container);
        }

        _renderData () {
            if (!this._data || !this._i18n) {
                return;
            }

            let file = this._data;

            let main = this._getMain();
            main.innerHTML = html`
                <div>
                    <div class="sl-fileviewer-form-row">
                        <label class="sl-fileviewer-form-label">${this._i18n.name}</label>
                        <input class="sl-fileviewer-form-input mc-input" id="file-name" value="${file.name}">
                    </div>
                    <div class="sl-fileviewer-form-row">
                        <label class="sl-fileviewer-form-label">${this._i18n.extension}</label>
                        <span id="file-extension">${file.extension}</span>
                    </div>
                    <div class="sl-fileviewer-form-row">
                        <label class="sl-fileviewer-form-label">${this._i18n.created}</label>
                        <span id="file-created">${dateUtils.format(file.created, this._i18n.locale)}</span>
                    </div>
                    <div class="sl-fileviewer-form-row">
                        <label class="sl-fileviewer-form-label">${this._i18n.size}</label>
                        <span id="file-size">${file.formattedSize}</span>
                    </div>
                    <div class="sl-fileviewer-form-row">
                        <label class="sl-fileviewer-form-label">${this._i18n.properties}</label>
                        <sl-list-editor id="file-properties" type="KeyValue" key-placeholder="${this._i18n.propertiesKey}" value-placeholder="${this._i18n.propertiesValue}"></sl-list-editor>
                    </div>
                </div>
            `;
            this._attachEventHandlers(file);
        }

        _attachEventHandlers (file) {
            let nameInput = this._getNameInput();
            nameInput.addEventListener('change', () => {
                file.name = nameInput.value;
                this._fireFileUpdateEvent(file);
            });

            let propertiesEditor = this._getPropertiesEditor();
            propertiesEditor.data = this._objectToKeyValueList(this._filterKnownProperties(file.properties));
            propertiesEditor.addEventListener('list-change', (e) => {
                file.properties = this._keyValueListToObject(e.detail.data);
                file.properties['Name'] = nameInput.value;
                this._fireFileUpdateEvent(file);
            });
        }

        _filterKnownProperties (properties) {
            let filteredProperties = {};
            for (let property in properties) {
                if (properties.hasOwnProperty(property) && property !== 'Name') {
                    filteredProperties[property] = properties[property];
                }
            }
            return filteredProperties;
        }

        _objectToKeyValueList (obj) {
            obj = obj || {};
            return Object.keys(obj).map(function (key) {
                return { key: key, value: obj[key] };
            });
        }

        _keyValueListToObject (list) {
            let result = {};
            for (let item of list) {
                result[item.key] = item.value;
            }
            return result;
        }

        _fireFileUpdateEvent (file) {
            let eventData = {
                file: file
            };
            this.dispatchEvent(new CustomEvent('file-update', { detail: eventData }));
        }

        _getMain () {
            return this.shadowRoot.querySelector('.sl-fileviewer-details-main');
        }

        _getPropertiesEditor () {
            return this.shadowRoot.querySelector('#file-properties');
        }

        _getNameInput () {
            return this.shadowRoot.querySelector('#file-name');
        }
    }
    componentUtils.registerCustomElement('sl-fileviewer-details', SLFileViewerDetails);
})();
