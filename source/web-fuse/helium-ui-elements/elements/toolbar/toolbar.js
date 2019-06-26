import iconsCss from '../common/styles/icons.css';
import toolbarCss from './toolbar.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [iconsCss, toolbarCss];

(function () {
    class MCToolbar extends HTMLElement {
        constructor () {
            super();

            this._outsideDropdownClickHandler = e => {
                let target = e.composedPath()[0];

                let contents = this.shadowRoot.querySelectorAll('.sl-dropdown-content');
                for (let content of contents) {
                    if (target.getAttribute('sl-dropdown-context') !== content.getAttribute('sl-dropdown-context')) {
                        content.parentNode.removeChild(content);
                    }
                }
            };

            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'disabled') {
                        let name = mutation.target.getAttribute('name');
                        let button = this._getToolbarButton(name);
                        if (!button) {
                            return;
                        }

                        if (mutation.target.getAttribute('disabled') === 'true') {
                            button.setAttribute('disabled', 'true');
                        } else {
                            button.removeAttribute('disabled');
                        }
                    }
                });
            });
        }

        get disabled () {
            return this.getAttribute('disabled');
        }

        set disabled (value) {
            this.setAttribute('disabled', value);
        }

        static get observedAttributes () {
            return ['disabled'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'disabled': {
                this._disableButtons(newValue === 'true');
                break;
            }
            }
        }

        _disableButtons (value) {
            let buttons = this._getToolbarButtons();
            for (let button of buttons) {
                button.disabled = value;
            }
        }

        _render () {
            const template = document.createElement('template');
            template.innerHTML =
                `<div class="mc-toolbar-main"></div>`;

            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
                this._renderItems();
                this._attachMutationObserver();
            }
            document.addEventListener('click', this._outsideDropdownClickHandler);
        }

        disconnectedCallback () {
            document.removeEventListener('click', this._outsideDropdownClickHandler);
        }

        _attachMutationObserver () {
            let toolbarItems = [...this.querySelectorAll('mc-toolbar-item')];
            for (let toolbarItem of toolbarItems) {
                this.observer.observe(toolbarItem, { attributes: true, attributeFilter: ['disabled'] });
            }
        }

        _getNestedItems (parentItem) {
            let nestedToolbarItems = [...parentItem.querySelectorAll('mc-toolbar-item')];
            return nestedToolbarItems.map((item) => {
                return {
                    name: item.getAttribute('name'),
                    text: item.getAttribute('text'),
                    icon: item.getAttribute('icon'),
                    iconPosition: item.getAttribute('icon-position') || 'left',
                    disabled: item.getAttribute('disabled') === 'true',
                    showOnMobile: this._parseBoolean(item.getAttribute('show-on-mobile') || 'true')
                };
            });
        }

        _createConfig () {
            let toolbarItems = [...this.children];
            return toolbarItems.map((item) => {
                return {
                    name: item.getAttribute('name'),
                    text: item.getAttribute('text'),
                    icon: item.getAttribute('icon'),
                    iconPosition: item.getAttribute('icon-position') || 'left',
                    disabled: item.getAttribute('disabled') === 'true',
                    showOnMobile: this._parseBoolean(item.getAttribute('show-on-mobile') || 'true'),
                    nestedItems: this._getNestedItems(item)
                };
            });
        }

        _parseBoolean (str) {
            return str === 'true';
        }

        _createDropdownItemLink (dropDownItem, item) {
            let link = document.createElement('a');
            link.textContent = dropDownItem.text;
            link.setAttribute('sl-dropdown-context', item.name);
            if (dropDownItem.disabled) {
                link.setAttribute('disabled', 'true');
            };
            link.addEventListener('click', e => {
                this.dispatchEvent(new CustomEvent('toolbar-item-click', { detail: dropDownItem }));
            });
            return link;
        }

        _createDropDown (dropDownItems, item) {
            let content = document.createElement('div');
            content.classList.add('sl-dropdown-content');
            content.setAttribute('sl-dropdown-context', item.name);

            for (let dropDownItem of dropDownItems) {
                let link = this._createDropdownItemLink(dropDownItem, item);
                content.appendChild(link);
            }
            return content;
        }

        _isDropdownOpen (context) {
            return this.shadowRoot.querySelector(`.sl-dropdown-content[sl-dropdown-context="${context}"]`) !== null;
        }

        _renderItems () {
            let config = this._createConfig();
            let main = this._getToolbar();
            main.innerHTML = '';

            for (let item of config) {
                let button = this._createButton(item);
                button.classList.add('mc-toolbar-item');
                if (!item.showOnMobile) {
                    button.classList.add('mc-toolbar-item-hide-on-mobile');
                }
                button.disabled = this.disabled || item.disabled;
                if (item.nestedItems && item.nestedItems.length > 0) {
                    button.setAttribute('sl-dropdown-context', item.name);
                    button.addEventListener('click', e => {
                        if (this._isDropdownOpen(item.name)) {
                            return;
                        }

                        let dropDown = this._createDropDown(item.nestedItems, item);
                        let rect = button.getBoundingClientRect();
                        dropDown.style.left = (rect.left + window.scrollX) + 'px';
                        dropDown.style.top = (rect.bottom + window.scrollY) + 'px';
                        this.shadowRoot.appendChild(dropDown);
                    });
                }

                button.addEventListener('click', e => {
                    this.dispatchEvent(new CustomEvent('toolbar-item-click', { detail: item }));
                });
                main.appendChild(button);
            }
        }

        _createButton (item) {
            let button = document.createElement('button');
            button.name = item.name;
            button.textContent = item.text;
            if (item.icon) {
                if (item.iconPosition === 'right') {
                    button.innerHTML = html`${item.text} <span sl-dropdown-context="${item.name}" class="fa mc-toolbar-item-icon">${item.icon}</span>`;
                } else if (item.iconPosition === 'left') {
                    button.innerHTML = html`<span sl-dropdown-context="${item.name}" class="fa mc-toolbar-item-icon">${item.icon}</span> ${item.text}`;
                }
            }
            return button;
        }

        _getToolbarButtons () {
            return this.shadowRoot.querySelectorAll('.mc-toolbar-item');
        }

        _getToolbarButton (name) {
            return this.shadowRoot.querySelector(`.mc-toolbar-item[name=${name}]`);
        }

        _getToolbar () {
            return this.shadowRoot.querySelector('.mc-toolbar-main');
        }
    }

    componentUtils.registerCustomElement('mc-toolbar', MCToolbar);
})();
