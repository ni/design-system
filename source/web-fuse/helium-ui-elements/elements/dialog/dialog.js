import buttonCss from '../common/styles/button.css';
import inputCss from '../common/styles/input.css';
import iconsCss from '../common/styles/icons.css';
import dialogCss from './dialog.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [buttonCss, inputCss, dialogCss, iconsCss];

(function () {
    class MCDialog extends HTMLElement {
        constructor () {
            super();

            this._keyEventHandler = (event) => {
                switch (event.key) {
                case 'Enter': {
                    if (this.showLeft) {
                        this._leftClose();
                    } else if (this.showMiddle) {
                        this._middleClose();
                    } else if (this.showRight) {
                        this._rightClose();
                    }
                    break;
                }
                case 'Escape': {
                    this._rightClose();
                    break;
                }
                };
            };
        }

        _initIcons () {
            this._getLeftIcon().innerText = this.iconLeft;
            this._getRightIcon().innerText = this.iconRight;
            this._getMiddleIcon().innerText = this.iconMiddle;
        }

        get header () {
            return this.getAttribute('header');
        }

        set header (value) {
            this.setAttribute('header', value);
        }

        get position () {
            return this.getAttribute('position') || 'center';
        }

        set position (value) {
            this.setAttribute('position', value);
        }

        get textLeft () {
            return this.getAttribute('text-left-button');
        }

        set textLeft (value) {
            this.setAttribute('text-left-button', value);
        }

        get textMiddle () {
            return this.getAttribute('text-middle-button');
        }

        set textMiddle (value) {
            this.setAttribute('text-middle-button', value);
        }

        get textRight () {
            return this.getAttribute('text-right-button');
        }

        set textRight (value) {
            this.setAttribute('text-right-button', value);
        }

        get footerLinkText () {
            return this.getAttribute('text-footer-link') || '';
        }

        set footerLinkText (value) {
            this.setAttribute('text-footer-link', value);
        }

        get iconLeft () {
            return this.getAttribute('icon-left-button') || '';
        }

        set iconLeft (value) {
            this.setAttribute('icon-left-button', value);
        }

        get iconMiddle () {
            return this.getAttribute('icon-middle-button') || '';
        }

        set iconMiddle (value) {
            this.setAttribute('icon-middle-button', value);
        }

        get iconRight () {
            return this.getAttribute('icon-right-button') || '';
        }

        set iconRight (value) {
            this.setAttribute('icon-right-button', value);
        }

        get showLeft () {
            return this.getAttribute('show-left-button') === 'true';
        }

        set showLeft (value) {
            this.setAttribute('show-left-button', value);
        }

        get showMiddle () {
            return this.getAttribute('show-middle-button') !== 'false';
        }

        set showMiddle (value) {
            this.setAttribute('show-middle-button', value);
        }

        get showRight () {
            return this.getAttribute('show-right-button') !== 'false';
        }

        set showRight (value) {
            this.setAttribute('show-right-button', value);
        }

        get showInput () {
            return this.getAttribute('show-input') === 'true';
        }

        set showInput (value) {
            this.setAttribute('show-input', value);
        }

        get inputValue () {
            return this.getAttribute('input-value');
        }

        set inputValue (value) {
            this.setAttribute('input-value', value);
        }

        get errorMessage () {
            return this.getAttribute('error-message');
        }

        set errorMessage (value) {
            this.setAttribute('error-message', value);
        }

        get disabledLeftButton () {
            return this.getAttribute('disabled-left-button');
        }

        set disabledLeftButton (value) {
            this.setAttribute('disabled-left-button', value);
        }

        get disabledMiddleButton () {
            return this.getAttribute('disabled-middle-button');
        }

        set disabledMiddleButton (value) {
            this.setAttribute('disabled-middle-button', value);
        }

        get disabledRightButton () {
            return this.getAttribute('disabled-right-button');
        }

        set disabledRightButton (value) {
            this.setAttribute('disabled-right-button', value);
        }

        static get observedAttributes () {
            return [
                'header',
                'text-left-button',
                'text-middle-button',
                'text-right-button',
                'icon-left-button',
                'icon-middle-button',
                'icon-right-button',
                'show-left-button',
                'show-middle-button',
                'show-right-button',
                'show-input',
                'disabled-left-button',
                'disabled-middle-button',
                'disabled-right-button',
                'input-value',
                'error-message',
                'text-footer-link'
            ];
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
                this._initIcons();
                this._attachEventHandlers();
            }
            this._focusElement();
            this._addDocumentHandler();
        }

        disconnectedCallback () {
            this._removeDocumentHandler();
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }

            switch (name) {
            case 'header': {
                this._getHeader().textContent = newValue;
                break;
            }
            case 'text-left-button': {
                let leftButtonText = this._getLeftButtonText();
                leftButtonText.textContent = newValue || '';
                break;
            }
            case 'text-middle-button': {
                let middleButtonText = this._getMiddleButtonText();
                middleButtonText.textContent = newValue || '';
                break;
            }
            case 'text-right-button': {
                let rightButtonText = this._getRightButtonText();
                rightButtonText.textContent = newValue || '';
                break;
            }
            case 'text-footer-link': {
                let footer = this._getFooterLink();
                footer.textContent = newValue || '';
                break;
            }
            case 'icon-left-button': {
                let icon = this._getLeftIcon();
                icon.textContent = newValue ? newValue + '&nbsp;' : '';
                break;
            }
            case 'icon-middle-button': {
                let icon = this._getMiddleIcon();
                icon.textContent = newValue ? newValue + '&nbsp;' : '';
                break;
            }
            case 'icon-right-button': {
                let icon = this._getRightIcon();
                icon.textContent = newValue ? newValue + '&nbsp;' : '';
                break;
            }
            case 'show-left-button': {
                let button = this._getLeftButton();
                this._showElement(button, newValue !== 'false');
                break;
            }
            case 'show-middle-button': {
                let button = this._getMiddleButton();
                this._showElement(button, newValue !== 'false');
                break;
            }
            case 'show-right-button': {
                let button = this._getRightButton();
                this._showElement(button, newValue !== 'false');
                break;
            }
            case 'show-input': {
                let input = this._getInput();
                this._showElement(input, newValue === 'true');
                break;
            }
            case 'disabled-left-button': {
                let button = this._getLeftButton();
                this._disableElement(button, newValue === 'true');
                break;
            }
            case 'disabled-middle-button': {
                let button = this._getMiddleButton();
                this._disableElement(button, newValue === 'true');
                break;
            }
            case 'disabled-right-button': {
                let button = this._getRightButton();
                this._disableElement(button, newValue === 'true');
                break;
            }
            case 'input-value': {
                let input = this._getInput();
                input.value = newValue;
                break;
            }
            case 'error-message': {
                let input = this._getInput();
                let errorMessage = this._getErrorMessage();
                if (newValue) {
                    input.classList.add('error');
                    errorMessage.classList.remove('mc-dialog-hidden');
                    errorMessage.textContent = newValue;
                } else {
                    input.classList.remove('error');
                    errorMessage.classList.add('mc-dialog-hidden');
                    errorMessage.textContent = '';
                }
                break;
            }
            }
        }

        _showElement (element, value) {
            if (value) {
                element.classList.remove('mc-dialog-hidden');
            } else {
                element.classList.add('mc-dialog-hidden');
            }
        }

        _disableElement (element, value) {
            if (value) {
                element.setAttribute('disabled', 'true');
            } else {
                element.removeAttribute('disabled');
            }
        }
        _render () {
            let disabledLeftButton = this.disabledLeftButton ? 'disabled' : '';
            let disabledMiddleButton = this.disabledMiddleButton ? 'disabled' : '';
            let disabledRightButton = this.disabledRightButton ? 'disabled' : '';

            const template = document.createElement('template');
            template.innerHTML =
                html`<div class="mc-dialog-modal mc-dialog-modal-${this.position}">
                    <div class="mc-dialog-content mc-dialog-content-${this.position}">
                        <div><h3 class="mc-dialog-header">${this.header}</h3></div>

                        <input class="mc-input ${this.errorMessage ? 'error' : ''} ${this.showInput ? '' : 'mc-dialog-hidden'}" type="text" value="${this.inputValue || ''}">
                        <div class="mc-dialog-error-message ${this.errorMessage ? '' : 'mc-dialog-hidden'}">${this.errorMessage}</div>
                        <slot name="content"></slot>

                        <div class='mc-dialog-button-container'>
                            <button ${disabledLeftButton} class='mc-button mc-dialog-button-left ${this.showLeft ? '' : 'mc-dialog-hidden'}'>
                                <strong class="fa" id="mc-dialog-icon-left-button"></strong>
                                <span id="mc-dialog-button-text-left">${this.textLeft || ''}</span>
                            </button>
                            <button ${disabledMiddleButton} class='mc-button mc-dialog-button-middle ${this.showMiddle ? '' : 'mc-dialog-hidden'}'>
                                <strong class="fa" id="mc-dialog-icon-middle-button"></strong>
                                <span id="mc-dialog-button-text-middle">${this.textMiddle || ''}</span>
                            </button>
                            <button ${disabledRightButton} class='mc-button mc-dialog-button-right ${this.showRight ? '' : 'mc-dialog-hidden'}'>
                                <strong class="fa" id="mc-dialog-icon-right-button"></strong>
                                <span id="mc-dialog-button-text-right">${this.textRight || ''}</span>
                            </button>
                        </div>
                        <a id="mc-dialog-footer-link">${this.footerLinkText}</a>
                    </div>
                </div>`;

            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
        _attachEventHandlers () {
            let leftButton = this._getLeftButton();
            leftButton.addEventListener('click', e => {
                this._leftClose();
            });
            let rightButton = this._getRightButton();
            rightButton.addEventListener('click', e => {
                this._rightClose();
            });
            let middleButton = this._getMiddleButton();
            middleButton.addEventListener('click', e => {
                this._middleClose();
            });
            let input = this._getInput();
            input.addEventListener('input', e => {
                this.inputValue = input.value;
            });

            let footer = this._getFooterLink();
            footer.addEventListener('click', e => {
                this._footerLink();
            });

            // Allow closing the dialog by clicking the modal background,
            // but prevent closing it by clicking the dialog itself.
            let modal = this._getDialog();
            modal.addEventListener('click', e => {
                this._modalClose();
            });
            let content = this._getDialogContent();
            content.addEventListener('click', e => {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (e.cancelBubble != null) {
                    e.cancelBubble = true;
                }
            });
        }

        _addDocumentHandler () {
            document.addEventListener('keydown', this._keyEventHandler);
        }

        _removeDocumentHandler () {
            document.removeEventListener('keydown', this._keyEventHandler);
        }

        _focusElement () {
            if (this.showInput) {
                let input = this._getInput();
                input.focus();
            }
        }

        _leftClose () {
            this.dispatchEvent(new CustomEvent('left-button-click', { cancelable: true }));
        }

        _middleClose () {
            this.dispatchEvent(new CustomEvent('middle-button-click', { cancelable: true }));
        }

        _rightClose () {
            this.dispatchEvent(new CustomEvent('right-button-click', { cancelable: true }));
        }

        _modalClose () {
            this.dispatchEvent(new CustomEvent('modal-click', { cancelable: true }));
        }

        _footerLink () {
            this.dispatchEvent(new CustomEvent('footer-link-pressed', { cancelable: true }));
        }

        _getDialog () {
            return this.shadowRoot.querySelector('.mc-dialog-modal');
        }

        _getDialogContent () {
            return this.shadowRoot.querySelector('.mc-dialog-content');
        }

        _getHeader () {
            return this.shadowRoot.querySelector('.mc-dialog-header');
        }

        _getLeftButton () {
            return this.shadowRoot.querySelector('.mc-dialog-button-left');
        }

        _getMiddleButton () {
            return this.shadowRoot.querySelector('.mc-dialog-button-middle');
        }

        _getRightButton () {
            return this.shadowRoot.querySelector('.mc-dialog-button-right');
        }

        _getLeftButtonText () {
            return this.shadowRoot.querySelector('#mc-dialog-button-text-left');
        }

        _getMiddleButtonText () {
            return this.shadowRoot.querySelector('#mc-dialog-button-text-middle');
        }

        _getRightButtonText () {
            return this.shadowRoot.querySelector('#mc-dialog-button-text-right');
        }

        _getInput () {
            return this.shadowRoot.querySelector('.mc-input');
        }

        _getErrorMessage () {
            return this.shadowRoot.querySelector('.mc-dialog-error-message');
        }

        _getLeftIcon () {
            return this.shadowRoot.querySelector('#mc-dialog-icon-left-button');
        }

        _getMiddleIcon () {
            return this.shadowRoot.querySelector('#mc-dialog-icon-middle-button');
        }

        _getRightIcon () {
            return this.shadowRoot.querySelector('#mc-dialog-icon-right-button');
        }

        _getFooterLink () {
            return this.shadowRoot.querySelector('#mc-dialog-footer-link');
        }
    }

    componentUtils.registerCustomElement('mc-dialog', MCDialog);
})();
