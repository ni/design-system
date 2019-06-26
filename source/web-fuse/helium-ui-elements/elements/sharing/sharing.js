import uploadCss from './sharing.css';
import inputCss from '../common/styles/input.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';
import '../autocomplete/autocomplete.js';

const styles = [uploadCss, inputCss];

(function () {
    class MCSharing extends HTMLElement {
        constructor () {
            super();
            this._selectedEmails = [];
        }

        _render () {
            const template = document.createElement('template');
            template.innerHTML =
                html`<div class="mc-sharing-main">
                    <h3 id="mc-sharing-title">${this.header}</h3>
                    <mc-autocomplete id="mc-sharing-email-input" placeholder='${this.emailPlaceholder}'></mc-autocomplete>
                    <div id="mc-sharing-selected-emails"></div>
                    <div id="mc-sharing-user-message">
                        <button class="mc-sharing-message-button hidden" action="add" id="mc-sharing-message-button">${this.messageAddText}</button>
                        <textarea id="mc-sharing-text-message" class="mc-sharing-text-message hidden" autocapitalize="none" autocomplete="off" placeholder="${this.messagePlaceholder}" wrap="soft" ></textarea>
                    </div>
                </div>`;
            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        static get observedAttributes () {
            return ['header'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'header': {
                this.heading.innerText = newValue;
                break;
            }
            }
        }

        connectedCallback () {
            componentUtils.upgradeProperty(this, 'selectedEmails');
            componentUtils.upgradeProperty(this, 'emailHints');
            if (!this.shadowRoot) {
                this._render();
                this._init();
                this._renderSelectedEmails(this._selectedEmails);
                this._renderEmailHints(this._emailHints);
                this._attachEventHandlers();
            }
        }

        _init () {
            this.emailInput.items = this.emailHints;
            this._scrollToBottom();
        }

        _attachEventHandlers () {
            this.emailInput.addEventListener('input-submitted', (evt) => {
                let newEmail = evt.detail.value;
                if (this._isValidEmail(newEmail)) {
                    let _shouldScroll = this._shouldScroll();
                    if (this._addSelectedEmail(newEmail)) {
                        this.emailInput.clear();
                        if (_shouldScroll) {
                            this._scrollToBottom();
                        }
                        this.messageButton.classList.remove('hidden');
                        this.dispatchEvent(new CustomEvent('email-added', { detail: { email: newEmail } }));
                    } else {
                        this.emailInput.setAttribute('error-message', `${newEmail === this.everyone ? this.errorMessageAlreadyPublic : this.errorMessageAlreadyUsed}`);
                    }
                } else {
                    this.emailInput.setAttribute('error-message', this.errorMessageInvalidEmail);
                }
            });

            this.messageButton.addEventListener('click', (evt) => {
                let action = this.messageButton.getAttribute('action');
                switch (action) {
                case 'add': {
                    this.messageText.classList.remove('hidden');
                    this.messageButton.textContent = this.messageRemoveText;
                    this.messageButton.setAttribute('action', 'remove');
                    break;
                }
                case 'remove': {
                    this.messageText.classList.add('hidden');
                    this.messageButton.textContent = this.messageAddText;
                    this.messageButton.setAttribute('action', 'add');
                    break;
                }
                }
            });

            this.messageText.addEventListener('change', (evt) => {
                this.dispatchEvent(new CustomEvent('custom-message-changed', { detail: { message: this.messageText.value } }));
            });
        }

        get header () {
            return this.getAttribute('header') || '';
        }

        get emailPlaceholder () {
            return this.getAttribute('email-placeholder');
        }

        get messageAddText () {
            return this.getAttribute('message-add-text');
        }

        get messageRemoveText () {
            return this.getAttribute('message-remove-text');
        }

        get messagePlaceholder () {
            return this.getAttribute('message-placeholder');
        }

        get errorMessageInvalidEmail () {
            return this.getAttribute('error-message-invalid-email');
        }

        get errorMessageAlreadyPublic () {
            return this.getAttribute('error-message-already-public');
        }

        get errorMessageAlreadyUsed () {
            return this.getAttribute('error-message-already-used');
        }

        get everyone () {
            return this.getAttribute('everyone') || 'Everyone';
        }

        get emailHints () {
            return this._emailHints !== undefined ? this._emailHints : [];
        }

        set emailHints (value) {
            this._emailHints = value;
            this._renderEmailHints(value);
        }

        get customMessage () {
            return this.messageText.value;
        }

        get heading () {
            return this.shadowRoot.getElementById('mc-sharing-title');
        }

        get title () {
            return this.getAttribute('title');
        }

        set status (value) {
            this.setAttribute('title', value);
        }

        set selectedEmails (value) {
            this._selectedEmails = value;
            this._renderSelectedEmails(value);
        }

        get emailInput () {
            return this.shadowRoot.getElementById('mc-sharing-email-input');
        }

        get messageButton () {
            return this.shadowRoot.getElementById('mc-sharing-message-button');
        }

        get messageText () {
            return this.shadowRoot.getElementById('mc-sharing-text-message');
        }

        _addSelectedEmail (value) {
            let index = this._selectedEmails.indexOf(value);
            if (index === -1) {
                this._selectedEmails.push(value);
                this._renderSelectedEmails(this._selectedEmails);
                return true;
            }
            return false;
        }

        _removeSelectedEmail (value) {
            let index = this._selectedEmails.indexOf(value);
            if (index > -1) {
                this._selectedEmails.splice(index, 1);
                this._renderSelectedEmails(this._selectedEmails);
            }
            this.dispatchEvent(new CustomEvent('email-removed', { detail: { email: value } }));
        }

        _renderEmailHints (emailHints) {
            if (!this.shadowRoot) {
                return;
            }
            this.emailInput.items = emailHints;
        }

        _renderSelectedEmails (selectedEmails) {
            if (!this.shadowRoot) {
                return;
            }
            let placeHolder = this._getSelectedEmailsPlaceholder();
            placeHolder.innerHTML = '';
            for (let email of selectedEmails) {
                let element = this._createSelectedEmailElement(email);
                placeHolder.appendChild(element);
            }
        }

        _createSelectedEmailElement (email) {
            let chipElement = document.createElement('span');
            chipElement.classList.add('mc-sharing-selected-email-chip');
            chipElement.textContent = email[0];
            let textElement = document.createElement('span');
            textElement.classList.add('mc-sharing-selected-email-text');
            textElement.textContent = ' ' + email;
            let removeButton = document.createElement('span');
            removeButton.classList.add('mc-sharing-selected-email-remove');
            removeButton.addEventListener('click', () => {
                this._removeSelectedEmail(email);
            });

            let item = document.createElement('div');
            item.classList.add('mc-sharing-selected-email');
            item.appendChild(chipElement);
            item.appendChild(textElement);
            item.appendChild(removeButton);
            return item;
        }

        _getSelectedEmailsPlaceholder () {
            return this.shadowRoot.querySelector('#mc-sharing-selected-emails');
        }

        _isValidEmail (value) {
            return value === this.everyone || value.match('^[^, ]{1,100}@[^, ]{1,300}$');
        }

        _shouldScroll () {
            let element = this._getSelectedEmailsPlaceholder();
            return element.scrollTop >= (element.scrollHeight - element.offsetHeight);
        }

        _scrollToBottom () {
            function animateScroll (element, duration) {
                let start = element.scrollTop;
                let end = element.scrollHeight;
                let change = end - start;
                let increment = 20;

                function easeInOut (currentTime, start, change, duration) {
                    currentTime /= duration / 2;
                    if (currentTime < 1) {
                        return change / 2 * currentTime * currentTime + start;
                    }
                    currentTime -= 1;
                    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
                }

                function animate (elapsedTime) {
                    elapsedTime += increment;
                    let position = easeInOut(elapsedTime, start, change, duration);
                    element.scrollTop = position;
                    if (elapsedTime < duration) {
                        setTimeout(function () {
                            animate(elapsedTime);
                        }, increment);
                    }
                }
                animate(0);
            }

            animateScroll(this._getSelectedEmailsPlaceholder(), 300);
        }
    }

    componentUtils.registerCustomElement('mc-sharing', MCSharing);
})();
