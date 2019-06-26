import buttonCss from '../common/styles/button.css';
import callToActionCss from './calltoaction.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [buttonCss, callToActionCss];

(function () {
    class MCCallToAction extends HTMLElement {
        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
            }
        }

        _render () {
            const template = document.createElement('template');
            template.innerHTML =
                html`<div class="mc-calltoaction-main">
                    <div class="mc-calltoaction-icon ${this.icon}"></div>
                    <div><h3>${this.header}</h3></div>
                    <button class="mc-button mc-calltoaction-button">${this.buttonText}</button>
                    <div>
                        <p id="mc-calltoaction-message">${this.message}</p>
                        <p id="mc-calltoaction-help">Check out our <a href="gettingstarted">Getting Started</a> guide and <a href="faq">FAQs</a> for help.</p>
                    </div>
                </div>`;

            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            let button = this._getActionButton();
            button.addEventListener('click', e => {
                this.dispatchEvent(new CustomEvent('action-button-click'));
            });
        }

        get header () {
            return this.getAttribute('header');
        }

        set header (value) {
            this.setAttribute('header', value);
        }

        get message () {
            return this.getAttribute('message');
        }

        set message (value) {
            this.setAttribute('message', value);
        }

        get icon () {
            return this.getAttribute('icon');
        }

        set icon (value) {
            this.setAttribute('icon', value);
        }

        get buttonText () {
            return this.getAttribute('button-text');
        }

        set buttonText (value) {
            this.setAttribute('button-text', value);
        }

        _getActionButton () {
            return this.shadowRoot.querySelector('.mc-calltoaction-button');
        }
    }

    componentUtils.registerCustomElement('mc-calltoaction', MCCallToAction);
})();
