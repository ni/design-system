import '../dialog/dialog.js';
import '../toolbar/toolbar.js';
import '../grid/grid.js';
import '../filter-builder/filter-builder.js';
import './tagviewer-details.js';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';
import { stringUtils } from '../common/string-utils.js';

import inputCss from '../common/styles/input.css';
import tagviewerStyle from './tagviewer.css';

const styles = [inputCss, tagviewerStyle];

(function () {
    class SLTagViewer extends HTMLElement {
        constructor () {
            super();
            this._selectedTagsWithValues = [];
        }

        get data () {
            return {
                items: this._items,
                totalCount: this._totalCount
            };
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
        }

        _renderMain () {
            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);

            let container = document.createElement('div');
            container.classList.add('sl-tagviewer-main');
            container.innerHTML = html`
                <div class="sl-tagviewer-toolbar">
                    <mc-toolbar class="sl-tagviewer-action">
                        <mc-toolbar-item name="create" text="${this._i18n.toolbar.create}"></mc-toolbar-item>
                        <mc-toolbar-item name="update" text="${this._i18n.toolbar.update}" disabled="true"></mc-toolbar-item>
                        <mc-toolbar-item name="reset" text="${this._i18n.toolbar.resetAggregates}" disabled="true" show-on-mobile="false"></mc-toolbar-item>
                        <mc-toolbar-item name="delete" text="${this._i18n.toolbar.delete}" disabled="true" show-on-mobile="false"></mc-toolbar-item>
                        <mc-toolbar-item name="history" text="${this._i18n.toolbar.history}" disabled="true"></mc-toolbar-item>
                        <mc-toolbar-item name="export" icon="&#xf0d7;" icon-position="right" text="${this._i18n.toolbar.csvExport}" disabled="true" show-on-mobile="false">
                            <mc-toolbar-item name="export-history" text="${this._i18n.toolbar.csvExportHistory}"></mc-toolbar-item>
                            <mc-toolbar-item name="export-details" text="${this._i18n.toolbar.csvExportDetails}"></mc-toolbar-item>
                        </mc-toolbar-item>
                    </mc-toolbar>
                    <mc-toolbar class="sl-tagviewer-filter">
                        <mc-toolbar-item name="filter" icon="&#xf0b0;" text="${this._i18n.toolbar.filter}"></mc-toolbar-item>
                    </mc-toolbar>
                    <div class="sl-tagviewer-search">
                        <input class="sl-tagviewer-search-input mc-input" placeholder="${this._i18n.toolbar.search}">
                    </div>
                </div>
                <sl-filter-builder class="sl-tagviewer-filter-builder sl-tagviewer-filter-builder-hidden">
                    <sl-filter-builder-item name="path" text="Path" operations="MATCHES">
                        <sl-filter-builder-operation name="MATCHES" text="${this._i18n.filter.MATCHES}"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                    <sl-filter-builder-item name="keywords" text="Keywords" operations="EQUALS">
                        <sl-filter-builder-operation name="EQUALS" text="${this._i18n.filter.EQUALS}"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                    <sl-filter-builder-item name="properties" text="Properties" operations="EQUALS" type="KeyValue">
                        <sl-filter-builder-operation name="EQUALS" text="${this._i18n.filter.EQUALS}"></sl-filter-builder-operation>
                    </sl-filter-builder-item>
                </sl-filter-builder>
                <sl-grid id="tagviewer-grid" page-size="20" show-select-all="true" locale="${this._i18n.grid.locale}" page-size-label="${this._i18n.grid.pageSizeLabel}" go-to-page-label="${this._i18n.grid.goToPageLabel}" current-page-label="${this._i18n.grid.currentPageLabel}">
                    <sl-grid-column type="checkbox" name="selection" width="35px" sortable="false"></sl-grid-column>
                    <sl-grid-column type="icon" name="edit" width="30px" icon="&#xf040;" sortable="false"></sl-grid-column>
                    <sl-grid-column type="text" name="path" width="3fr" title="${this._i18n.grid.path}" field="tag.path"></sl-grid-column>
                    <sl-grid-column type="text" name="value" optional="true" title="${this._i18n.grid.value}" field="current.value.value"></sl-grid-column>
                    <sl-grid-column type="text" name="min" optional="true" title="${this._i18n.grid.min}" field="aggregates.min" show-on-mobile="false"></sl-grid-column>
                    <sl-grid-column type="text" name="max" optional="true" title="${this._i18n.grid.max}" field="aggregates.max" show-on-mobile="false"></sl-grid-column>
                    <sl-grid-column type="text" name="mean" optional="true" title="${this._i18n.grid.mean}" field="aggregates.avg" show-on-mobile="false"></sl-grid-column>
                    <sl-grid-column type="text" name="count" optional="true" title="${this._i18n.grid.count}" field="aggregates.count" show-on-mobile="false"></sl-grid-column>
                    <sl-grid-column type="date" name="updated" optional="true" title="${this._i18n.grid.updated}" field="current.timestamp" width="200px" show-on-mobile="false"></sl-grid-column>
                    <sl-grid-column type="text" name="keywords" optional="true" title="${this._i18n.grid.keywords}" field="tag.keywords" width="200px" show="false" show-on-mobile="false"></sl-grid-column>
                    <sl-grid-column type="text" name="type" optional="true" title="${this._i18n.grid.type}" field="tag.formattedType" width="150px" show="false" show-on-mobile="false"></sl-grid-column>
                    <sl-grid-column type="text" name="collectAggregates" optional="true" title="${this._i18n.grid.collectAggregates}" field="tag.collectAggregates" width="150px" show="false" show-on-mobile="false"></sl-grid-column>
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
                let tagsWithValues = JSON.parse(JSON.stringify(e.detail.item));
                this._showTagDetails([tagsWithValues]);
            });
            this._getActionToolbar().addEventListener('toolbar-item-click', (e) => {
                switch (e.detail.name) {
                case 'create': {
                    this._showCreateDialog();
                    break;
                }
                case 'update': {
                    let tagsWithValues = JSON.parse(JSON.stringify(this._selectedTagsWithValues));
                    this._showTagDetails(tagsWithValues);
                    break;
                }
                case 'reset': {
                    this._fireResetAggregatesEvent(this._selectedTagsWithValues);
                    break;
                }
                case 'delete': {
                    this._showDeleteDialog(this._selectedTagsWithValues);
                    break;
                }
                case 'history': {
                    this._fireHistoryEvent(this._selectedTagsWithValues);
                    break;
                }
                case 'export-history': {
                    this._showExportHistoryDialog(this._selectedTagsWithValues);
                    break;
                }
                case 'export-details': {
                    this._fireExportDetailsEvent(this._selectedTagsWithValues);
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
                filterBuilder.classList.add('sl-tagviewer-filter-builder-show');
                filterBuilder.classList.remove('sl-tagviewer-filter-builder-hidden');
            } else {
                filterBuilder.classList.remove('sl-tagviewer-filter-builder-show');
                filterBuilder.classList.add('sl-tagviewer-filter-builder-hidden');
            }
        }

        _selectItem (item) {
            if (this._selectedTagsWithValues.indexOf(item) === -1) {
                this._selectedTagsWithValues.push(item);
            }
        }

        _unselectItem (item) {
            let index = this._selectedTagsWithValues.indexOf(item);
            if (index > -1) {
                this._selectedTagsWithValues.splice(index, 1);
            }
        }

        _updateToolbarItems () {
            let items = this._getActionToolbarItems();
            for (let item of items) {
                if (item.getAttribute('name') !== 'create') {
                    item.setAttribute('disabled', this._selectedTagsWithValues.length === 0);
                }
            }
        }

        _showCreateDialog () {
            let dialog = document.createElement('mc-dialog');
            dialog.setAttribute('header', this._i18n.createDialog.header);
            dialog.setAttribute('text-middle-button', this._i18n.createDialog.create);
            dialog.setAttribute('text-right-button', this._i18n.createDialog.cancel);
            dialog.setAttribute('disabled-middle-button', 'true');
            dialog.innerHTML = html`<span id="content" slot="content">
                <div class="sl-tagviewer-form-row">
                    <label class="sl-tagviewer-form-label">${this._i18n.createDialog.path}</label>
                    <input class="sl-tagviewer-form-input mc-input" id="new-tag-path" value="">
                </div>
                <div class="sl-tagviewer-form-row">
                    <label class="sl-tagviewer-form-label">${this._i18n.createDialog.type}</label>
                    <select class="sl-tagviewer-form-input mc-select" id="new-tag-type">
                        <option value="INT">${this._i18n.types.INT}</option>
                        <option value="DOUBLE">${this._i18n.types.DOUBLE}</option>
                        <option value="U_INT64">${this._i18n.types.U_INT64}</option>
                        <option value="STRING">${this._i18n.types.STRING}</option>
                        <option value="BOOLEAN">${this._i18n.types.BOOLEAN}</option>
                        <option value="DATE_TIME">${this._i18n.types.DATE_TIME}</option>
                    </select>
                </div>
                <div class="sl-tagviewer-form-row">
                    <label class="sl-tagviewer-form-label">${this._i18n.createDialog.retention}</label>
                    <select class="sl-tagviewer-form-input mc-select" id="new-tag-retention">
                        <option value="NONE">${this._i18n.retention.NONE}</option>
                        <option value="COUNT">${this._i18n.retention.COUNT}</option>
                        <option value="DURATION">${this._i18n.retention.DURATION}</option>
                        <option value="PERMANENT">${this._i18n.retention.PERMANENT}</option>
                    </select>
                </div>
                <div class="sl-tagviewer-form-row">
                    <label class="sl-tagviewer-form-label">${this._i18n.createDialog.collectAggregates}</label>
                    <div class="sl-tagviewer-form-input">
                        <input type="checkbox" id="new-tag-collect-aggregates" class="mc-checkbox">
                        <label for="new-tag-collect-aggregates"></label>
                    </div>
                </div>
            </span>`;
            dialog.addEventListener('middle-button-click', () => {
                let path = dialog.querySelector('#new-tag-path').value;
                let type = dialog.querySelector('#new-tag-type').value;
                let retention = dialog.querySelector('#new-tag-retention').value;
                let collectAggregates = dialog.querySelector('#new-tag-collect-aggregates').checked;

                let properties = {};
                this._addRetentionToProperties(properties, retention);

                let tag = {
                    path: path,
                    type: type,
                    keywords: [],
                    properties: properties,
                    collectAggregates: collectAggregates
                };
                this._fireCreateEvent(tag);
                this._removeDialog(dialog);
            });
            dialog.addEventListener('right-button-click', () => {
                this._removeDialog(dialog);
            });
            dialog.addEventListener('modal-click', () => {
                this._removeDialog(dialog);
            });
            let tagPathInput = dialog.querySelector('#new-tag-path');
            tagPathInput.addEventListener('input', () => {
                if (tagPathInput.value) {
                    dialog.setAttribute('disabled-middle-button', 'false');
                } else {
                    dialog.setAttribute('disabled-middle-button', 'true');
                }
            });
            this.shadowRoot.appendChild(dialog);
            tagPathInput.focus();
        }

        _addRetentionToProperties (properties, retention) {
            properties['nitagRetention'] = retention;
            switch (retention) {
            case 'COUNT':
                properties['nitagMaxHistoryCount'] = '10000';
                break;
            case 'DURATION':
                properties['nitagHistoryTTLDays'] = '30';
                break;
            }
        }

        _showDeleteDialog (tagsWithValues, callback) {
            let dialog = document.createElement('mc-dialog');
            dialog.setAttribute('header', this._deleteTagMessage(tagsWithValues));
            dialog.setAttribute('text-middle-button', this._i18n.deleteDialog.delete);
            dialog.setAttribute('text-right-button', this._i18n.deleteDialog.cancel);
            dialog.addEventListener('middle-button-click', (e) => {
                this._fireDeleteEvent(tagsWithValues);
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

        _showExportHistoryDialog (tagsWithValues, callback) {
            let dialog = document.createElement('mc-dialog');
            dialog.setAttribute('header', this._i18n.queryTagHistory.header);
            dialog.setAttribute('text-middle-button', this._i18n.queryTagHistory.getHistory);
            dialog.setAttribute('text-right-button', this._i18n.queryTagHistory.cancel);
            dialog.innerHTML = html`<span id="content" slot="content">
                <div class="sl-tagviewer-form-row">
                    <label class="sl-tagviewer-form-label">${this._i18n.queryTagHistory.range}</label>
                    <select class="sl-tagviewer-form-input mc-select" id="history-range" value="">
                        <option value="30d">${this._i18n.queryTagHistory._30d}</option>
                        <option value="6m">${this._i18n.queryTagHistory._6m}</option>
                        <option value="1y">${this._i18n.queryTagHistory._1y}</option>
                    </select>
                </div>
                <div class="sl-tagviewer-form-row">
                    <label class="sl-tagviewer-form-label">${this._i18n.queryTagHistory.samples}</label>
                    <input class="sl-tagviewer-form-input mc-input" id="history-samples" value="10000">
                </div>
                <div class="sl-tagviewer-form-error sl-tagviewer-hidden" id="history-samples-error-message"></div>
            </span>`;
            dialog.addEventListener('middle-button-click', (e) => {
                let range = dialog.querySelector('#history-range').value;
                let samples = dialog.querySelector('#history-samples').value;

                if (this._validateHistorySamplesValue(dialog, samples)) {
                    return;
                }

                let endTime = new Date();
                let startTime = new Date();
                switch (range) {
                case '30d':
                    startTime.setDate(endTime.getDate() - 30);
                    break;
                case '6m':
                    startTime.setMonth(endTime.getMonth() - 6);
                    break;
                case '1y':
                    startTime.setFullYear(endTime.getFullYear() - 1);
                    break;
                }

                let params = {
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString(),
                    take: samples
                };

                this._fireExportHistoryEvent(tagsWithValues, params);
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

            let historySamplesInput = dialog.querySelector('#history-samples');
            historySamplesInput.addEventListener('change', () => {
                this._validateHistorySamplesValue(dialog, historySamplesInput.value);
            });
        }

        _validateHistorySamplesValue (dialog, value) {
            let error = (isNaN(value) || value < 0);
            this._updateHistorySamplesValueErrorMessage(dialog, error);
            return error;
        }

        _updateHistorySamplesValueErrorMessage (dialog, error) {
            let historySamplesInput = dialog.querySelector('#history-range');
            let errorMessage = dialog.querySelector('#history-samples-error-message');
            if (error) {
                historySamplesInput.classList.add('error');
                errorMessage.textContent = this._i18n.queryTagHistory.mustBePositiveInteger;
                errorMessage.classList.remove('sl-tagviewer-hidden');
                dialog.disabledMiddleButton = 'true';
            } else {
                historySamplesInput.classList.remove('error');
                errorMessage.classList.add('sl-tagviewer-hidden');
                dialog.disabledMiddleButton = 'false';
            }
        }

        _deleteTagMessage (tagsWithValues) {
            if (tagsWithValues.length === 1) {
                return stringUtils.format(this._i18n.deleteDialog.singleMessage, { path: tagsWithValues[0].tag.path });
            }
            return stringUtils.format(this._i18n.deleteDialog.multipleMessage, { count: tagsWithValues.length });
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

            let items = this._items.map((t) => {
                return this._convertToInternalStructure(t);
            });
            this._selectedTagsWithValues = [];
            this._updateToolbarItems();
            this._getGrid().data = { items: items, totalCount: this._totalCount };
        }

        _convertToInternalStructure (tagWithValue) {
            let formattedType = this._i18n.types[tagWithValue.tag.type];
            return {
                tag: {
                    path: tagWithValue.tag.path,
                    type: tagWithValue.tag.type,
                    keywords: tagWithValue.tag.keywords,
                    properties: tagWithValue.tag.properties,
                    collectAggregates: tagWithValue.tag.collectAggregates,
                    formattedType: formattedType
                },
                aggregates: tagWithValue.aggregates,
                current: tagWithValue.current
            };
        }

        _convertToExternalTagStructure (tag) {
            return {
                path: tag.path,
                type: tag.type,
                keywords: tag.keywords,
                properties: tag.properties,
                collectAggregates: tag.collectAggregates
            };
        }

        _showTagDetails (tagsWithValues) {
            let updated = {};

            let dialog = document.createElement('mc-dialog');
            dialog.setAttribute('header', this._i18n.detailsDialog.header);
            dialog.setAttribute('position', 'right');
            dialog.setAttribute('show-left-button', 'true');
            dialog.setAttribute('text-left-button', this._i18n.detailsDialog.update);
            dialog.setAttribute('text-middle-button', this._i18n.detailsDialog.delete);
            dialog.setAttribute('text-right-button', this._i18n.detailsDialog.cancel);
            dialog.innerHTML = html`<span id="content" slot="content">
                <sl-tagviewer-details></sl-tagviewer-details>
            </span>`;
            dialog.addEventListener('left-button-click', () => {
                if (updated.error) {
                    return;
                }
                if (updated.value) {
                    this._fireTagValuesUpdateEvent(tagsWithValues, updated.value);
                }
                if (updated.tags) {
                    this._fireTagUpdateEvent(updated.tags);
                }
                this._removeDialog(dialog);
            });
            dialog.addEventListener('middle-button-click', () => {
                this._showDeleteDialog(tagsWithValues, () => {
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

            let tagDetails = this._getTagDetails();
            tagDetails.addEventListener('tag-update', (e) => {
                updated.tags = e.detail.tags;
            });
            tagDetails.addEventListener('tag-update-value', (e) => {
                updated.value = e.detail.value;
                updated.error = e.detail.error;
            });
            tagDetails.i18n = this._i18n.details;
            tagDetails.data = tagsWithValues;
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
            this.dispatchEvent(new CustomEvent('tag-data', { detail: eventData }));
        }

        _fireCreateEvent (tag) {
            let eventData = {
                tag: this._convertToExternalTagStructure(tag)
            };
            this.dispatchEvent(new CustomEvent('tag-create', { detail: eventData }));
        }

        _fireTagUpdateEvent (tags) {
            tags = tags.map((tag) => {
                return this._convertToExternalTagStructure(tag);
            });
            let eventData = {
                tags: tags
            };
            this.dispatchEvent(new CustomEvent('tag-update', { detail: eventData }));
        }

        _fireDeleteEvent (tagsWithValues) {
            let eventData = {
                tags: this._getTagsFromTagsWithValues(tagsWithValues)
            };
            this.dispatchEvent(new CustomEvent('tag-delete', { detail: eventData }));
        }

        _fireResetAggregatesEvent (tagsWithValues) {
            let eventData = {
                tags: this._getTagsFromTagsWithValues(tagsWithValues)
            };
            this.dispatchEvent(new CustomEvent('tag-reset-aggregates', { detail: eventData }));
        }

        _fireTagValuesUpdateEvent (tagsWithValues, value) {
            let eventData = {
                tags: this._getTagsFromTagsWithValues(tagsWithValues),
                value: value
            };
            this.dispatchEvent(new CustomEvent('tag-update-values', { detail: eventData }));
        }

        _fireHistoryEvent (tagsWithValues) {
            let eventData = {
                tags: this._getTagsFromTagsWithValues(tagsWithValues)
            };
            this.dispatchEvent(new CustomEvent('tag-history', { detail: eventData }));
        }

        _fireExportDetailsEvent (tagsWithValues) {
            let eventData = {
                tags: this._getTagsFromTagsWithValues(tagsWithValues)
            };
            this.dispatchEvent(new CustomEvent('tag-export-details', { detail: eventData }));
        }

        _fireExportHistoryEvent (tagsWithValues, params) {
            let eventData = {
                tags: this._getTagsFromTagsWithValues(tagsWithValues),
                params: params
            };
            this.dispatchEvent(new CustomEvent('tag-export-history', { detail: eventData }));
        }

        _getTagsFromTagsWithValues (tagsWithValues) {
            return tagsWithValues.map((tagWithValue) => {
                return this._convertToExternalTagStructure(tagWithValue.tag);
            });
        }

        _getTagDetails () {
            return this.shadowRoot.querySelector('sl-tagviewer-details');
        }

        _getGrid () {
            return this.shadowRoot.querySelector('sl-grid');
        }

        _getActionToolbar () {
            return this.shadowRoot.querySelector('.sl-tagviewer-action');
        }

        _getFilterToolbar () {
            return this.shadowRoot.querySelector('.sl-tagviewer-filter');
        }

        _getFilterBuilder () {
            return this.shadowRoot.querySelector('sl-filter-builder');
        }

        _getSearchInput () {
            return this.shadowRoot.querySelector('.sl-tagviewer-search-input');
        }

        _getActionToolbarItems () {
            return this._getActionToolbar().querySelectorAll('mc-toolbar-item');
        }

        _getDialog () {
            return this.shadowRoot.querySelector('mc-dialog');
        }
    }

    componentUtils.registerCustomElement('sl-tagviewer', SLTagViewer);
})();
