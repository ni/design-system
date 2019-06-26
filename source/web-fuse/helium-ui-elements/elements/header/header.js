import headerCss from './header.css';

import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [headerCss];

(function () {
    class MCHeader extends HTMLElement {
        constructor () {
            super();

            this._menuClickHandler = e => {
                e.srcElement.parentNode.classList.toggle('mc-header-dropdown-show');
            };
            this._outsideMenuClickHandler = e => {
                let target = e.composedPath()[0];
                let targetParent = target.parentNode;

                let contents = this.shadowRoot.querySelectorAll('.mc-header-dropdown-content');
                for (let content of contents) {
                    if (content.parentNode !== targetParent) {
                        content.parentNode.classList.remove('mc-header-dropdown-show');
                    }
                }
            };
        }

        _render () {
            this.attachShadow({ mode: 'open' });

            let header = document.createElement('header');
            header.classList.add('mc-header-page');

            componentUtils.addStylesToElement(this.shadowRoot, styles);
            this.shadowRoot.appendChild(header);
        }

        get userName () {
            return this.getAttribute('user-name');
        }

        set userName (value) {
            this.setAttribute('user-name', value);
        }

        get showUserMenu () {
            return this.getAttribute('show-user-menu');
        }

        set showUserMenu (value) {
            this.setAttribute('show-user-menu', value);
        }

        get showHelpMenu () {
            return this.getAttribute('show-help-menu');
        }

        set showHelpMenu (value) {
            this.setAttribute('show-help-menu', value);
        }

        set config (value) {
            this._config = value;
            this._renderItems(value);
        }

        static get observedAttributes () {
            return ['user-name', 'show-user-menu', 'show-help-menu'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this._config || !this.shadowRoot) {
                return;
            }

            switch (name) {
            case 'user-name': {
                let userName = this._getUserName();
                userName.textContent = newValue || '';
                break;
            }
            case 'show-user-menu': {
                if (newValue === 'false') {
                    this._getUserMenu().classList.add('mc-header-dropdown-hidden');
                } else {
                    this._getUserMenu().classList.remove('mc-header-dropdown-hidden');
                }
                break;
            }
            case 'show-help-menu': {
                if (newValue === 'false') {
                    this._getHelpMenu().classList.add('mc-header-dropdown-hidden');
                } else {
                    this._getHelpMenu().classList.remove('mc-header-dropdown-hidden');
                }
                break;
            }
            }
        }

        connectedCallback () {
            componentUtils.upgradeProperty(this, 'config');
            if (!this.shadowRoot) {
                this._render();
                this._renderItems(this._config);
            }
            this._attachDocumentEventHandlers();
        }

        disconnectedCallback () {
            this._removeDocumentEventHandlers();
        }

        _attachDocumentEventHandlers () {
            document.addEventListener('click', this._outsideMenuClickHandler);
        }

        _removeDocumentEventHandlers () {
            document.removeEventListener('click', this._outsideMenuClickHandler);
        }

        _attachClickHandler (element, config, eventName) {
            element.addEventListener('click', e => {
                if (!this.dispatchEvent(new CustomEvent(eventName, { cancelable: true, detail: config }))) {
                    e.preventDefault();
                }
            });
        }

        _renderItems (config) {
            if (!this.shadowRoot || !this._config) {
                return;
            }

            // Create three header sections
            let headerLeft = document.createElement('div');
            headerLeft.id = 'mc-header-left';
            headerLeft.classList.add('mc-header-left');

            let headerCenter = document.createElement('div');
            headerCenter.id = 'mc-header-center';
            headerCenter.classList.add('mc-header-center');

            let headerRight = document.createElement('div');
            headerCenter.id = 'mc-header-right';
            headerRight.classList.add('mc-header-right');

            this._populateHeader(config, headerLeft, headerCenter, headerRight);

            let header = this._getHeaderPage();
            header.innerHTML = '';
            header.appendChild(headerLeft);
            header.appendChild(headerCenter);
            header.appendChild(headerRight);
        }

        _populateHeader (config, left, center, right) {
            let homeButton = this._createHome(config.app);
            left.appendChild(homeButton);

            let navigation = this._createNavigation(config.categories);
            center.appendChild(navigation);

            let userText = this._createUserText();
            right.appendChild(userText);
            let userMenu = this._createMenu(config.userMenu, 'user-menu', this.showUserMenu);
            right.appendChild(userMenu);
            let helpMenu = this._createMenu(config.helpMenu, 'help-menu', this.showHelpMenu);
            right.appendChild(helpMenu);
        }

        _createHome (appConfig) {
            let button = document.createElement('button');
            button.classList.add('mc-header-app-title-button');
            button.innerHTML = html`<div class="mc-header-app-title">${appConfig.text}</div>`;
            button.addEventListener('click', e => {
                if (this.dispatchEvent(new CustomEvent('app-title-click', { cancelable: true, detail: appConfig }))) {
                    this._openHref(appConfig.href, appConfig.target);
                }
            });
            return button;
        }

        _createNavigation (items) {
            let navElement = document.createElement('nav');
            navElement.classList.add('mc-header-nav');
            navElement.innerHTML = '<a href="#" class="mc-header-menu-icon"></a>';

            let headerCategories = document.createElement('ul');
            headerCategories.classList.add('mc-header-categories');
            navElement.appendChild(headerCategories);

            for (let item of items) {
                let navLinkListItem = this._createNavigationItem(item);
                headerCategories.appendChild(navLinkListItem);
            }

            return navElement;
        }

        _createNavigationItem (item) {
            let navLinkItem = document.createElement('a');
            navLinkItem.classList.add('mc-header-category');
            navLinkItem.text = item.text;
            navLinkItem.href = item.href;
            navLinkItem.target = item.target || '_self';
            if (item.active) {
                navLinkItem.classList.add('mc-header-active');
            }
            this._attachClickHandler(navLinkItem, item, 'category-click');

            let navLinkListItem = document.createElement('li');
            navLinkListItem.appendChild(navLinkItem);
            return navLinkListItem;
        }

        _createUserText () {
            let userDiv = document.createElement('div');
            userDiv.id = 'mc-header-user-name';
            userDiv.classList.add('mc-header-user-name');
            userDiv.innerText = this.userName;
            return userDiv;
        }

        _createMenu (menuConfig, name, show) {
            let links = [];
            for (let item of menuConfig) {
                links.push(this._createMenuItemLink(name, item));
            }
            return this._createDropDown(name, links, show);
        }

        _createMenuItemLink (name, item) {
            let link = document.createElement('a');
            link.href = item.href;
            link.target = item.target || '_self';
            link.textContent = item.text;
            this._attachClickHandler(link, item, name + '-click');
            return link;
        }

        _createDropDown (name, links, display) {
            let dropdown = document.createElement('div');
            dropdown.id = 'mc-header-' + name;
            dropdown.classList.add('mc-header-dropdown');
            if (display === 'false') {
                dropdown.classList.add('mc-header-dropdown-hidden');
            }

            let button = document.createElement('div');
            button.classList.add('mc-header-dropdown-button');
            button.classList.add('mc-header-' + name + '-button');
            button.addEventListener('click', this._menuClickHandler);

            let content = document.createElement('div');
            content.classList.add('mc-header-dropdown-content');
            for (let link of links) {
                content.appendChild(link);
            }

            dropdown.appendChild(button);
            dropdown.appendChild(content);
            return dropdown;
        }

        _openHref (href, target) {
            let win = window.open(href, target);
            // win is undefined, if the window cannot be opened (e.g.popup blocker)
            if (win) {
                win.focus();
            }
        }

        _getUserName () {
            return this.shadowRoot.querySelector('#mc-header-user-name');
        }

        _getUserMenu () {
            return this.shadowRoot.querySelector('#mc-header-user-menu');
        }

        _getHelpMenu () {
            return this.shadowRoot.querySelector('#mc-header-help-menu');
        }

        _getHeaderPage () {
            return this.shadowRoot.querySelector('.mc-header-page');
        }
    }

    componentUtils.registerCustomElement('mc-header', MCHeader);
})();
