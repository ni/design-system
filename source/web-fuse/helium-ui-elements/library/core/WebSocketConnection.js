import { MCError } from './MCError.js';

export class WebSocketConnection {
    constructor (serviceUrls, path, queryString) {
        this._serviceUrls = serviceUrls;
        this._path = path;
        this._queryString = this._toQueryString(queryString);
        this._unhandledError = new MCError({
            status: -1,
            responseText: JSON.stringify({ code: 'NoServerConnection', errors: ['not connected to server'] })
        });
        this._messageQueue = [];
    }

    _connect () {
        if (!this._ws) {
            let ws = new WebSocket(this._serviceUrls.getURL() + this._path + this._queryString);
            ws.onopen = (e) => {
                while (this._messageQueue.length > 0) {
                    if (ws.readyState !== 1) {
                        break;
                    }
                    ws.send(JSON.stringify(this._messageQueue.shift()));
                }
            };
            ws.onerror = (error) => {
                console.error(error);
            };
            ws.onmessage = (message) => {
                if (this.receive) {
                    this.receive(JSON.parse(message.data));
                }
            };
            ws.onclose = (e) => {
                if (this.onclose) {
                    this.onclose();
                }
            };
            this._ws = ws;
        }
        return this._ws;
    }

    reconnect () {
        delete this._ws;
    }

    send (json) {
        let ws = this._connect();
        if (ws.readyState === 1) {
            ws.send(JSON.stringify(json));
        } else {
            this._messageQueue.push(json);
        }
    }

    _toQueryString (query) {
        let queryString = Object.keys(query)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
            .join('&');
        if (queryString !== '') {
            queryString = '?' + queryString;
        }
        return queryString;
    }
}
