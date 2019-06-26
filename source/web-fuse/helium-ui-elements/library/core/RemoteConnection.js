import { MCError } from './MCError.js';

export class RemoteConnection {
    constructor (serviceUrls, headers) {
        this._serviceUrls = serviceUrls;
        this._headers = headers || {};
        this._unhandledError = new MCError({
            status: -1,
            responseText: JSON.stringify({ code: 'NoServerConnection', errors: ['not connected to server'] })
        });
    }

    getURL (service) {
        return this._serviceUrls.getURL(service);
    }

    hostname () {
        return this._serviceUrls.hostname();
    }

    async getfile (service, path) {
        return new Promise((resolve, reject) => {
            let that = this;
            let url = this.getURL(service);
            let xhttp = new XMLHttpRequest();
            xhttp.responseType = 'blob';
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    let status = xhttp.status;
                    if (status < 200 || status >= 300) {
                        reject(new MCError({
                            status: status,
                            body: xhttp.response
                        }));
                    } else {
                        resolve({
                            status: status,
                            body: xhttp.response
                        });
                    }
                }
            };

            xhttp.onerror = () => {
                reject(that._unhandledError);
            };

            xhttp.open('GET', url + path, true);
            this._addHeaders(xhttp);
            xhttp.send();
        });
    }

    async get (service, path, filter, start, end) {
        return new Promise((resolve, reject) => {
            let that = this;
            let url = this.getURL(service);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    let status = xhttp.status;
                    if (status < 200 || status >= 300) {
                        reject(new MCError({
                            status: status,
                            responseText: xhttp.responseText
                        }));
                    } else {
                        resolve({
                            status: status,
                            responseText: xhttp.responseText,
                            headers: this._parseHeaders(xhttp.getAllResponseHeaders())
                        });
                    }
                }
            };

            xhttp.onerror = () => {
                reject(that._unhandledError);
            };

            if (!filter) {
                filter = {};
            }
            if ((end - start) > 0) {
                filter.skip = start;
                filter.take = end - start;
            }
            let queryString = this._toQueryString(filter);

            xhttp.open('GET', url + path + queryString, true);
            this._addHeaders(xhttp);
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.send();
        });
    }

    async post (service, path, json) {
        return this._postType(service, path, json, 'application/json');
    }

    async postfile (service, path, file) {
        return this._postType(service, path, file, 'application/octet-stream');
    }

    async _postType (service, path, data, contentType) {
        return new Promise((resolve, reject) => {
            let that = this;
            let url = this.getURL(service);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    let status = xhttp.status;
                    if (status < 200 || status >= 300) {
                        reject(new MCError({
                            status: status,
                            responseText: xhttp.responseText
                        }));
                    } else {
                        resolve({
                            status: status,
                            responseText: xhttp.responseText,
                            headers: this._parseHeaders(xhttp.getAllResponseHeaders())
                        });
                    }
                }
            };

            xhttp.onerror = () => {
                reject(that._unhandledError);
            };

            xhttp.open('POST', url + path, true);
            this._addHeaders(xhttp);
            if (!(data instanceof FormData)) {
                xhttp.setRequestHeader('Content-type', contentType);
            }
            xhttp.send(data);
        });
    }

    async delete (service, path) {
        return new Promise((resolve, reject) => {
            let that = this;
            let url = this.getURL(service);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    let status = xhttp.status;
                    if (status < 200 || status >= 300) {
                        reject(new MCError({
                            status: status,
                            responseText: xhttp.responseText
                        }));
                    } else {
                        resolve({
                            status: status,
                            responseText: xhttp.responseText,
                            headers: this._parseHeaders(xhttp.getAllResponseHeaders())
                        });
                    }
                }
            };

            xhttp.onerror = () => {
                reject(that._unhandledError);
            };

            xhttp.open('DELETE', url + path, true);
            this._addHeaders(xhttp);
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.send();
        });
    }

    async put (service, path, json) {
        return this._putType(service, path, json, 'application/json');
    }

    async putfile (service, path, file) {
        return this._putType(service, path, file, 'application/octet-stream');
    }

    async _putType (service, path, data, contentType) {
        return new Promise((resolve, reject) => {
            let that = this;
            let url = this.getURL(service);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    let status = xhttp.status;
                    if (status < 200 || status >= 300) {
                        reject(new MCError({
                            status: status,
                            responseText: xhttp.responseText
                        }));
                    } else {
                        resolve({
                            status: status,
                            responseText: xhttp.responseText,
                            headers: this._parseHeaders(xhttp.getAllResponseHeaders())
                        });
                    }
                }
            };

            xhttp.onerror = () => {
                reject(that._unhandledError);
            };

            xhttp.open('PUT', url + path, true);
            this._addHeaders(xhttp);
            if (!(data instanceof FormData)) {
                xhttp.setRequestHeader('Content-type', contentType);
            }
            xhttp.send(data);
        });
    }

    _addHeaders (xhttp) {
        for (let key in this._headers) {
            if (this._headers.hasOwnProperty(key)) {
                xhttp.setRequestHeader(key, this._headers[key]);
            }
        }
    }

    _parseHeaders (allResponseHeaders) {
        let splitHeaders = allResponseHeaders.split('\r\n');
        return splitHeaders.reduce(function (acc, current) {
            let parts = current.split(': ');
            acc[parts[0]] = parts[1];
            return acc;
        }, {});
    }

    _toQueryString (filter) {
        let queryString = Object.keys(filter)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]))
            .join('&');
        if (queryString !== '') {
            queryString = '?' + queryString;
        }
        return queryString;
    }
}
