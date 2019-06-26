import buttonCss from '../common/styles/button.css';
import bannerCss from './banner.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [buttonCss, bannerCss];

(function () {
    class MCBanner extends HTMLElement {
        get visible () {
            return this.hasAttribute('visible');
        }

        set visible (value) {
            if (value) {
                this.setAttribute('visible', '');
            } else {
                this.removeAttribute('visible');
            }
        }

        get closeButtonText () {
            return this.getAttribute('close-button-text');
        }

        static get observedAttributes () {
            return ['visible'];
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
                this._attachEventHandlers();
            }
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }

            if (name === 'visible') {
                if (newValue === null) {
                    this._hideBanner();
                } else {
                    this._showBanner();
                }
            }
        }

        _render () {
            const template = document.createElement('template');
            template.innerHTML =
                html`<div class="mc-banner-modal ${this.visible ? 'mc-banner-visible' : 'mc-banner-hidden'}">
                    <div class="mc-banner-content">
                        <div class='mc-banner-message'>
                            <slot name="content"></slot>
                        </div>

                        <div class='mc-banner-button-container'>
                            <button class='mc-button mc-banner-button-ok'>${this.closeButtonText}</button>
                        </div>
                    </div>
                </div>`;

            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        _attachEventHandlers () {
            let okButton = this._getOkButton();
            okButton.addEventListener('click', e => {
                if (this.dispatchEvent(new CustomEvent('banner-close', { cancelable: true }))) {
                    this.visible = false;
                    this._hideBanner();
                }
            });
        }

        _getBanner () {
            return this.shadowRoot.querySelector('.mc-banner-modal');
        }

        _showBanner () {
            let banner = this._getBanner();
            banner.classList.add('mc-banner-visible');
            banner.classList.remove('mc-banner-hidden');
        }

        _hideBanner () {
            let banner = this._getBanner();
            banner.classList.remove('mc-banner-visible');
            banner.classList.add('mc-banner-hidden');
        }

        _getOkButton () {
            return this.shadowRoot.querySelector('.mc-banner-button-ok');
        }
    }

    componentUtils.registerCustomElement('mc-banner', MCBanner);
})();
