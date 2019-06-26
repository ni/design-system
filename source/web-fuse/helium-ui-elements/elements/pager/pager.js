import iconsCss from '../common/styles/icons.css';
import pagerCss from './pager.css';

import { componentUtils } from '../common/component-utils.js';
import { stringUtils } from '../common/string-utils.js';

const styles = [iconsCss, pagerCss];

(function () {
    class MCPager extends HTMLElement {
        get items () {
            let items = this.getAttribute('items') || '0';
            return parseInt(items);
        }

        get page () {
            let page = this.getAttribute('page') || '1';
            return parseInt(page);
        }

        set page (value) {
            let pageCount = this._pageCount();
            if (value > pageCount) {
                value = pageCount;
            }
            if (value < 1) {
                value = 1;
            }
            this.setAttribute('page', value);
            this._sendPageChangeEvent();
        }

        get pageSize () {
            let pageSize = this.getAttribute('page-size') || '20';
            return parseInt(pageSize);
        }

        set pageSize (value) {
            this.setAttribute('page-size', value);
            this._sendPageChangeEvent();
        }

        get pageSizeLabel () {
            return this.getAttribute('page-size-label');
        }

        set pageSizeLabel (value) {
            this.setAttribute('page-size-label', value);
        }

        get goToPageLabel () {
            return this.getAttribute('go-to-page-label');
        }

        set goToPageLabel (value) {
            this.setAttribute('go-to-page-label', value);
        }

        get currentPageLabel () {
            return this.getAttribute('current-page-label');
        }

        set currentPageLabel (value) {
            this.setAttribute('current-page-label', value);
        }

        get pageSizes () {
            let pageSizes = this.getAttribute('page-sizes') || '5,10,20';
            return pageSizes.split(',').map(function (item) {
                return parseInt(item);
            });
        }

        static get observedAttributes () {
            return ['items', 'page', 'page-size'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'items': {
                this._update();
                break;
            }
            case 'page': {
                this._update();
                break;
            }
            case 'page-size': {
                this._update();
                break;
            }
            }
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
            }
        }

        _render () {
            let main = document.createElement('div');
            main.classList.add('mc-pager-main');

            main.appendChild(this._createGoToPageText());
            main.appendChild(this._createGoToPageInput());
            main.appendChild(this._createPageSizeText());
            main.appendChild(this._createPageSizeSelect());
            main.appendChild(this._createPagerItemText());
            main.appendChild(this._createPreviousLink());
            main.appendChild(this._createNextLink());

            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(main);
            this._update();
        }

        _createGoToPageText () {
            let text = document.createElement('span');
            text.classList.add('mc-pager-go-to-page-text');
            text.textContent = this.goToPageLabel;
            return text;
        }

        _createGoToPageInput () {
            let input = document.createElement('input');
            input.classList.add('mc-pager-go-to-page');
            input.name = 'go-to-page';
            input.type = 'number';
            input.min = 1;
            input.addEventListener('change', () => {
                this.page = input.value;
            });
            return input;
        }

        _createPageSizeText () {
            let text = document.createElement('span');
            text.classList.add('mc-pager-page-size-text');
            text.textContent = this.pageSizeLabel;
            return text;
        }

        _createPageSizeSelect () {
            let select = document.createElement('select');
            select.classList.add('mc-pager-page-size');
            select.value = this.pageSize;
            for (let pageSize of this.pageSizes) {
                let option = document.createElement('option');
                option.value = option.textContent = pageSize;
                select.appendChild(option);
            }
            select.addEventListener('change', () => {
                this.pageSize = select.value;
            });
            return select;
        }

        _createPagerItemText () {
            let text = document.createElement('span');
            text.classList.add('mc-pager-item-text');
            return text;
        }

        _createPreviousLink () {
            let button = document.createElement('button');
            button.href = '';
            button.classList.add('fa');
            button.classList.add('mc-pager-button');
            button.classList.add('mc-pager-button-previous');
            button.innerHTML = '<span class="mc-pager-button-icon-previous"></span>';
            button.addEventListener('click', (e) => {
                this.page = this.page - 1;
                e.preventDefault();
            });
            return button;
        }

        _createNextLink () {
            let button = document.createElement('button');
            button.href = '';
            button.classList.add('fa');
            button.classList.add('mc-pager-button');
            button.classList.add('mc-pager-button-next');
            button.innerHTML = '<span class="mc-pager-button-icon-next"></span>';
            button.addEventListener('click', (e) => {
                this.page = this.page + 1;
                e.preventDefault();
            });
            return button;
        }

        _update () {
            let input = this._getGoToPageInput();
            input.max = this._pageCount();
            input.value = this.page;

            let select = this._getPageSizeSelect();
            select.value = this.pageSize;

            let itemText = this._getItemText();
            itemText.textContent = this._getItemTextContent();
        }

        _getItemTextContent () {
            let startItem = (this.page - 1) * this.pageSize + 1;
            let endItem = Math.min(this.page * this.pageSize, this.items);
            startItem = Math.min(startItem, endItem);

            return stringUtils.format(this.currentPageLabel, { from: startItem, to: endItem, total: this.items });
        }

        _sendPageChangeEvent () {
            this.dispatchEvent(new CustomEvent('page-change', {
                detail: {
                    page: this.page,
                    pageSize: this.pageSize,
                    items: this.items
                }
            }));
        }

        _pageCount () {
            return Math.ceil(this.items / this.pageSize);
        }

        _getGoToPageInput () {
            return this.shadowRoot.querySelector('.mc-pager-go-to-page');
        }

        _getPageSizeSelect () {
            return this.shadowRoot.querySelector('.mc-pager-page-size');
        }

        _getItemText () {
            return this.shadowRoot.querySelector('.mc-pager-item-text');
        }
    }

    componentUtils.registerCustomElement('mc-pager', MCPager);
})();
