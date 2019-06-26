import footerCss from './footer.css';

import { componentUtils } from '../common/component-utils.js';

const styles = [footerCss];

(function () {
    class MCFooter extends HTMLElement {
        connectedCallback () {
            const template = document.createElement('template');
            template.innerHTML =
                `<footer id="mc-footer-page">
                    <div id="mc-footer-left">
                        <div>
                            <a id="mc-footer-legal" href="http://www.ni.com/legal" target="_blank">Legal</a> |
                            <a id="mc-footer-privacy" href="http://www.ni.com/legal/privacy/unitedstates/us/" target="_blank">Privacy</a>
                        </div>
                        <div id="mc-footer-copyright">&copy; 2019 National Instruments. All rights reserved.</div>
                    </div>
                    <div id="mc-footer-right">
                        <div>
                            <a href="http://www.ni.com" target="_blank">
                                <div class="mc-ni-logo"></div>
                            </a>
                        </div>
                    </div>
                </footer>`;

            this.attachShadow({ mode: 'open' });
            componentUtils.addStylesToElement(this.shadowRoot, styles);
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }

    componentUtils.registerCustomElement('mc-footer', MCFooter);
})();
