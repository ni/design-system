import { UserManager } from './UserManager.js';
import { stringUtils } from './StringUtils.js';

export class Page {
    constructor (remoteConnection, i18n) {
        this._remoteConnection = remoteConnection;
        this._userManager = new UserManager(remoteConnection);
        this._i18n = i18n;
    }

    init (element, activeName) {
        this._configureHeader(element, activeName);
        this._updateUserInfo(element);
        this._checkEntitlements();
        this._cookiesNotificationCheck();
    }

    _configureHeader (element, activeName) {
        let config = {
            app: { name: 'systemLinkCloud', text: this._i18n.systemLinkCloud, href: this._makeAbsolute('/'), target: '_self' },
            categories: [
                { name: 'home', text: this._i18n.home, href: this._makeAbsolute('/'), target: '_self' },
                { name: 'dashboards', text: this._i18n.dashboards, href: this._makeAbsolute('/dashboardhosting'), target: '_self' },
                { name: 'webApps', text: this._i18n.webApps, href: this._makeAbsolute('/webapphosting'), target: '_self' },
                { name: 'security', text: this._i18n.security, href: this._makeAbsolute('/security'), target: '_self' }
            ],
            userMenu: [
                { name: 'account', text: this._i18n.account, href: this._makeAbsolute('/account'), target: '_blank' },
                { name: 'logout', text: this._i18n.logout, href: this._makeAbsolute('/saml2/logout'), target: '_self' }
            ],
            helpMenu: [
                { name: 'faq', text: this._i18n.faq, href: this._makeAbsolute('/faq'), target: '_blank' },
                { name: 'support', text: this._i18n.support, href: 'https://forums.ni.com/t5/SystemLink/bd-p/1020', target: '_blank' },
                { name: 'feedback', text: this._i18n.feedback, href: 'mailto:lvcloudoperations@ni.com', target: '_self' }
            ]
        };
        this._setActiveCategory(activeName, config.categories);

        element.config = config;
        element.setAttribute('show-user-menu', 'false');
    }

    _makeAbsolute (url) {
        return this._remoteConnection.hostname() + url;
    }

    _setActiveCategory (name, categories) {
        for (let category of categories) {
            if (category.name === name) {
                category.active = true;
                break;
            }
        }
    }

    _updateUserInfo (element) {
        this._userManager.getCurrentUser()
            .then(user => {
                this._setUserName(element, user);
                this._changeLoginState(user);
            });
    }

    _checkEntitlements () {
        this._userManager.checkEntitlements()
            .then(result => this._entitlementsCheck(result));
    }

    _entitlementsCheck (result) {
        if (result.status === 'NotifyUser') {
            this._displayExpirationDialog(result.days, result.evaluation);
        }
    }

    _setUserName (element, user) {
        if (user) {
            element.setAttribute('show-user-menu', 'true');
            element.setAttribute('user-name', user.firstName + ' ' + user.lastName);
        }
    }

    _changeLoginState (user) {
        let localUserId = JSON.parse(window.localStorage.getItem('userId')) || '';
        let userId = user ? user.id : '';

        if (userId !== localUserId) {
            window.localStorage.setItem('userId', JSON.stringify(userId));
            if (user) {
                document.dispatchEvent(new CustomEvent('logged-in', { detail: user }));
            } else {
                document.dispatchEvent(new CustomEvent('logged-out'));
            }
        }
    }

    _displayExpirationDialog (days, evaluation) {
        let content;
        if (evaluation) {
            let evaluationExpiryMessage = stringUtils.format(this._i18n.entitlement.evaluationExpiryMessage, { days: days });
            content = `<p>${evaluationExpiryMessage}</p>`;
        } else {
            let licenseExpiryMessage = stringUtils.format(this._i18n.entitlement.licenseExpiryMessage, { days: days });
            content = `<p>${licenseExpiryMessage}</p>`;
        }

        if (days <= 7) {
            content += `${this._i18n.entitlement.text} <a target="_blank" href="https://www.ni.com/en-us/shop/select/systemlink-cloud">${this._i18n.entitlement.linkText}</a>`;
        }

        return this._createInfoDialog(this._i18n.entitlement.header, content);
    }

    _createInfoDialog (header, content) {
        let dialog = document.createElement('mc-dialog');
        dialog.setAttribute('header', header);
        dialog.setAttribute('text-right-button', this._i18n.entitlement.close);
        dialog.setAttribute('show-middle-button', 'false');
        dialog.innerHTML = `<span id="content" slot="content">${content}</span>`;
        dialog.addEventListener('right-button-click', () => {
            this._removeDialog(dialog);
        });
        dialog.addEventListener('modal-click', () => {
            this._removeDialog(dialog);
        });

        document.body.appendChild(dialog);
        return dialog;
    }

    _removeDialog (dialog) {
        if (dialog && dialog.parentNode) {
            dialog.parentNode.removeChild(dialog);
        }
    }

    _cookiesNotificationCheck () {
        if (!localStorage.cookiesNotificationConfirmed) {
            let cookiesNotification = document.createElement('mc-cookies-notification');
            cookiesNotification.setAttribute('confirm-button-text', this._i18n.cookiesNotification.confirmButton);
            cookiesNotification.setAttribute('text', this._i18n.cookiesNotification.text);
            cookiesNotification.setAttribute('link-text', this._i18n.cookiesNotification.linkText);
            cookiesNotification.addEventListener('cookies-confirmed', () => {
                localStorage.cookiesNotificationConfirmed = true;
                cookiesNotification.remove();
            });
            document.body.appendChild(cookiesNotification);
        }
    }
}
