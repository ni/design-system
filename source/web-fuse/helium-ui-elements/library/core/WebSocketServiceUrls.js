export class WebSocketServiceUrls {
    constructor (location) {
        this._location = location || window.location;
    }

    hostname () {
        return this._wsUrl(this._location.host);
    }

    getURL (service) {
        return this._wsUrl(this._location.host);
    }

    isProduction () {
        let host = this._location.host;
        return host.includes('www.systemlinkcloud.com');
    }

    _wsUrl (host) {
        if (host.includes('localhost') || host.includes('dev')) {
            return 'wss://api-dev.systemlinkcloud.com';
        } else if (host.includes('test')) {
            return 'wss://api-test.systemlinkcloud.com';
        }
        return 'wss://api.systemlinkcloud.com';
    }
}
