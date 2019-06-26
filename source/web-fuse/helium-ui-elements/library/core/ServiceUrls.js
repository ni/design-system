export class ServiceUrls {
    constructor (location) {
        this._location = location || window.location;
    }

    hostname () {
        let host = this._location.host;
        if (host.includes('localhost')) {
            return this._location.protocol + '//' + host;
        }
        return this._adminUrl(host);
    }

    getURL (service) {
        let host = this._location.host;
        let url = this._location.protocol + '//' + host;

        if (service === 'contentHosting') {
            url = this._hostingUrl(host);
        }
        return url;
    }

    isProduction () {
        let host = this._location.host;
        return host.includes('www.systemlinkcloud.com');
    }

    _adminUrl (host) {
        if (window.adminUrl) {
            return window.adminUrl;
        }
        if (host.includes('dev')) {
            return 'https://dev.systemlinkcloud.com';
        } else if (host.includes('test')) {
            return 'https://test.systemlinkcloud.com';
        }
        return 'https://www.systemlinkcloud.com';
    }

    _hostingUrl (host) {
        if (window.hostingUrl) {
            return window.hostingUrl;
        }
        if (host.includes('localhost') || host.includes('dev')) {
            return 'https://hosting-dev.systemlinkcloud.io';
        } else if (host.includes('test')) {
            return 'https://hosting-test.systemlinkcloud.io';
        }
        return 'https://hosting.systemlinkcloud.io';
    }
}
