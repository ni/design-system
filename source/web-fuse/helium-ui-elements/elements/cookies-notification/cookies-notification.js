import '../banner/banner.js';
import cookiesNotificationCss from './cookies-notification.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [cookiesNotificationCss];

(function () {
    class MCCookiesNotification extends HTMLElement {
        get confirmButtonText () {
            return this.getAttribute('confirm-button-text');
        }

        get text () {
            return this.getAttribute('text');
        }

        get linkText () {
            return this.getAttribute('link-text');
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
            }
        }

        _render () {
            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);

            let banner = document.createElement('mc-banner');
            banner.innerHTML = html`<span slot="content">${this.text} <a class="mc-cookies-notification-link" target="_blank" rel="noopener noreferrer" href="https://www.ni.com/legal/privacy/unitedstates/us/">${this.linkText}</a></span>`;
            banner.setAttribute('visible', '');
            banner.setAttribute('close-button-text', this.confirmButtonText);
            banner.addEventListener('banner-close', () => {
                this.dispatchEvent(new CustomEvent('cookies-confirmed'));
            });

            this.shadowRoot.appendChild(banner);
        }
    }

    componentUtils.registerCustomElement('mc-cookies-notification', MCCookiesNotification);
})();
