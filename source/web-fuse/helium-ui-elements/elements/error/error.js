import errorCss from './error.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [errorCss];

(function () {
    class MCError extends HTMLElement {
        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
            }
        }

        _render () {
            const template = document.createElement('template');
            template.innerHTML =
                html`<div class="mc-error-main">
                    <div class="mc-error-code">${this.code}</div>
                    <div class="mc-error-message">${this.message}</div>
                    <a href="${this.linkUrl}" class="mc-error-link" rel="noopener noreferrer">${this.linkText}</a>
                </div>`;

            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        get message () {
            return this.getAttribute('message');
        }

        set message (value) {
            this.setAttribute('message', value);
        }

        get code () {
            return this.getAttribute('code');
        }

        set code (value) {
            this.setAttribute('code', value);
        }

        get linkText () {
            return this.getAttribute('link-text');
        }

        set linkText (value) {
            this.setAttribute('link-text', value);
        }

        get linkUrl () {
            return this.getAttribute('link-url');
        }

        set linkUrl (value) {
            this.setAttribute('link-url', value);
        }

        static get observedAttributes () {
            return ['message', 'code', 'link-text', 'link-url'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'message': {
                this._getMessage().textContent = newValue;
                break;
            }
            case 'code': {
                this._getCode().textContent = newValue;
                break;
            }
            case 'link-text': {
                this._getLink().textContent = newValue;
                break;
            }
            case 'link-url': {
                this._getLink().href = newValue;
                break;
            }
            }
        }

        _getCode () {
            return this.shadowRoot.querySelector('.mc-error-code');
        }

        _getMessage () {
            return this.shadowRoot.querySelector('.mc-error-message');
        }

        _getLink () {
            return this.shadowRoot.querySelector('.mc-error-link');
        }
    }

    componentUtils.registerCustomElement('mc-error', MCError);
})();
