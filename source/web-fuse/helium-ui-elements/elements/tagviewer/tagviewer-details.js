import '../list-editor/list-editor.js';

import { componentUtils } from '../common/component-utils.js';
import { dateUtils } from '../common/date-utils.js';
import { html } from '../../library/html-utils.js';
import { tagViewerUtils } from './tagviewer-utils.js';

import checkboxCss from '../common/styles/checkbox.css';
import inputCss from '../common/styles/input.css';
import selectCss from '../common/styles/select.css';
import tagviewerStyle from './tagviewer.css';

const styles = [checkboxCss, inputCss, selectCss, tagviewerStyle];

(function () {
    class SLTagViewerDetails extends HTMLElement {
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
            container.classList.add('sl-tagviewer-details-main');
            this.shadowRoot.appendChild(container);
        }

        _getPath (tagsWithValues) {
            let paths = tagsWithValues.map(function (tagWithValue) {
                return tagWithValue.tag.path;
            });
            return paths.join(', ');
        }

        _getCollectAggregates (tagsWithValues) {
            let checked = true;
            for (let tagWithValue of tagsWithValues) {
                if (!tagWithValue.tag.collectAggregates) {
                    checked = false;
                    break;
                }
            }
            return checked;
        }

        _getRetention (tagsWithValues) {
            let result = {
                type: tagsWithValues[0].tag.properties['nitagRetention'] || 'NONE',
                count: tagsWithValues[0].tag.properties['nitagMaxHistoryCount'] || '10000',
                days: tagsWithValues[0].tag.properties['nitagHistoryTTLDays'] || '30'
            };

            let defaultResult = {
                type: '',
                count: '10000',
                days: '30'
            };
            for (let tagWithValue of tagsWithValues) {
                let type = tagWithValue.tag.properties['nitagRetention'] || 'NONE';
                if (result.type !== type) {
                    return defaultResult;
                }
                let count = tagWithValue.tag.properties['nitagMaxHistoryCount'];
                if (result.type === 'COUNT' && result.count !== count) {
                    return defaultResult;
                }
                let days = tagWithValue.tag.properties['nitagHistoryTTLDays'];
                if (result.type === 'DURATION' && result.days !== days) {
                    return defaultResult;
                }
            }
            return result;
        }

        _getTagValue (tagsWithValues) {
            let result = '';
            if (tagsWithValues[0].current) {
                result = tagsWithValues[0].current.value.value;
            }

            for (let tagWithValue of tagsWithValues) {
                if (tagWithValue.current && result !== tagWithValue.current.value.value) {
                    result = '';
                    break;
                } else if (!tagWithValue.current && result !== '') {
                    result = '';
                    break;
                }
            }
            return result;
        }

        _getTagValueTimestamp (tagsWithValues) {
            let result = '';
            if (tagsWithValues[0].current) {
                result = tagsWithValues[0].current.timestamp;
            }

            for (let tagWithValue of tagsWithValues) {
                if (tagWithValue.current && result !== tagWithValue.current.timestamp) {
                    result = '';
                    break;
                } else if (!tagWithValue.current && result !== '') {
                    result = '';
                    break;
                }
            }
            return dateUtils.format(result, this._i18n.locale);
        }

        _keywordsAreEqual (keywordsA, keywordsB) {
            return JSON.stringify(keywordsA) === JSON.stringify(keywordsB);
        }

        _getKeywords (tagsWithValues) {
            let result = tagsWithValues[0].tag.keywords;
            for (let tagWithValue of tagsWithValues) {
                if (!this._keywordsAreEqual(result, tagWithValue.tag.keywords)) {
                    result = [];
                    break;
                }
            }
            return result || [];
        }

        propertiesAreEqual (propertiesA, propertiesB) {
            let propertyNamesA = Object.getOwnPropertyNames(propertiesA);
            let propertyNamesB = Object.getOwnPropertyNames(propertiesB);

            if (propertyNamesA.length !== propertyNamesB.length) {
                return false;
            }

            for (let propertyName of propertyNamesA) {
                if (propertiesA[propertyName] !== propertiesB[propertyName]) {
                    return false;
                }
            }
            return true;
        }

        _getProperties (tagsWithValues) {
            let result = this._filterKnownProperties(tagsWithValues[0].tag.properties);
            for (let tagWithValue of tagsWithValues) {
                if (!this.propertiesAreEqual(result, this._filterKnownProperties(tagWithValue.tag.properties))) {
                    result = [];
                    break;
                }
            }
            return this._objectToKeyValueList(result);
        }

        _getType (tagsWithValues) {
            let result = tagsWithValues[0].tag.type;
            for (let tagWithValue of tagsWithValues) {
                if (result !== tagWithValue.tag.type) {
                    result = '';
                    break;
                }
            }
            return this._i18n.types[result] || '';
        }

        _renderData () {
            if (!this._data || !this._i18n) {
                return;
            }

            let tagsWithValues = this._data;
            let path = this._getPath(tagsWithValues);
            let collectAggregates = this._getCollectAggregates(tagsWithValues);
            let retention = this._getRetention(tagsWithValues);
            let value = this._getTagValue(tagsWithValues);
            let updated = this._getTagValueTimestamp(tagsWithValues);
            let type = this._getType(tagsWithValues);

            let collectAggregatesAttribute = collectAggregates ? 'checked' : '';
            let showRetentionDays = retention.type === 'DURATION';
            let showRetentionCount = retention.type === 'COUNT';

            let main = this._getMain();
            main.innerHTML = html`
                <div>
                    <div class="sl-tagviewer-form-row">
                        <label class="sl-tagviewer-form-label">${this._i18n.path}</label>
                        <span id="tag-path">${path}</span>
                    </div>
                    <div class="sl-tagviewer-form-row">
                        <label class="sl-tagviewer-form-label">${this._i18n.value}</label>
                        <input class="sl-tagviewer-form-input mc-input" id="tag-value" value="${value}">
                        <div class="sl-tagviewer-form-error sl-tagviewer-hidden" id="tag-value-error-message"></div>
                    </div>
                    <div class="sl-tagviewer-form-row">
                        <label class="sl-tagviewer-form-label">${this._i18n.updated}</label>
                        <span id="tag-updated">${updated}</span>
                    </div>
                    <div class="sl-tagviewer-form-row">
                        <label class="sl-tagviewer-form-label">${this._i18n.collectAggregates}</label>
                        <div>
                            <input type="checkbox" id="tag-collect-aggregates" class="mc-checkbox" ${collectAggregatesAttribute}>
                            <label for="tag-collect-aggregates"></label>
                        </div>
                    </div>
                    <div class="sl-tagviewer-form-row">
                        <label class="sl-tagviewer-form-label">${this._i18n.retentionLabels.text}</label>
                        <select class="sl-tagviewer-form-input mc-select" id="tag-retention">
                            <option class="${retention.type === '' ? '' : 'sl-tagviewer-hidden'}" disabled ${retention.type === '' ? 'selected' : ''} value></option>
                            <option value="NONE" ${retention.type === 'NONE' ? 'selected' : ''}>${this._i18n.retention.NONE}</option>
                            <option value="COUNT" ${retention.type === 'COUNT' ? 'selected' : ''}>${this._i18n.retention.COUNT}</option>
                            <option value="DURATION" ${retention.type === 'DURATION' ? 'selected' : ''}>${this._i18n.retention.DURATION}</option>
                            <option value="PERMANENT" ${retention.type === 'PERMANENT' ? 'selected' : ''}>${this._i18n.retention.PERMANENT}</option>
                        </select>
                    </div>
                    <div id="tag-retention-count-row" class="sl-tagviewer-form-row ${showRetentionCount ? '' : 'sl-tagviewer-hidden'}">
                        <label class="sl-tagviewer-form-label"></label>
                        <div>
                            <label class="sl-tagviewer-form-label">${this._i18n.retentionLabels.maxCount}</label>
                            <input class="sl-tagviewer-form-retention-input mc-input" type="number" min="0" max="1000000" id="tag-retention-count" value="${retention.count}">
                        </div>
                    </div>
                    <div id="tag-retention-days-row" class="sl-tagviewer-form-row ${showRetentionDays ? '' : 'sl-tagviewer-hidden'}">
                        <label class="sl-tagviewer-form-label"></label>
                        <div>
                            <label class="sl-tagviewer-form-label">${this._i18n.retentionLabels.days}</label>
                            <input class="sl-tagviewer-form-retention-input mc-input" type="number" min="0" max="10000" id="tag-retention-days" value="${retention.days}">
                        </div>
                    </div>
                    <div class="sl-tagviewer-form-row">
                        <label class="sl-tagviewer-form-label">${this._i18n.type}</label>
                        <span id="tag-type">${type}</span>
                    </div>
                    <div class="sl-tagviewer-form-row">
                        <label class="sl-tagviewer-form-label">${this._i18n.keywords}</label>
                        <sl-list-editor id="tag-keywords" placeholder="${this._i18n.keywordsPlaceholder}"></sl-list-editor>
                    </div>
                    <div class="sl-tagviewer-form-row">
                        <label class="sl-tagviewer-form-label">${this._i18n.properties}</label>
                        <sl-list-editor id="tag-properties" type="KeyValue" key-placeholder="${this._i18n.propertiesKey}" value-placeholder="${this._i18n.propertiesValue}"></sl-list-editor>
                    </div>
                </div>
            `;
            this._attachEventHandlers(tagsWithValues);
        }

        _updateCollectAggregates (tagsWithValues, checked) {
            for (let tagWithValue of tagsWithValues) {
                tagWithValue.tag.collectAggregates = checked;
            }
        }

        _updateKeywords (tagsWithValues, keywords) {
            for (let tagWithValue of tagsWithValues) {
                tagWithValue.tag.keywords = keywords;
            }
        }

        _updateProperties (tagsWithValues, propertiesList) {
            for (let tagWithValue of tagsWithValues) {
                let properties = this._getKnownProperties(tagWithValue.tag.properties);
                for (let item of propertiesList) {
                    properties[item.key] = item.value;
                }
                tagWithValue.tag.properties = properties;
            }
        }

        _attachEventHandlers (tagsWithValues) {
            let tagCollectAggregates = this._getCollectAggregatesSelect();
            tagCollectAggregates.addEventListener('change', () => {
                this._updateCollectAggregates(tagsWithValues, tagCollectAggregates.checked);
                this._fireTagUpdateEvent(tagsWithValues);
            });

            let tagRetentionCount = this._getRetentionCountInput();
            tagRetentionCount.addEventListener('change', () => {
                this._updateTagRetentionProperties(tagsWithValues, 'COUNT', tagRetentionCount.value, null);
                this._fireTagUpdateEvent(tagsWithValues);
            });

            let tagRetentionDays = this._getRetentionDaysInput();
            tagRetentionDays.addEventListener('change', () => {
                this._updateTagRetentionProperties(tagsWithValues, 'DURATION', null, tagRetentionDays.value);
                this._fireTagUpdateEvent(tagsWithValues);
            });

            let tagRetention = this._getRetentionSelect();
            tagRetention.addEventListener('change', () => {
                this._updateTagRetentionProperties(tagsWithValues, tagRetention.value, tagRetentionCount.value, tagRetentionDays.value);
                let retention = this._getRetention(tagsWithValues);
                this._updateTagRetentionRows(retention);
                this._fireTagUpdateEvent(tagsWithValues);
            });

            let tagKeywords = this._getKeywordsInput();
            tagKeywords.data = this._getKeywords(tagsWithValues);
            tagKeywords.addEventListener('list-change', (e) => {
                this._updateKeywords(tagsWithValues, e.detail.data);
                this._fireTagUpdateEvent(tagsWithValues);
            });

            let tagProperties = this._getPropertiesInput();
            tagProperties.data = this._getProperties(tagsWithValues);
            tagProperties.addEventListener('list-change', (e) => {
                this._updateProperties(tagsWithValues, e.detail.data);
                this._fireTagUpdateEvent(tagsWithValues);
            });

            let tagValueInput = this._getTagValueInput();
            tagValueInput.addEventListener('change', () => {
                this._updateTagValue(tagsWithValues, tagValueInput.value);
                let error = tagViewerUtils.validateValues(tagsWithValues, tagValueInput.value, this._i18n.validationErrors);
                this._updateTagValueErrorMessage(error);
                this._fireTagUpdateValueEvent(tagValueInput.value, error);
            });
        }

        _updateTagValue (tagsWithValues, value) {
            let timestamp = new Date().toISOString();
            for (let tagWithValue of tagsWithValues) {
                tagWithValue.current = {
                    timestamp: timestamp,
                    value: {
                        value: value,
                        type: tagWithValue.tag.type
                    }
                };
            }
        }

        _updateTagRetentionProperties (tagsWithValues, retention, count, days) {
            for (let tagWithValue of tagsWithValues) {
                this._updateRetentionProperties(tagWithValue.tag.properties, retention, count, days);
            }
        }

        _updateRetentionProperties (properties, retention, count, days) {
            properties['nitagRetention'] = retention;
            delete properties['nitagMaxHistoryCount'];
            delete properties['nitagHistoryTTLDays'];
            if (retention === 'COUNT') {
                properties['nitagMaxHistoryCount'] = count;
            }
            if (retention === 'DURATION') {
                properties['nitagHistoryTTLDays'] = days;
            }
        }

        _updateTagRetentionRows (retention) {
            let countRow = this._getRetentionCountRow();
            let daysRow = this._getRetentionDaysRow();

            countRow.classList.add('sl-tagviewer-hidden');
            daysRow.classList.add('sl-tagviewer-hidden');
            if (retention.type === 'COUNT') {
                countRow.classList.remove('sl-tagviewer-hidden');
            }
            if (retention.type === 'DURATION') {
                daysRow.classList.remove('sl-tagviewer-hidden');
            }

            let countInput = this._getRetentionCountInput();
            countInput.value = retention.count || '10000';
            let daysInput = this._getRetentionDaysInput();
            daysInput.value = retention.days || '30';
        }

        _filterKnownProperties (properties) {
            let filteredProperties = {};
            for (let property in properties) {
                if (properties.hasOwnProperty(property) && !property.startsWith('nitag')) {
                    filteredProperties[property] = properties[property];
                }
            }
            return filteredProperties;
        }

        _getKnownProperties (properties) {
            let nitagProperties = {};
            for (let property in properties) {
                if (properties.hasOwnProperty(property) && property.startsWith('nitag')) {
                    nitagProperties[property] = properties[property];
                }
            }
            return nitagProperties;
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

        _updateTagValueErrorMessage (error) {
            let tagValueInput = this._getTagValueInput();
            let errorMessage = this._getTagValueErrorMessage();
            if (error) {
                tagValueInput.classList.add('error');
                errorMessage.textContent = error;
                errorMessage.classList.remove('sl-tagviewer-hidden');
            } else {
                tagValueInput.classList.remove('error');
                errorMessage.classList.add('sl-tagviewer-hidden');
            }
        }

        _fireTagUpdateEvent (tagsWithValues) {
            let eventData = {
                tags: this._getTagsFromTagsWithValues(tagsWithValues)
            };
            this.dispatchEvent(new CustomEvent('tag-update', { detail: eventData }));
        }

        _getTagsFromTagsWithValues (tagsWithValues) {
            return tagsWithValues.map(function (tagWithValue) {
                return tagWithValue.tag;
            });
        }

        _fireTagUpdateValueEvent (value, error) {
            let eventData = {
                value: value,
                error: error
            };
            this.dispatchEvent(new CustomEvent('tag-update-value', { detail: eventData }));
        }

        _getMain () {
            return this.shadowRoot.querySelector('.sl-tagviewer-details-main');
        }

        _getKeywordsInput () {
            return this.shadowRoot.querySelector('#tag-keywords');
        }

        _getPropertiesInput () {
            return this.shadowRoot.querySelector('#tag-properties');
        }

        _getCollectAggregatesSelect () {
            return this.shadowRoot.querySelector('#tag-collect-aggregates');
        }

        _getRetentionSelect () {
            return this.shadowRoot.querySelector('#tag-retention');
        }

        _getRetentionCountRow () {
            return this.shadowRoot.querySelector('#tag-retention-count-row');
        }

        _getRetentionCountInput () {
            return this.shadowRoot.querySelector('#tag-retention-count');
        }

        _getRetentionDaysRow () {
            return this.shadowRoot.querySelector('#tag-retention-days-row');
        }

        _getRetentionDaysInput () {
            return this.shadowRoot.querySelector('#tag-retention-days');
        }

        _getTagValueInput () {
            return this.shadowRoot.querySelector('#tag-value');
        }

        _getTagValueErrorMessage () {
            return this.shadowRoot.querySelector('#tag-value-error-message');
        }
    }
    componentUtils.registerCustomElement('sl-tagviewer-details', SLTagViewerDetails);
})();
