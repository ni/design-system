import buttonCss from '../common/styles/button.css';
import inputCss from '../common/styles/input.css';
import checkboxCss from '../common/styles/checkbox.css';
import policyEditorCss from './policy-editor.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [buttonCss, inputCss, policyEditorCss, checkboxCss];

(function () {
    class MCPolicyEditor extends HTMLElement {
        constructor () {
            super();
            this._isError = false;

            this._keyboardAction = (event) => {
                if (!this._isError && event.key === 'Enter') {
                    this._handleAction('update');
                } else if (event.key === 'Escape') {
                    this._handleAction('cancel');
                }
            };
        }

        _renderMain () {
            const template = document.createElement('template');
            template.innerHTML =
                html`<div id="mc-slide-menu-modal" class="mc-slide-menu-animation">
                    <div tabindex="-1" id="mc-policy-editor-content">
                        <h2 id="policytitle" class="mc-policy-editor-header">${this._i18n.header}</h2>
                        <input type="text" id="policyNameInput" ${this._disableNameEdit ? 'readonly' : ''} class="mc-input mc-policy-editor-name-input"></input>
                        <div id="policy-validation-notification-container"></div>
                        <h3 id="statementtitle" class="mc-policy-editor-statement-title">${this._i18n.tags.header}</h3>
                        <h4 id="tagpermissions" class="mc-policy-editor-permissions">${this._i18n.tags.permissions}</h4>

                        <input type="checkbox" class="mc-checkbox mc-permissions-checkbox" id="readCheck"></input>
                        <label for="readCheck" class="mc-permissions-checkbox-label">${this._i18n.tags.read}</label>

                        <input type="checkbox" class="mc-checkbox mc-permissions-checkbox" id="writeCheck"></input>
                        <label for="writeCheck" class="mc-permissions-checkbox-label">${this._i18n.tags.write}</label>

                        <input type="checkbox" class="mc-checkbox mc-permissions-checkbox" id="modifyCheck"></input>
                        <label for="modifyCheck" class="mc-permissions-checkbox-label">${this._i18n.tags.modify}</label>

                        <input type="checkbox" class="mc-checkbox mc-permissions-checkbox" id="deleteCheck"></input>
                        <label for="deleteCheck" class="mc-permissions-checkbox-label">${this._i18n.tags.delete}</label>

                        <input type="checkbox" class="mc-checkbox mc-permissions-checkbox" id="createCheck"></input>
                        <label for="createCheck" class="mc-permissions-checkbox-label">${this._i18n.tags.create}</label>

                        <div class="mc-wildcardtitle"><span style="font-weight: bold;">${this._i18n.tags.path}</span> ${this._i18n.tags.pathDescription}</div>

                        <input type="text" id="tagWildCardInput" placeholder="${this._i18n.tags.wildcardPlaceholder}" class="mc-policy-permisions-wildcard mc-input"></input>
                        <a target="_blank" href="faq#what-is-a-wildcard" class="mc-wildcard-doclink">${this._i18n.tags.helpLink}</a>

                        <h3 id="mpsstatementtitle" class="mc-policy-editor-statement-title">${this._i18n.messages.header}</h3>
                        <h4 id="mpsservicepermissions" class="mc-policy-editor-permissions">${this._i18n.messages.permissions}</h4>

                        <input type="checkbox" class="mc-checkbox mc-permissions-checkbox" id="subscribeCheck"></input>
                        <label for="subscribeCheck" class="mc-permissions-checkbox-label">${this._i18n.messages.subscribe}</label>

                        <input type="checkbox" class="mc-checkbox mc-permissions-checkbox" id="publishCheck"></input>
                        <label for="publishCheck" class="mc-permissions-checkbox-label">${this._i18n.messages.publish}</label>

                        <div class="mc-wildcardtitle"><span style="font-weight: bold;">${this._i18n.messages.topic}</span> >${this._i18n.messages.topicDescription}</div>
                        <input type="text" id="topicWildCardInput" placeholder="${this._i18n.messages.wildcardPlaceholder}" class="mc-policy-permisions-wildcard mc-input"></input>
                        <a target="_blank" href="faq#what-is-a-wildcard" class="mc-wildcard-doclink">${this._i18n.messages.helpLink}</a>
                        <button class="mc-button mc-policy-editor-button" id="update">${this._forNew ? this._i18n.create : this._i18n.update}</button>
                        <button class="mc-button mc-policy-editor-button ${this._disableDelete ? 'mc-slide-menu-hidden' : ''}" id="delete">${this._i18n.delete}</button>
                        <button class="mc-button mc-policy-editor-button" id="cancel">${this._i18n.cancel}</button>
                    </div>
                </div>`;

            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        static get observedAttributes () {
            return ['disable-delete', 'for-new', 'disable-name-edit'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }

            switch (name) {
            case 'disable-name-edit':
                if (newValue === 'false') {
                    this._policyNameInput.removeAttribute('readonly');
                } else {
                    this._policyNameInput.setAttribute('readonly', '');
                }
                break;
            case 'disable-delete':
                if (newValue === 'false') {
                    this._deleteButton.classList.remove('mc-slide-menu-hidden');
                } else {
                    this._deleteButton.classList.add('mc-slide-menu-hidden');
                }
                break;
            case 'for-new':
                if (newValue === 'false') {
                    this._updateButton.textContent = this._i18n.update;
                } else {
                    this._updateButton.textContent = this._i18n.create;
                }
                break;
            }
        }

        connectedCallback () {
            componentUtils.upgradeProperty(this, 'i18n');
            this._render();
            this._addDocumentEventHandlers();
        }

        _render () {
            if (!this.shadowRoot) {
                this._renderMain();
                this._setupInitialData();
                this._attachEventHandlers();
            }
        }

        _addDocumentEventHandlers () {
            document.addEventListener('keydown', this._keyboardAction);
        }

        _removeDocumentEventHandlers () {
            document.removeEventListener('keydown', this._keyboardAction);
        }

        disconnectedCallback () {
            this._removeDocumentEventHandlers();
        }

        handleError (displayedMessage) {
            let tn = document.createTextNode(displayedMessage);
            this._validationNotificationContainer.innerHTML = '<div class="mc-policy-editor-error-message" id="policy-validation"></div>';
            this.shadowRoot.getElementById('policy-validation').appendChild(tn);
            this._showErrors();
        }

        _setupInitialData () {
            this._setPolicyName(this.policy.name);
            this._setTagPath(this.policy.tagPathFilter);
            this._setMessageTopic(this.policy.messageTopicFilter);

            this._setTagActions(this.policy.tagActions);
            this._setMessageActions(this.policy.messageActions);

            if (this.forNew) {
                this._deleteButton.style.display = 'none';
                this._updateButton.textContent = this._i18n.create;
            }

            if (this.forWebapp) {
                this._deleteButton.style.display = 'none';
                this._policyNameInput.setAttribute('readonly', true);
            }
        }

        _attachEventHandlers () {
            // text inputs
            this._policyNameInput.addEventListener('input', () => {
                this._handleNameChange();
            });

            this._tagWildcardInput.addEventListener('input', () => {
                this._handleTagPathChange();
            });

            this._topicWildCardInput.addEventListener('input', () => {
                this._handleMessageTopicChange();
            });

            // checkboxes
            this._attachChangeEvent(this._readTagCheckBox, 'tag', 'read');
            this._attachChangeEvent(this._writeTagCheckBox, 'tag', 'write');
            this._attachChangeEvent(this._modifyTagCheckBox, 'tag', 'modify');
            this._attachChangeEvent(this._createTagCheckBox, 'tag', 'create');
            this._attachChangeEvent(this._deleteTagCheckBox, 'tag', 'delete');
            this._attachChangeEvent(this._subscribeMessageCheckBox, 'message', 'subscribe');
            this._attachChangeEvent(this._publishMessageCheckBox, 'message', 'publish');

            // buttons
            this._attachClickEvent(this._updateButton, 'update');
            this._attachClickEvent(this._cancelButton, 'cancel');
            this._attachClickEvent(this._deleteButton, 'delete');

            // Allow closing the dialog by clicking the modal background,
            // but prevent closing it by clicking the dialog itself.
            this._slideModal.addEventListener('click', e => {
                this._handleAction('cancel');
            });
            this._slideContent.addEventListener('click', e => {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (e.cancelBubble != null) {
                    e.cancelBubble = true;
                }
            });
        }

        _handleNameChange () {
            if (this._isError) {
                this._hideErrors();
                this._enableButton('update');
            }
            let newName = this._getPopilcyName();
            if (this._isHTML(newName)) {
                newName = escape(newName);
            }

            this.dispatchEvent(new CustomEvent('policyNameChange', { detail: { name: newName } }));
        }

        _handleTagPathChange () {
            if (!this._isError) {
                this._enableButton('update');
            }
            let val = this._getTagPath();
            if (this._isHTML(val)) {
                val = escape(val);
            }
            this.dispatchEvent(new CustomEvent('tagPathFilterChange', { detail: { tagPathFilter: val } }));
        }

        _handleMessageTopicChange () {
            if (!this._isError) {
                this._enableButton('update');
            }
            let val = this._getMessageTopic();
            if (this._isHTML(val)) {
                val = escape(val);
            }
            this.dispatchEvent(new CustomEvent('messageTopicFilterChange', { detail: { messageTopicFilter: val } }));
        }

        _attachClickEvent (button, action) {
            button.addEventListener('click', async () => {
                this._handleAction(action);
            });
        }

        _handleAction (action) {
            this.dispatchEvent(new CustomEvent(action, { cancelable: true }));
        }

        _attachChangeEvent (checkbox, type, action) {
            checkbox.addEventListener('change', (event) => {
                this.dispatchEvent(new CustomEvent('permissionChanged', { detail:
                    {
                        type: type,
                        action: action,
                        value: checkbox.checked
                    } }));
                this._enableButton('update');
            });
        }

        _isHTML (str) {
            return /<[a-z][\s\S]*>/i.test(str); // tests if string contains html tags
        }

        get _slideModal () {
            return this.shadowRoot.getElementById('mc-slide-menu-modal');
        }

        get _slideContent () {
            return this.shadowRoot.getElementById('mc-policy-editor-content');
        }

        set i18n (i18n) {
            this._i18n = i18n;
        }

        get _forNew () {
            return this.getAttribute('for-new') === 'true';
        }

        get _disableDelete () {
            return this.getAttribute('disable-delete') === 'true';
        }

        get _disableNameEdit () {
            return this.getAttribute('disable-name-edit') === 'true';
        }

        get _deleteButton () {
            return this.shadowRoot.getElementById('delete');
        }

        get _updateButton () {
            return this.shadowRoot.getElementById('update');
        }

        get _cancelButton () {
            return this.shadowRoot.getElementById('cancel');
        }

        get _policyNameInput () {
            return this.shadowRoot.getElementById('policyNameInput');
        }

        get _validationNotificationContainer () {
            return this.shadowRoot.getElementById('policy-validation-notification-container');
        }

        get _tagWildcardInput () {
            return this.shadowRoot.getElementById('tagWildCardInput');
        }

        get _topicWildCardInput () {
            return this.shadowRoot.getElementById('topicWildCardInput');
        }

        get _readTagCheckBox () {
            return this.shadowRoot.getElementById('readCheck');
        }

        get _writeTagCheckBox () {
            return this.shadowRoot.getElementById('writeCheck');
        }

        get _modifyTagCheckBox () {
            return this.shadowRoot.getElementById('modifyCheck');
        }

        get _deleteTagCheckBox () {
            return this.shadowRoot.getElementById('deleteCheck');
        }

        get _createTagCheckBox () {
            return this.shadowRoot.getElementById('createCheck');
        }

        get _subscribeMessageCheckBox () {
            return this.shadowRoot.getElementById('subscribeCheck');
        }

        get _publishMessageCheckBox () {
            return this.shadowRoot.getElementById('publishCheck');
        }

        _getPopilcyName () {
            return this._policyNameInput.value;
        }

        _setPolicyName (name) {
            this._policyNameInput.value = name;
        }

        _getTagPath () {
            return this._tagWildcardInput.value;
        }

        _setTagPath (value) {
            this._tagWildcardInput.value = value;
        }

        _getMessageTopic () {
            return this._topicWildCardInput.value;
        }

        _setMessageTopic (value) {
            this._topicWildCardInput.value = value;
        }

        _enableButton (buttonId) {
            let button = this.shadowRoot.getElementById(`${buttonId}`);
            button.removeAttribute('disabled');
        };

        _disableButton (buttonId) {
            let button = this.shadowRoot.getElementById(`${buttonId}`);
            button.setAttribute('disabled', true);
        };

        _hideErrors () {
            this._policyNameInput.classList.remove('error');
            this._validationNotificationContainer.innerHTML = '';
            this._isError = false;
        };

        _showErrors () {
            this._policyNameInput.classList.add('error');
            this._disableButton('update');
            this._isError = true;
        };

        _setTagActions (actions) {
            actions.forEach(action => {
                switch (action) {
                case 'read':
                    this._readTagCheckBox.checked = true;
                    break;
                case 'write':
                    this._writeTagCheckBox.checked = true;
                    break;
                case 'delete':
                    this._deleteTagCheckBox.checked = true;
                    break;
                case 'modify':
                    this._modifyTagCheckBox.checked = true;
                    break;
                case 'create':
                    this._createTagCheckBox.checked = true;
                    break;
                default:
                    break;
                }
            });
        }

        _setMessageActions (actions) {
            actions.forEach(action => {
                switch (action) {
                case 'subscribe':
                    this._subscribeMessageCheckBox.checked = true;
                    break;
                case 'publish':
                    this._publishMessageCheckBox.checked = true;
                    break;
                default:
                    break;
                }
            });
        }
    }

    componentUtils.registerCustomElement('mc-policy-editor', MCPolicyEditor);
})();
