export class ServiceUrlsAPI {
    constructor (location) {
        this._location = location || window.location;
    }

    hostname () {
        return this._apiUrl(this._location.host);
    }

    getURL (service) {
        return this._apiUrl(this._location.host);
    }

    isProduction () {
        let host = this._location.host;
        return host.includes('www.systemlinkcloud.com');
    }

    _apiUrl (host) {
        if (window.apiUrl) {
            return window.apiUrl;
        }
        if (host.includes('localhost') || host.includes('dev')) {
            return 'https://api-dev.systemlinkcloud.com';
        } else if (host.includes('test')) {
            return 'https://api-test.systemlinkcloud.com';
        }
        return 'https://api.systemlinkcloud.com';
    }
}
