import tabCss from './tab.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [tabCss];

(function () {
    class MCTab extends HTMLElement {
        get activeIndex () {
            return parseInt(this.getAttribute('active-index') || 0);
        }

        set activeIndex (value) {
            this.setAttribute('active-index', value.toString());
        }

        static get observedAttributes () {
            return ['active-index'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'active-index': {
                if (oldValue === newValue) {
                    break;
                }
                let newIndex = parseInt(newValue || 0);
                this._updateSlotVisibility(newIndex);

                let name;
                let menuEntries = this._getMenuEntries();
                for (let entry of menuEntries) {
                    this._updateActiveEntry(entry, newIndex);
                    if (this._isActive(entry, newIndex)) {
                        name = entry.id;
                    }
                }
                let detail = {
                    name: name,
                    index: newIndex
                };
                this.dispatchEvent(new CustomEvent('tab-change', { detail: detail }));
            }
            }
        }

        _render () {
            let main = document.createElement('div');
            main.classList.add('mc-tab-main');
            main.innerHTML =
                `<div class="mc-tab-menu"></div>
                 <div class="mc-tab-container"></div>`;

            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);
            componentUtils.addStylesToElement(this.shadowRoot, [
                `.mc-tab-menu-entry-font {
                    font-family: var(--${this.id}-label-icon-font), var(--mc-headline-font);
                }`
            ]);
            this.shadowRoot.appendChild(main);
        }

        _updateSlotVisibility (activeIndex) {
            this._removeAllSlots();
            let slot = this._createSlot(activeIndex);
            let container = this._getTabContainer();
            container.appendChild(slot);
        }

        _removeAllSlots () {
            let slots = this._getSlots();
            for (let slot of slots) {
                slot.parentNode.removeChild(slot);
            }
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
                this._renderItems();
            }
        }

        _createConfig () {
            let tabItems = [...this.querySelectorAll('mc-tab-item')];
            let config = [];
            for (const [i, tabItem] of tabItems.entries()) {
                config.push({
                    name: tabItem.getAttribute('name'),
                    icon: tabItem.getAttribute('icon'),
                    text: tabItem.getAttribute('text'),
                    index: i
                });
            }
            return config;
        }

        _renderItems () {
            let config = this._createConfig();
            let menu = this._getTabMenu();
            let container = this._getTabContainer();
            menu.innerHTML = '';

            for (let item of config) {
                let menuEntry = this._createMenuEntry(item);
                this._updateActiveEntry(menuEntry, this.activeIndex);
                menu.appendChild(menuEntry);

                if (this._isActive(menuEntry, this.activeIndex)) {
                    let slot = this._createSlot(item.index);
                    container.appendChild(slot);
                }
            }
        }

        _createMenuEntry (item) {
            let entry = document.createElement('div');
            entry.id = item.name;
            entry.classList.add('mc-tab-menu-entry');
            entry.classList.add('mc-tab-menu-entry-font');
            entry.index = item.index;
            entry.addEventListener('click', (e) => {
                this.activeIndex = item.index;
            });
            entry.innerHTML = html`<span>${item.icon || ''}</span> <span class="mc-tab-menu-entry-text">${item.text}</span>`;
            return entry;
        }

        _createSlot (index) {
            let slot = document.createElement('slot');
            slot.name = 'content-' + index;
            slot.index = index;
            return slot;
        }

        _updateActiveEntry (menuEntry, activeIndex) {
            if (this._isActive(menuEntry, activeIndex)) {
                menuEntry.classList.add('mc-tab-menu-entry-active');
                menuEntry.classList.remove('mc-tab-menu-entry-inactive');
            } else {
                menuEntry.classList.remove('mc-tab-menu-entry-active');
                menuEntry.classList.add('mc-tab-menu-entry-inactive');
            }
        }

        _isActive (element, index) {
            return element.index === index;
        }

        _updateActiveSlot (slot, activeIndex) {
            if (this._isActive(slot, activeIndex)) {
                slot.classList.remove('mc-tab-content-hidden');
            } else {
                slot.classList.add('mc-tab-content-hidden');
            }
        }

        _updateActiveContent (content, activeIndex) {
            if (content.getAttribute('slot') === 'content-' + activeIndex) {
                content.classList.remove('mc-tab-content-hidden');
            } else {
                content.classList.add('mc-tab-content-hidden');
            }
        }

        _getTab () {
            return this.shadowRoot.querySelector('.mc-tab-main');
        }

        _getTabMenu () {
            return this.shadowRoot.querySelector('.mc-tab-menu');
        }

        _getTabContainer () {
            return this.shadowRoot.querySelector('.mc-tab-container');
        }

        _getMenuEntries () {
            return this.shadowRoot.querySelectorAll('.mc-tab-menu-entry');
        }

        _getSlots () {
            return this.shadowRoot.querySelectorAll('slot');
        }
    }

    componentUtils.registerCustomElement('mc-tab', MCTab);
})();
