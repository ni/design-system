import autocomplete from './autocomplete.css';
import inputCss from '../common/styles/input.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [autocomplete, inputCss];

(function () {
    class MCAutoComplete extends HTMLElement {
        constructor () {
            super();
            this.currentFocus = -1;

            this._outsideDropDowEventHanlder = e => {
                if (this.dropDown) {
                    let target = e.composedPath()[0];
                    let targetParent = target.parentNode;

                    if (target !== this.input &&
                    targetParent !== this.dropDown) {
                        this._removeDropDown();
                    }
                }
            };
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
                this._attachEventHandlers();
            }
            this._attachDocumentHandlers();
            this.input.focus();
        }

        disconnectedCallback () {
            this._removeDocumentHandlers();
        }

        static get observedAttributes () {
            return ['placeholder', 'error-message'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'placeholder': {
                this.input.setAttribute('placeholder', newValue);
                break;
            }
            case 'error-message': {
                if (newValue) {
                    this._showError(newValue);
                } else {
                    this._hideError();
                }
                break;
            }
            }
        }

        _showError (newValue) {
            this.input.classList.add('error');
            this.errorMessage.classList.remove('mc-autocomplete-error-hidden');
            this.errorMessage.textContent = newValue;
        }

        _hideError () {
            this.input.classList.remove('error');
            this.errorMessage.classList.add('mc-autocomplete-error-hidden');
            this.errorMessage.textContent = '';
        }

        get items () {
            return this._items !== undefined ? this._items : [];
        }

        set items (value) {
            this._items = value;
        }

        get input () {
            return this.shadowRoot.getElementById('autocompletable-input');
        }

        get dropDown () {
            return this.shadowRoot.getElementById('drop-down-list');
        }

        get errorString () {
            this.getAttribute('error-message');
        }

        set errorString (value) {
            this.setAttribute('error-message', value);
        }

        get placeholder () {
            return this.getAttribute('placeholder');
        }

        get errorMessage () {
            return this.shadowRoot.getElementById('mc-autocomplete-error-message');
        }

        _removeDropDown () {
            if (this.dropDown) {
                this.dropDown.parentNode.removeChild(this.dropDown);
            }
        }

        _render () {
            const template = document.createElement('template');
            template.innerHTML = html`<div class="mc-autocomplete">
                        <input id="autocompletable-input" placeholder="${this.placeholder}" class="mc-input ${this.errorString ? 'error' : ''}"  type="text">
                        <div id="mc-autocomplete-error-message" class="${this.errorString ? '' : 'mc-autocomplete-error-hidden'}">${this.errorString}</div>
                    </div>`;
            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        _createDropDownItem (itemValue, inputValue) {
            let matchingString = itemValue.substr(0, inputValue.length);
            let remainingString = itemValue.substr(inputValue.length);

            let listItem = document.createElement('DIV');
            listItem.innerHTML = html`<span><strong>${matchingString}</strong>${remainingString}</span>
                                      <input type="hidden" value="${itemValue}">`;
            let that = this;
            listItem.addEventListener('click', function (e) {
                that.input.value = this.getElementsByTagName('input')[0].value;
                that._removeDropDown();
                that._submitInput();
                that.input.focus();
            });
            return listItem;
        }

        _createDropDown (inputValue) {
            let dropDown = document.createElement('DIV');
            dropDown.setAttribute('id', 'drop-down-list');
            dropDown.setAttribute('class', 'mc-autocomplete-items');

            let i = 0;
            let hasItems = false;
            for (i = 0; i < this.items.length; i++) {
                let itemValue = this.items[i];
                if (this._match(itemValue, inputValue)) {
                    hasItems = true;
                    let listItem = this._createDropDownItem(itemValue, inputValue);
                    dropDown.appendChild(listItem);
                }
            }

            if (hasItems) {
                this.input.parentNode.appendChild(dropDown);
            }
        }

        _match (item, inputValue) {
            return item.substr(0, inputValue.length).toUpperCase() === inputValue.toUpperCase();
        }

        _removeDocumentHandlers () {
            document.removeEventListener('click', this._outsideDropDowEventHanlder);
        }

        _attachDocumentHandlers () {
            document.addEventListener('click', this._outsideDropDowEventHanlder);
        }

        _attachEventHandlers () {
            this.input.addEventListener('input', (e) => {
                this._hideError();
                this._removeDropDown();
                let val = this.input.value;
                if (!val) {
                    return false;
                }
                this.currentFocus = -1;
                this._createDropDown(val);
            });

            this.input.addEventListener('keydown', (e) => {
                if ([40, 38, 13].includes(e.keyCode)) {
                    e.stopPropagation();
                }

                if (this.dropDown) {
                    let listItems = this.dropDown.getElementsByTagName('div');

                    if (e.keyCode === 40) { // down
                        this.currentFocus++;
                        this._markSelected(listItems);
                    } else if (e.keyCode === 38) { // up
                        this.currentFocus--;
                        this._markSelected(listItems);
                    } else if (e.keyCode === 13) { // ENTER
                        if (this.currentFocus > -1) {
                            if (listItems) {
                                listItems[this.currentFocus].click();
                            }
                        } else {
                            this._removeDropDown();
                            this._submitInput();
                        }
                    }
                } else if (e.keyCode === 13) { // ENTER
                    this._submitInput();
                }
            });
        }

        clear () {
            this.input.value = '';
        }

        _submitInput () {
            if (this.input.value !== '') {
                this.dispatchEvent(new CustomEvent('input-submitted', { detail: { value: this.input.value } }));
            }
        }

        _markSelected (listItems) {
            if (!listItems) {
                return false;
            }
            this._unmarkAll(listItems);
            if (this.currentFocus >= listItems.length) {
                this.currentFocus = 0;
            }
            if (this.currentFocus < 0) {
                this.currentFocus = (listItems.length - 1);
            }
            listItems[this.currentFocus].classList.add('mc-autocomplete-active');
        }

        _unmarkAll (listItems) {
            for (let i = 0; i < listItems.length; i++) {
                listItems[i].classList.remove('mc-autocomplete-active');
            }
        }
    }

    componentUtils.registerCustomElement('mc-autocomplete', MCAutoComplete);
})();
