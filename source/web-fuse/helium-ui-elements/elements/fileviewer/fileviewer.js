import '../dialog/dialog.js';
import '../toolbar/toolbar.js';
import '../grid/grid.js';
import '../filter-builder/filter-builder.js';
import './fileviewer-details.js';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';
import { FileViewerUploader } from './fileviewer-uploader.js';
import { fileViewerUtils } from './fileviewer-utils.js';
import { sizeUtils } from '../common/size-utils.js';
import { stringUtils } from '../common/string-utils.js';

import inputCss from '../common/styles/input.css';
import selectCss from '../common/styles/select.css';
import fileviewerStyle from './fileviewer.css';

const styles = [inputCss, selectCss, fileviewerStyle];
const SUPPORTED_HTML_PREVIEW_EXTENSIONS = ['htm', 'html'];
const SUPPORTED_IMAGE_PREVIEW_EXTENSIONS = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];

(function () {
    class SLFileViewer extends HTMLElement {
        constructor () {
            super();
            this._selectedFiles = [];
        }

        static get observedAttributes () {
            return ['preview-url'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            switch (name) {
            case 'preview-url': {
                this._previewUrl = newValue;
                break;
            }
            }
        }

        set data (data) {
            this._items = data.items;
            this._totalCount = data.totalCount;
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
                this._init();
                this._renderMain();
                this._attachEventHandlers();
            }
            this._renderItems();
        }

        _init () {
            let pageSize = this.getAttribute('page-size') || 20;
            this._search = {
                page: 1,
                pageSize: pageSize
            };
            this._previewUrl = this.getAttribute('preview-url');
        }

        _renderMain () {
            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);

            let container = document.createElement('div');
            container.classList.add('sl-fileviewer-main');
            container.innerHTML = html`
                <div class="sl-fileviewer-toolbar">
                    <mc-toolbar class="sl-fileviewer-action">
                        <mc-toolbar-item name="upload" text="${this._i18n.toolbar.upload}"></mc-toolbar-item>
                        <mc-toolbar-item name="download" text="${this._i18n.toolbar.download}" disabled="true"></mc-toolbar-item>
                        <mc-toolbar-item name="preview" text="${this._i18n.toolbar.preview}" disabled="true"></mc-toolbar-item>
                        <mc-toolbar-item name="delete" text="${this._i18n.toolbar.delete}" disabled="true" show-on-mobile="false"></mc-toolbar-item>
                    </mc-toolbar>
                    <mc-toolbar class="sl-fileviewer-filter">
                        <mc-toolbar-item name="filter" icon="&#xf0b0;" text="${this._i18n.toolbar.filter}"></mc-toolbar-item>
                    </mc-toolbar>
                    <div class="sl-fileviewer-search">
                        <input class="sl-fileviewer-search-input mc-input" placeholder="${this._i18n.toolbar.search}">
                    </div>
                </div>
                <sl-filter-builder class="sl-fileviewer-filter-builder sl-fileviewer-filter-builder-hidden">
                    <sl-filter-builder-item name="name" text="Name">
                        <sl-filter-builder-operation name="MATCHES" text="${this._i18n.filter.MATCHES}"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                    <sl-filter-builder-item name="extension" text="Extension">
                        <sl-filter-builder-operation name="EQUALS" text="${this._i18n.filter.EQUALS}"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                    <sl-filter-builder-item name="properties" text="Properties" type="KeyValue">
                        <sl-filter-builder-operation name="EQUALS" text="${this._i18n.filter.EQUALS}"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                </sl-filter-builder>
                <sl-grid page-size="20" show-select-all="true" locale="${this._i18n.grid.locale}" page-size-label="${this._i18n.grid.pageSizeLabel}" go-to-page-label="${this._i18n.grid.goToPageLabel}" current-page-label="${this._i18n.grid.currentPageLabel}">
                    <sl-grid-column type="checkbox" name="selection" width="35px" sortable="false"></sl-grid-column>
                    <sl-grid-column type="icon" name="edit" width="30px" icon="&#xf040;" sortable="false"></sl-grid-column>
                    <sl-grid-column type="text" name="name" width="2fr" title="${this._i18n.grid.name}" field="name"></sl-grid-column>
                    <sl-grid-column type="text" name="extension" title="${this._i18n.grid.extension}" field="extension" show-on-mobile="false"></sl-grid-column>
                    <sl-grid-column type="text" name="size" title="${this._i18n.grid.size}" field="formattedSize"></sl-grid-column>
                    <sl-grid-column type="date" name="created" title="${this._i18n.grid.created}" field="created" width="200px" show-on-mobile="false"></sl-grid-column>
                </sl-grid>
            `;
            this.shadowRoot.appendChild(container);
        }

        _attachEventHandlers () {
            let grid = this._getGrid();
            grid.addEventListener('grid-update-data', (e) => {
                this._search.page = e.detail.page;
                this._search.pageSize = e.detail.pageSize;
                this._search.sortBy = e.detail.sortBy;
                this._search.sortOrder = e.detail.sortOrder;
                this._fireUpdateEvent('grid');
            });
            grid.addEventListener('grid-checkbox-change', (e) => {
                if (e.detail.checked) {
                    this._selectItem(e.detail.item);
                } else {
                    this._unselectItem(e.detail.item);
                }
                this._updateToolbarItems();
            });
            grid.addEventListener('grid-action', (e) => {
                this._showFileDetails(JSON.parse(JSON.stringify(e.detail.item)));
            });
            this._getActionToolbar().addEventListener('toolbar-item-click', (e) => {
                switch (e.detail.name) {
                case 'upload': {
                    this.showUploadDialog();
                    break;
                }
                case 'download': {
                    this._fireDownloadEvent(this._selectedFiles);
                    break;
                }
                case 'preview': {
                    this._showPreview(this._selectedFiles);
                    break;
                }
                case 'delete': {
                    this._showDeleteDialog(this._selectedFiles);
                    break;
                }
                }
            });

            this._getFilterToolbar().addEventListener('toolbar-item-click', (e) => {
                switch (e.detail.name) {
                case 'filter': {
                    this._toggleFilterBuilder();
                    break;
                }
                }
            });

            let searchInput = this._getSearchInput();
            searchInput.addEventListener('input', () => {
                this._search.searchTerm = searchInput.value;
                this._fireUpdateEvent('search');
            });

            let filterBuilder = this._getFilterBuilder();
            filterBuilder.addEventListener('filter', (e) => {
                this._search.filters = e.detail.filters;
                this._fireUpdateEvent('filter');
            });
        }

        _toggleFilterBuilder () {
            this._showFilterBuilder = !this._showFilterBuilder;
            let filterBuilder = this._getFilterBuilder();
            if (this._showFilterBuilder) {
                filterBuilder.classList.add('sl-fileviewer-filter-builder-show');
                filterBuilder.classList.remove('sl-fileviewer-filter-builder-hidden');
            } else {
                filterBuilder.classList.remove('sl-fileviewer-filter-builder-show');
                filterBuilder.classList.add('sl-fileviewer-filter-builder-hidden');
            }
        }

        _selectItem (item) {
            if (this._selectedFiles.indexOf(item) === -1) {
                this._selectedFiles.push(item);
            }
        }

        _unselectItem (item) {
            let index = this._selectedFiles.indexOf(item);
            if (index > -1) {
                this._selectedFiles.splice(index, 1);
            }
        }

        _updateToolbarItems () {
            let items = this._getActionToolbarItems();
            for (let item of items) {
                if (item.getAttribute('name') !== 'upload') {
                    item.setAttribute('disabled', this._selectedFiles.length === 0);
                }
                if (item.getAttribute('name') === 'preview') {
                    item.setAttribute('disabled', !this._previewSupported(this._selectedFiles));
                }
            }
        }

        _previewSupported (files) {
            if (files.length !== 1) {
                return false;
            }
            let extension = files[0].extension;
            return SUPPORTED_HTML_PREVIEW_EXTENSIONS.includes(extension) ||
                SUPPORTED_IMAGE_PREVIEW_EXTENSIONS.includes(extension);
        }

        _showPreview (files) {
            let extension = fileViewerUtils.getExtension(files[0].name);
            let url = this._previewUrl
                .replace('{id}', files[0].id)
                .replace('{type}', this._getFileType(extension));
            this._openHref(url, '_self');
        }

        _getFileType (extension) {
            if (SUPPORTED_IMAGE_PREVIEW_EXTENSIONS.includes(extension)) {
                return 'image';
            }
            return 'html';
        }

        _openHref (href, target) {
            let win = window.open(href, target);
            // win is undefined, if the window cannot be opened (e.g.popup blocker)
            if (win) {
                win.focus();
            }
        }

        showErrorDialog (errorHeader, errorMessage) {
            if (this._getDialog()) {
                return; // do not show multiple errors
            }

            let dialog = document.createElement('mc-dialog');
            dialog.setAttribute('header', errorHeader);
            dialog.setAttribute('show-middle-button', 'false');
            dialog.setAttribute('text-right-button', this._i18n.errorDialog.close);
            dialog.innerHTML = html`<span id="content" slot="content">
                <h4>${errorMessage}</h4>
            </span>`;
            dialog.addEventListener('right-button-click', () => {
                this._removeDialog(dialog);
            });
            dialog.addEventListener('modal-click', () => {
                this._removeDialog(dialog);
            });
            this.shadowRoot.appendChild(dialog);
        }

        showUploadDialog () {
            if (this._uploadDialogVisible) {
                return;
            }

            let uploadAction = (file) => {
                return this._fireUploadEvent(file);
            };
            let onSuccess = () => {
                this._fireUpdateEvent();
            };
            let onFailure = () => { };
            let dialog = new FileViewerUploader(this._i18n.upload).create(uploadAction, onSuccess, onFailure);
            dialog.addEventListener('right-button-click', () => {
                this._uploadDialogVisible = false;
                this._removeDialog(dialog);
            });
            dialog.addEventListener('modal-click', () => {
                this._uploadDialogVisible = false;
                this._removeDialog(dialog);
            });
            this.shadowRoot.appendChild(dialog);
            this._uploadDialogVisible = true;
        }

        _showDeleteDialog (files, callback) {
            let dialog = document.createElement('mc-dialog');
            dialog.setAttribute('header', this._deleteFileMessage(files));
            dialog.setAttribute('text-middle-button', this._i18n.deleteDialog.delete);
            dialog.setAttribute('text-right-button', this._i18n.deleteDialog.cancel);
            dialog.addEventListener('middle-button-click', (e) => {
                this._fireFileDeleteEvent(files);
                this._removeDialog(dialog);
                if (callback) {
                    callback();
                }
            });
            dialog.addEventListener('right-button-click', () => {
                this._removeDialog(dialog);
            });
            dialog.addEventListener('modal-click', () => {
                this._removeDialog(dialog);
            });
            this.shadowRoot.appendChild(dialog);
        }

        _deleteFileMessage (files) {
            if (files.length === 1) {
                return stringUtils.format(this._i18n.deleteDialog.singleMessage, { fileName: files[0].name });
            }
            return stringUtils.format(this._i18n.deleteDialog.multipleMessage, { fileCount: files.length });
        }

        _removeDialog (dialog) {
            if (dialog && dialog.parentNode) {
                dialog.parentNode.removeChild(dialog);
            }
        }

        _renderItems () {
            if (!this._items || !this._i18n) {
                return;
            }

            this._selectedFiles = [];
            this._updateToolbarItems();
            let items = this._items.map((f) => {
                return this._convertToInternalStructure(f);
            });
            this._getGrid().data = { items: items, totalCount: this._totalCount };
        }

        _convertToInternalStructure (file) {
            let name = file.properties['Name'] || '';
            let formattedSize = sizeUtils.format(file.size);
            return {
                id: file.id,
                serviceGroup: file.serviceGroup,
                name: name,
                extension: fileViewerUtils.getExtension(name),
                size: file.size,
                size64: file.size64,
                formattedSize: formattedSize.value + ' ' + formattedSize.unit,
                properties: file.properties,
                created: file.created
            };
        }

        _convertToFileStructure (internalFile) {
            let properties = internalFile.properties;
            properties['Name'] = internalFile.name;
            return {
                id: internalFile.id,
                serviceGroup: internalFile.serviceGroup,
                size: internalFile.size,
                size64: internalFile.size64,
                properties: properties,
                created: internalFile.created
            };
        }

        _showFileDetails (file) {
            let updated = {};

            let dialog = document.createElement('mc-dialog');
            dialog.setAttribute('header', this._i18n.detailsDialog.header);
            dialog.setAttribute('position', 'right');
            dialog.setAttribute('show-left-button', 'true');
            dialog.setAttribute('text-left-button', this._i18n.detailsDialog.update);
            dialog.setAttribute('text-middle-button', this._i18n.detailsDialog.delete);
            dialog.setAttribute('text-right-button', this._i18n.detailsDialog.cancel);
            dialog.innerHTML = html`<span id="content" slot="content">
                <sl-fileviewer-details></sl-fileviewer-details>
            </span>`;
            dialog.addEventListener('left-button-click', () => {
                if (updated.file) {
                    this._fireFileUpdateEvent(updated.file);
                }
                this._removeDialog(dialog);
            });
            dialog.addEventListener('middle-button-click', () => {
                this._showDeleteDialog([file], () => {
                    this._removeDialog(dialog);
                });
            });
            dialog.addEventListener('right-button-click', () => {
                this._removeDialog(dialog);
            });
            dialog.addEventListener('modal-click', () => {
                this._removeDialog(dialog);
            });
            this.shadowRoot.appendChild(dialog);

            let fileDetails = this._getFileDetails();
            fileDetails.addEventListener('file-update', (e) => {
                updated.file = e.detail.file;
            });
            fileDetails.i18n = this._i18n.details;
            fileDetails.data = file;
        }

        _fireUpdateEvent (trigger) {
            let eventData = {
                page: this._search.page,
                pageSize: this._search.pageSize,
                sortBy: this._search.sortBy,
                sortOrder: this._search.sortOrder,
                searchTerm: this._search.searchTerm,
                filters: this._search.filters,
                trigger: trigger
            };
            this.dispatchEvent(new CustomEvent('file-data', { detail: eventData }));
        }

        _fireUploadEvent (data) {
            return new Promise((resolve, reject) => {
                let eventData = {
                    data: data,
                    resolve: resolve,
                    reject: reject
                };
                this.dispatchEvent(new CustomEvent('file-upload', { detail: eventData }));
            });
        }

        _fireDownloadEvent (files) {
            let eventData = {
                files: files.map((f) => this._convertToFileStructure(f))
            };
            this.dispatchEvent(new CustomEvent('file-download', { detail: eventData }));
        }

        _fireFileUpdateEvent (file) {
            let eventData = {
                file: this._convertToFileStructure(file)
            };
            this.dispatchEvent(new CustomEvent('file-update', { detail: eventData }));
        }

        _fireFileDeleteEvent (files) {
            let eventData = {
                files: files.map((f) => this._convertToFileStructure(f))
            };
            this.dispatchEvent(new CustomEvent('file-delete', { detail: eventData }));
        }

        _getFileDetails () {
            return this.shadowRoot.querySelector('sl-fileviewer-details');
        }

        _getGrid () {
            return this.shadowRoot.querySelector('sl-grid');
        }

        _getActionToolbar () {
            return this.shadowRoot.querySelector('.sl-fileviewer-action');
        }

        _getFilterToolbar () {
            return this.shadowRoot.querySelector('.sl-fileviewer-filter');
        }

        _getFilterBuilder () {
            return this.shadowRoot.querySelector('sl-filter-builder');
        }

        _getSearchInput () {
            return this.shadowRoot.querySelector('.sl-fileviewer-search-input');
        }

        _getActionToolbarItems () {
            return this._getActionToolbar().querySelectorAll('mc-toolbar-item');
        }

        _getDialog () {
            return this.shadowRoot.querySelector('mc-dialog');
        }
    }

    componentUtils.registerCustomElement('sl-fileviewer', SLFileViewer);
})();
