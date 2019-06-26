import landingCss from './landing.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [landingCss];

(function () {
    class MCLanding extends HTMLElement {
        _render () {
            const template = document.createElement('template');
            template.innerHTML = `<div id="mc-landing-page"></div>`;

            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();

                let main = this._getLanding();
                let config = this._createConfig();
                this._renderItems(main, config);
            }
        }

        _createConfig () {
            let primarySection = this._createConfigSection('mc-landing-primary');
            let secondarySection = this._createConfigSection('mc-landing-secondary');
            let tertiarySection = this._createConfigSection('mc-landing-tertiary');
            return {
                primary: primarySection,
                secondary: secondarySection,
                tertiary: tertiarySection
            };
        }

        _createConfigSection (name) {
            let elements = [...this.querySelectorAll(name + ' mc-landing-item')];
            return elements.map(function (item) {
                return {
                    name: item.getAttribute('name'),
                    href: item.getAttribute('href'),
                    target: item.getAttribute('target'),
                    image: item.getAttribute('image'),
                    help: item.getAttribute('help'),
                    callToAction: item.getAttribute('call-to-action')
                };
            });
        }

        _renderItems (parent, config) {
            let primary = this._createPrimarySection(config.primary);
            parent.appendChild(primary);
            let secondary = this._createSecondarySection(config.secondary);
            parent.appendChild(secondary);
            let tertiary = this._createTertiarySection(config.tertiary);
            parent.appendChild(tertiary);
        }

        _createPrimarySection (primaryConfig) {
            let section = document.createElement('div');
            section.classList.add('mc-landing-primary');

            for (let item of primaryConfig) {
                let element = this._createPrimaryItem(item);
                section.appendChild(element);
            }

            return section;
        }

        _createPrimaryItem (item) {
            let primaryItem = document.createElement('div');
            primaryItem.classList.add('mc-landing-tile');
            primaryItem.innerHTML =
                html`<div class="mc-landing-tile-content">
                     <div class="mc-landing-tile-icon">
                         <div class="mc-${item.image}"></div>
                     </div>
                 </div>
                 <div class="mc-landing-tile-words">
                     <div class="mc-landing-tile-header">${item.name}</div>
                     <p class="mc-landing-tile-description">${item.help}</p>
                 </div>
                 <div class="mc-landing-call-to-action-wrapper">
                     <a class="mc-landing-call-to-action" href="${item.href}">${item.callToAction}</a>
                 </div>`;
            return primaryItem;
        }

        _createSecondarySection (secondaryConfig) {
            let section = document.createElement('div');
            section.classList.add('mc-landing-secondary');

            for (let item of secondaryConfig) {
                let element = this._createSecondaryItem(item);
                section.appendChild(element);
            }
            return section;
        }

        _createSecondaryItem (item) {
            let secondaryItem = document.createElement('div');
            secondaryItem.classList.add('mc-landing-row');
            secondaryItem.innerHTML =
                html`<div class="mc-landing-row-header">${item.name}</div>
                 <div class="mc-landing-row-right-section">
                     <div class="mc-landing-row-description">${item.help}</div>
                     <a class="mc-landing-call-to-action" href="${item.href}">${item.callToAction}</a>
                 </div>`;
            return secondaryItem;
        }

        _createTertiarySection (tertiaryConfig) {
            let section = document.createElement('div');
            section.classList.add('mc-landing-tertiary');

            for (let item of tertiaryConfig) {
                let element = this._createTertiaryItem(item);
                section.appendChild(element);
            }
            return section;
        }

        _createTertiaryItem (item) {
            let tertiaryItem = document.createElement('div');
            tertiaryItem.classList.add('mc-landing-container');
            tertiaryItem.innerHTML =
                html`<a href="${item.href}">${item.callToAction}</a>
                 <div class="mc-landing-description">${item.help}</div>`;
            return tertiaryItem;
        }

        _getLanding () {
            return this.shadowRoot.querySelector('#mc-landing-page');
        }
    }

    componentUtils.registerCustomElement('mc-landing', MCLanding);
})();
