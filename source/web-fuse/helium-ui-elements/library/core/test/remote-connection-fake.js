export class RemoteConnectionFake {
    constructor (fakes) {
        this._fakes = fakes;
    }

    async get (service, path, filter, start, end) {
        this.path = path;
        return this._fakes.get;
    }
}
