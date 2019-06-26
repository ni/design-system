import { eventUtils } from '../core/EventUtils.js';

export class FileViewerViewModel {
    constructor (remoteConnection, i18n) {
        this._remoteConnection = remoteConnection;
        this._i18n = i18n;
    }

    async update () {
        try {
            await this._loadData(this._element, this._search);
        } catch (error) {
            this._showError(this._i18n.errorDialog.header.fileData);
        }
    }

    async init (element) {
        this._element = element;
        this._element.i18n = this._i18n;

        let debouncedUpdate = eventUtils.debounce(200, async () => {
            await this.update();
        });
        element.addEventListener('file-data', async (e) => {
            this._search = e.detail;
            if (e.detail.trigger === 'search') {
                debouncedUpdate();
            } else {
                await this.update();
            }
        });

        element.addEventListener('file-upload', async (e) => {
            try {
                await this._uploadFile(e.detail.data, e.detail.resolve, e.detail.reject);
                await this.update();
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.fileUpload);
            }
        });
        element.addEventListener('file-download', async (e) => {
            try {
                await this._downloadFiles(e.detail.files);
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.fileDownload);
            }
        });
        element.addEventListener('file-delete', async (e) => {
            try {
                await this._deleteFiles(e.detail.files);
                await this.update();
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.fileDelete);
            }
        });
        element.addEventListener('file-update', async (e) => {
            try {
                await this._updateFile(e.detail.file, e.detail.resolve, e.detail.reject);
                await this.update();
            } catch (error) {
                this._showError(this._i18n.errorDialog.header.fileUpdate);
            }
        });

        this._search = {
            page: 1,
            pageSize: 20
        };
    }

    async _uploadFile (data, resolve, reject) {
        try {
            let formData = new FormData();
            formData.append('file', data);
            await this._remoteConnection.postfile('fileingestionservices', `/nifile/v1/service-groups/Default/upload-files`, formData);
            resolve('OK');
        } catch (err) {
            reject(err);
        }
    }

    async _downloadFiles (files) {
        for (let file of files) {
            let fileName = file.properties['Name'] || 'file';
            let data = await this._getFileContent(file);
            this._downloadFile(fileName, data);
        }
    }

    async _downloadFile (fileName, data) {
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }));
        downloadLink.download = fileName;

        this._element.appendChild(downloadLink);
        downloadLink.click();
        this._element.removeChild(downloadLink);
    }

    async _getFileContent (file) {
        let response = await this._remoteConnection.getfile('fileingestionservices', `/nifile/v1/service-groups/Default/files/${file.id}/data?inline=true`);
        return response.body;
    }

    async _deleteFiles (files) {
        let request = {
            ids: files.map((f) => f.id)
        };
        await this._remoteConnection.post('fileingestionservices', '/nifile/v1/service-groups/Default/delete-files', JSON.stringify(request));
    }

    async _updateFile (file) {
        let request = {
            replaceExisting: true,
            properties: file.properties
        };
        await this._remoteConnection.post('fileingestionservices', `/nifile/v1/service-groups/Default/files/${file.id}/update-metadata`, JSON.stringify(request));
    }

    async _loadData (element, search) {
        let skip = (search.page - 1) * search.pageSize;
        let take = search.pageSize;

        let request = this._buildQueryRequest(search.filters, search.searchTerm);

        let response = await this._remoteConnection.post('fileingestionservices', `/nifile/v1/service-groups/Default/query-files?skip=${skip}&take=${take}`, JSON.stringify(request));
        let data = JSON.parse(response.responseText);

        let files = data.availableFiles;
        if (search.sortBy) {
            this._sortData(files, search.sortBy, search.sortOrder || 'asc');
        }
        element.data = {
            items: files,
            totalCount: data.totalCount
        };
    }

    _buildQueryRequest (filters, searchTerm) {
        let propertiesQuery = [];
        let extensionQuery;
        for (let filter of filters || []) {
            switch (filter.name) {
            case 'name':
                propertiesQuery.push({ key: 'Name', operation: 'CONTAINS', value: filter.value });
                break;
            case 'extension':
                extensionQuery = { operation: 'EQUAL', value: filter.value };
                break;
            case 'properties':
                propertiesQuery.push({ key: filter.key, operation: 'CONTAINS', value: filter.value });
                break;
            }
        }

        if (searchTerm) {
            propertiesQuery.push({ key: 'Name', operation: 'CONTAINS', value: searchTerm });
        }

        let request = {};
        if (propertiesQuery.length > 0) {
            request['propertiesQuery'] = propertiesQuery;
        }
        if (extensionQuery) {
            request['extensionQuery'] = extensionQuery;
        }
        return request;
    }

    _sortData (files, sortBy, sortOrder) {
        files.sort((a, b) => {
            let aValue = this._getSortByValue(a, sortBy) || '';
            let bValue = this._getSortByValue(b, sortBy) || '';
            let result = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
            return sortOrder === 'desc' ? -result : result;
        });
    }

    _getSortByValue (file, sortBy) {
        switch (sortBy) {
        case 'name':
            return file.properties['Name'];
        case 'extension':
            return this._getExtension(file.properties['Name']);
        case 'size':
            return file.size.toString();
        case 'created':
            return file.created;
        }
    }

    _getExtension (name) {
        if (!name) {
            return '';
        }
        let index = name.lastIndexOf('.');
        if (index === -1) {
            return '';
        }
        return name.substr(index + 1);
    }

    _showError (errorHeader) {
        this._element.showErrorDialog(errorHeader);
    }
}
