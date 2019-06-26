export class MCError extends Error {
    constructor (errordata) {
        super();
        this._errordata = errordata;
    }
}
