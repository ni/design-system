import storageGraphCss from './storage-graph.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';
import { sizeUtils } from '../common/size-utils.js';
import { stringUtils } from '../common/string-utils.js';

const styles = [storageGraphCss];
const GRAPH_1_PERCENT_INCREMENT = 440 / 100;

(function () {
    class SLStorageGraph extends HTMLElement {
        get header () {
            return this.getAttribute('header') || '';
        }

        get used () {
            let used = this.getAttribute('used') || '0';
            return parseInt(used);
        }

        get limit () {
            let limit = this.getAttribute('limit') || '0';
            return parseInt(limit);
        }

        get mainText () {
            return this.getAttribute('main-text');
        }

        get detailsText () {
            return this.getAttribute('details-text');
        }

        static get observedAttributes () {
            return ['header', 'used', 'limit'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'header': {
                this._renderData(newValue, this.limit, this.used);
                break;
            }
            case 'used': {
                this._renderData(this.header, this.limit, newValue);
                break;
            }
            case 'limit': {
                this._renderData(this.header, newValue, this.used);
                break;
            }
            }
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
            }
            this._renderData(this.header, this.limit, this.used);
        }

        _render () {
            this.attachShadow({ mode: 'open' });

            let main = document.createElement('div');
            main.classList.add('sl-storage-graph-main');

            let dynamicStyleElement = document.createElement('style');
            dynamicStyleElement.id = 'sl-storage-graph-style';
            dynamicStyleElement.type = 'text/css';

            componentUtils.addStylesToElement(this.shadowRoot, styles);
            this.shadowRoot.appendChild(dynamicStyleElement);
            this.shadowRoot.appendChild(main);
        }

        _renderData (header, limit, used) {
            let limitFormatted = sizeUtils.format(limit);
            let usedFormatted = sizeUtils.format(used);
            let percentage = 0;
            if (limit > 0) {
                percentage = Math.round(used / limit * 100);
            }

            let data = {
                usedValue: usedFormatted.value,
                usedUnit: usedFormatted.unit,
                limitValue: limitFormatted.value,
                limitUnit: limitFormatted.unit
            };
            let mainText = stringUtils.format(this.mainText, data);
            let detailsText = stringUtils.format(this.detailsText, data);

            let main = this._getMain();
            main.innerHTML = html`
                <div class="sl-storage-graph-header">${header}</div>
                <div class="sl-storage-graph-used">${mainText}</div>
                <div class="sl-storage-graph-limit">${detailsText}</div>
                <div class="sl-storage-graph-donut-graph">
                    <div class="sl-storage-graph-percentage">${percentage} %</div>
                    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <circle class="sl-storage-graph-donut-empty" r="69.85695" cy="81" cx="81" fill="none"/>
                            <circle class="sl-storage-graph-donut" r="69.85695" cy="81" cx="81" fill="none"/>
                        </g>
                    </svg>
                </div>`;

            let offset = GRAPH_1_PERCENT_INCREMENT * (100 - percentage);
            let dynamicStyle = `
                @keyframes sl-storage-graph-donut-graph {
                    to {
                        stroke-dashoffset: ${offset};
                    }
                }
                `;

            let dynamicStyleElement = this._getDynamicStyle();
            dynamicStyleElement.innerHTML = '';
            dynamicStyleElement.appendChild(document.createTextNode(dynamicStyle));
        }

        _getMain () {
            return this.shadowRoot.querySelector('.sl-storage-graph-main');
        }

        _getDynamicStyle () {
            return this.shadowRoot.querySelector('#sl-storage-graph-style');
        }
    }

    componentUtils.registerCustomElement('sl-storage-graph', SLStorageGraph);
})();
