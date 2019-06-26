export class TagViewerHistoryViewModel {
    constructor (webSocketConnection) {
        this._webSocketConnection = webSocketConnection;
    }

    async init (element, paths) {
        this._element = element;
        this._paths = paths;
    }

    async update () {
        await this._loadData(this._element, this._paths);
    }

    async _loadData (element, paths) {
        this._webSocketConnection.receive = (message) => {
            if (message.action === 'TagHistorianAsyncQueryDataRoutedMessage') {
                this._bindData(element, paths, message.tagHistorianAsyncValues.values);
                this._subscribe(paths);
            } else if (message.action === 'TagHistorianAsyncValuesProcessedRoutedMessage') {
                element.data = this._addNewDataPoints(element.data, message.values);
            }
        };
        this._webSocketConnection.onclose = () => {
            this._webSocketConnection.reconnect();
            this._subscribe(paths);
        };
        this._queryHistory(paths);
    }

    _queryHistory (paths) {
        let json = {
            'action': 'TagHistorianAsyncQueryRequest',
            'queries': [{
                'decimation': 1000,
                'paths': paths,
                'sortOrder': 'ASCENDING',
                'startTime': '2000-01-01T00:00:00Z',
                'endTime': '2099-12-31T23:59:59Z'
            }]
        };
        this._webSocketConnection.send(json);
    }

    _subscribe (paths) {
        let json = {
            'action': 'TagHistorianAsyncSubscribeRequest',
            'searchPaths': paths
        };
        this._webSocketConnection.send(json);
    }

    _bindData (element, paths, values) {
        let data = this._getDataPoints(paths, values);
        element.data = data;
    }

    _addNewDataPoints (data, newValues) {
        for (let value of newValues) {
            let series = this._getSeries(data, value.path);
            let dataPoint = this._convertDataPoint(value);
            series.Timestamp.push(dataPoint.timestamp);
            series.Values.push(dataPoint.value);
        }
        return data;
    }

    _getSeries (data, path) {
        for (let entry of data) {
            if (entry.path === path) {
                return entry;
            }
        }
    }

    _getDataPoints (paths, values) {
        let result = [];
        for (let path of paths) {
            let series = this._convertDataPoints(path, values[path]);
            result.push(series);
        }
        return result;
    }

    _convertDataPoints (path, values) {
        let series = { path: path, Timestamp: [], Values: [] };
        for (let value of values) {
            let dataPoint = this._convertDataPoint(value);
            series.Timestamp.push(dataPoint.timestamp);
            series.Values.push(dataPoint.value);
        }
        return series;
    }

    _convertDataPoint (value) {
        return { timestamp: new Date(value.timestamp), value: value.value };
    }
}
