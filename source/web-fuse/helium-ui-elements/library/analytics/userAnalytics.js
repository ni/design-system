import { ServiceUrls } from '../core/ServiceUrls.js';
import { utils } from './utils.js';
import './gtag.js';

export class AnalyticsSupport {
    constructor () {
        this._analyticsId = this.analyticsId();
    }

    analyticsId () {
        if (new ServiceUrls().isProduction()) {
            return 'UA-126136185-2';
        } else {
            return 'UA-126136185-1';
        }
    }
    start () {
        this.gtag('config', this._analyticsId);
    }

    track (category, action, label) {
        this.gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }

    gtag () {
        if (!utils.isTest()) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(arguments);
        }
    }
}

export let analyticsSupport = new AnalyticsSupport();
