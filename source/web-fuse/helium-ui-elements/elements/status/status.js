import statusCss from './status.css';
import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

const styles = [statusCss];

(function () {
    class MCStatus extends HTMLElement {
        _render () {
            const template = document.createElement('template');
            template.innerHTML =
                html`<div id='status-content' class='mc-status-content'>
                    <div id='status-icon' class="${this._getStateClass(this.state)}"></div>
                    <div class="mc-status-title"><h3 class="${this.title === '' ? 'mc-status-hidden' : ''}" id='status-title'>${this.title}</h3></div>
                    <div class="mc-status-message ${this.message === '' ? 'mc-status-hidden' : ''}" id="status-message">${this.message}</div>
                    <div class="mc-status-additional-message ${this.additionalMessage ? 'mc-status-hidden' : ''}" id="status-additional-message">${this.additionalMessage}</div>
                </div>`;
            this.attachShadow({ mode: 'open' });

            componentUtils.addStylesToElement(this.shadowRoot, styles);

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback () {
            if (!this.shadowRoot) {
                this._render();
            }
        }

        static get observedAttributes () {
            return ['state', 'title', 'message', 'additional-message'];
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (!this.shadowRoot) {
                return;
            }
            switch (name) {
            case 'message': {
                if (newValue && newValue !== '') {
                    this._statusMessage.classList.remove('mc-status-hidden');
                } else {
                    this._statusMessage.classList.add('mc-status-hidden');
                }
                this._statusMessage = newValue;
                break;
            }

            case 'additional-message': {
                if (newValue && newValue !== '') {
                    this._statusAdditionalMessage.classList.remove('mc-status-hidden');
                } else {
                    this._statusAdditionalMessage.classList.add('mc-status-hidden');
                }
                this._statusAdditionalMessage = newValue;
                break;
            }

            case 'title': {
                if (newValue && newValue !== '') {
                    this._statusTitle.classList.remove('mc-status-hidden');
                } else {
                    this._statusTitle.classList.add('mc-status-hidden');
                }
                this._statusTitle = newValue;
                break;
            }
            case 'state': {
                this._setState(newValue);
                break;
            }
            }
        }

        _setState (state) {
            let iconClassList = this._icon.classList;
            while (iconClassList.length > 0) {
                iconClassList.remove(iconClassList.item(0));
            }

            let stateClass = this._getStateClass(state);
            iconClassList.add(stateClass);
        }

        _getStateClass (state) {
            switch (state) {
            case 'pending': {
                return 'mc-status-waiting-icon';
            }
            case 'success': {
                return 'mc-status-success-icon';
            }
            case 'failed': {
                return 'mc-status-failed-icon';
            }
            }
        }

        get _icon () {
            return this.shadowRoot.getElementById('status-icon');
        }

        get _content () {
            return this.shadowRoot.getElementById('status-content');
        }

        get _statusMessage () {
            return this.shadowRoot.getElementById('status-message');
        }

        set _statusMessage (value) {
            this.shadowRoot.getElementById('status-message').innerText = value;
        }

        get _statusAdditionalMessage () {
            return this.shadowRoot.getElementById('status-additional-message');
        }

        set _statusAdditionalMessage (value) {
            this.shadowRoot.getElementById('status-additional-message').innerText = value;
        }

        get _statusTitle () {
            return this.shadowRoot.getElementById('status-title');
        }

        set _statusTitle (value) {
            this.shadowRoot.getElementById('status-title').innerText = value;
        }

        // Attributes
        get state () {
            return this.getAttribute('state') || 'pending';
        }

        get title () {
            return this.getAttribute('title') || '';
        }

        set title (value) {
            this.setAttribute('title', value);
        }

        get message () {
            return this.getAttribute('message') || '';
        }

        set message (value) {
            this.setAttribute('message', value);
        }

        get additionalMessage () {
            return this.getAttribute('additional-message') || '';
        }

        set additionalMessage (value) {
            this.setAttribute('additional-message', value);
        }
    }

    componentUtils.registerCustomElement('mc-status', MCStatus);
})();
