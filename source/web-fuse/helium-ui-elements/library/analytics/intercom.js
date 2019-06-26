import { ServiceUrls } from '../core/ServiceUrls.js';
import { utils } from './utils.js';

export class IntercomSupport {
    constructor () {
        this._intercomAppId = this.intercomAppId();
    }

    isTest () {
        if (typeof window.jasmine !== 'undefined') {
            document.cookie = 'endToEnd=true';
            return true;
        } else if (window.document.documentElement.getAttribute('webdriver')) {
            document.cookie = 'endToEnd=true';
            return true;
        } else if (navigator.webdriver === true) {
            document.cookie = 'endToEnd=true';
            return true;
        } else {
            return false;
        }
    }

    intercomAppId () {
        if (new ServiceUrls().isProduction()) {
            return 'xj00ps0t';
        } else {
            return 'gdt5yuxt';
        }
    }
    start () {
        if (!utils.isTest()) {
            this.register(this._intercomAppId);
            window.intercomSettings = {
                app_id: this._intercomAppId,
                vertical_padding: 50
            };
        }
    }

    login (userInfo) {
        if ((utils.isTest()) || (typeof window.Intercom === 'undefined')) {
            return;
        }

        window.Intercom('boot', {
            app_id: this._intercomAppId,
            email: userInfo.email,
            name: userInfo.firstName + ' ' + userInfo.lastName,
            user_id: userInfo.id
        });
    }

    logout () {
        window.Intercom('shutdown');
    }

    track (action) {
        if (typeof window.Intercom !== 'undefined') {
            window.Intercom('trackEvent', action);
        }
    }
    /* eslint-disable */
    register (intercomAppId) {
        let w = window;
        let ic = w.Intercom;
        if (typeof ic === "function") {
            ic('reattach_activator');
            ic('update', intercomSettings);
        } else {
            let d = document;
            let i = function () {
                i.c(arguments)
            };
            i.q = [];
            i.c = function (args) {
                i.q.push(args)
            };
            w.Intercom = i;

            function l () {
                let s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://widget.intercom.io/widget/' + intercomAppId;
                let x = d.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
            }
            if (w.attachEvent) {
                w.attachEvent('onload', l);
            } else {
                w.addEventListener('load', l, false);
            }
        }
    }
}
export let intercomSupport = new IntercomSupport();
