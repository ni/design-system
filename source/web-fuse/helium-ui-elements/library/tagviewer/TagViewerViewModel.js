import { eventUtils } from '../core/EventUtils.js';

export class TagViewerViewModel {
    constructor (remoteConnection, i18n) {
        this._remoteConnection = remoteConnection;
        this._i18n = i18n;
    }

    async update () {
        try {
            await this._loadData(this._element, this._search);
        } catch (error) {
            this._showError(this._i18n.errorDialog.header.tagData);
        }
    }

    async init (element) {
        this._element = element;
        this._element.i18n = this._i18n;

        let debouncedUpdate = eventUtils.debounce(200, async () => {
            await this.update();
        });
        element.addEventListener('tag-data', async (e) => {
            this._search = e.detail;
            if (e.detail.trigger === 'search') {
                debouncedUpdate();
            } else {
                await this.update();
            }
        });

        element.addEventListener('tag-create', async (e) => {
            try {
                await this._createTag(e.detail.tag);
                await this.update();
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.tagCreate);
            }
        });

        element.addEventListener('tag-delete', async (e) => {
            try {
                await this._deleteTags(e.detail.tags);
                await this.update();
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.tagDelete);
            }
        });

        element.addEventListener('tag-reset-aggregates', async (e) => {
            try {
                await this._resetAggregates(e.detail.tags);
                await this.update();
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.tagResetAggregates);
            }
        });

        element.addEventListener('tag-update-values', async (e) => {
            try {
                await this._updateValues(e.detail.tags, e.detail.value);
                await this.update();
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.tagUpdateValues);
            }
        });

        element.addEventListener('tag-update', async (e) => {
            try {
                await this._updateTags(e.detail.tags);
                await this.update();
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.tagUpdate);
            }
        });

        element.addEventListener('tag-history', async (e) => {
            try {
                await this._showHistory(e.detail.tags);
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.tagHistory);
            }
        });

        element.addEventListener('tag-export-details', async (e) => {
            try {
                await this._exportDetails(e.detail.tags);
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.tagExportDetails);
            }
        });

        element.addEventListener('tag-export-history', async (e) => {
            try {
                await this._exportHistory(e.detail.tags, e.detail.params);
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.tagExportHistory);
            }
        });

        this._search = {
            page: 1,
            pageSize: 20
        };
    }

    async _createTag (tag) {
        await this._remoteConnection.post('tagservices', '/nitag/v2/tags', JSON.stringify(tag));
    }

    async _deleteTags (tags) {
        let selection = await this._createSelection(tags);
        await this._remoteConnection.delete('tagservices', `/nitag/v2/selections/${selection.id}/tags`);
    }

    async _showHistory (tags) {
        let eventData = {
            target: 'tags-history',
            tags: tags
        };
        if (this.onNavigate) {
            this.onNavigate(new CustomEvent('navigate', { detail: eventData }));
        }
    }

    async _resetAggregates (tags) {
        let selection = await this._createSelection(tags);
        await this._remoteConnection.post('tagservices', `/nitag/v2/selections/${selection.id}/reset-aggregates`, '');
    }

    async _updateTags (tags) {
        let request = {
            tags: tags,
            merge: false
        };
        await this._remoteConnection.post('tagservices', `/nitag/v2/update-tags`, JSON.stringify(request));
    }

    async _updateValues (tags, value) {
        let request = tags.map(function (t) {
            return {
                path: t.path,
                updates: [
                    { value: { value: value, type: t.type } }
                ]
            };
        });
        await this._remoteConnection.post('tagservices', '/nitag/v2/update-current-values', JSON.stringify(request));
    }

    async _createSelection (tags) {
        let paths = tags.map(function (t) { return t.path; });
        let request = {
            searchPaths: paths,
            inactivityTimeout: 60
        };
        let response = await this._remoteConnection.post('tagservices', '/nitag/v2/selections', JSON.stringify(request));
        return JSON.parse(response.responseText);
    }

    _download (fileName, content) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', fileName);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    async _exportHistory (tags, params) {
        let request = {
            paths: tags.map(function (t) { return t.path; }),
            startTime: params.startTime,
            endTime: params.endTime,
            take: params.take,
            sortOrder: 'ascending',
            responseFormat: 'csv'
        };

        let response = await this._remoteConnection.post('taghistorian', '/nitaghistorian/v1/tags/query-history', JSON.stringify(request));
        return this._download('TagHistory.csv', response.responseText);
    }

    async _exportDetails (tags) {
        let selection = await this._createSelection(tags);
        let response = await this._remoteConnection.get('tagservices', `/nitag/v2/selections/${selection.id}/tags-with-values?responseFormat=csv`);
        return this._download('TagsDetails.csv', response.responseText);
    }

    async _loadData (element, search) {
        let skip = (search.page - 1) * search.pageSize;
        let take = search.pageSize;

        let filters = search.filters || [];
        if (search.searchTerm) {
            filters.push({ name: 'path', value: '*' + search.searchTerm + '*' });
        }

        let queryString = `?skip=${skip}&take=${take}`;
        for (let filter of filters || []) {
            queryString += `&${filter.name}=`;
            if (filter.key) {
                queryString += filter.key + '=' + filter.value;
            } else {
                queryString += filter.value;
            }
        }

        let response = await this._remoteConnection.get('tagservices', '/nitag/v2/tags-with-values' + queryString);
        let data = JSON.parse(response.responseText);

        element.data = {
            items: this._sortData(data.tagsWithValues, search.sortBy, search.sortOrder),
            totalCount: data.totalCount
        };
    }

    _showError (errorHeader) {
        this._element.showErrorDialog(errorHeader);
    }

    _sortData (tagsWithValues, sortBy, sortOrder) {
        if (sortBy) {
            tagsWithValues.sort((a, b) => {
                let aValue = this._getSortByValue(a, sortBy) || '';
                let bValue = this._getSortByValue(b, sortBy) || '';
                let result = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
                return sortOrder === 'desc' ? -result : result;
            });
        }
        return tagsWithValues;
    }

    _getSortByValue (obj, sortBy) {
        switch (sortBy) {
        case 'path':
            return obj.tag.path;
        case 'value':
            return obj.current ? obj.current.value.value : '';
        case 'min':
            return obj.aggregates ? obj.aggregates.min : '';
        case 'max':
            return obj.aggregates ? obj.aggregates.max : '';
        case 'mean':
            return obj.aggregates ? obj.aggregates.avg : '';
        case 'count':
            return (obj.aggregates ? obj.aggregates.count : 0).toString();
        case 'updated':
            return obj.current ? obj.current.timestamp : '';
        case 'keywords':
            return JSON.stringify(obj.tag.keywords || '');
        case 'type':
            return obj.tag.type;
        case 'collectAggregates':
            return (obj.tag.collectAggregates || '').toString();
        }
    }
}
