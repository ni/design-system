import '../fileviewer.js';

import { createFixture, isVisible, selectOption, enterValue } from '../../test/test-utils.js';
import { FileViewerPage } from './fileviewer-page.js';

const FILEVIEWER_I18N = {
    toolbar: {
        upload: 'Upload',
        download: 'Download',
        preview: 'Preview',
        delete: 'Delete',
        filter: 'Filter',
        search: 'Filter'
    },
    grid: {
        name: 'Name',
        extension: 'Extension',
        size: 'Size',
        created: 'Created',
        locale: 'en-US'
    },
    filter: {
        MATCHES: 'matches',
        EQUALS: 'equals'
    },
    upload: {
        close: 'Close',
        cancel: 'Cancel',
        startText: 'Drag and drop files or ',
        pendingText: 'Uploading...',
        successText: 'Success!',
        failureText: 'Failed to upload!',
        buttonText: 'browse',
        uploadAgain: {
            text: 'Upload',
            description: 'another file'
        },
        learn: {
            text: 'Learn',
            description: 'about upload limitations'
        }
    },
    errorDialog: {
        header: {
            fileData: 'Could not load files!',
            fileUpload: 'Could not upload file!',
            fileDownload: 'Could not download file(s)!',
            fileDelete: 'Could not delete file(s)!',
            fileUpdate: 'Could not update file!'
        },
        close: 'CLOSE'
    },
    deleteDialog: {
        delete: 'DELETE',
        cancel: 'CANCEL',
        singleMessage: 'Are you sure you want to delete "{fileName}"?',
        multipleMessage: 'Are you sure you want to delete {fileCount} files?'
    },
    detailsDialog: {
        header: 'Update File Details',
        update: 'Update',
        delete: 'Delete',
        cancel: 'Cancel'
    },
    details: {
        name: 'Name:',
        extension: 'Extension:',
        created: 'Created:',
        size: 'Size:',
        properties: 'Properties:',
        propertiesKey: 'Key',
        propertiesValue: 'Value',
        locale: 'en-US'
    }
};

describe('File Viewer', () => {
    let createFile = function (name, size) {
        return {
            id: Math.floor(Math.random() * 1000000000),
            created: new Date(2019, 2, 3, 14, 1, 1, 123),
            properties: {
                'Name': name,
                'key-a': 'value-a'
            },
            serviceGroup: 'Default',
            size: size,
            size64: size
        };
    };

    beforeEach(function () {
        this.page = new FileViewerPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-fileviewer preview-url="https://hosting-dev.systemlinkcloud.io/files/preview?id={id}&type={type}"></sl-fileviewer>`);
            this.element.i18n = FILEVIEWER_I18N;
            this.element.data = {
                items: [
                    createFile('file-1.png', 1234),
                    createFile('file-2', 1234),
                    createFile('file-3.html', 1234)
                ],
                totalCount: 3
            };
        });

        it('should show the fileviewer', function () {
            let main = this.page.getMain();

            expect(isVisible(main)).toBeTruthy();
        });

        it('should show the rows', function () {
            let rows = this.page.getRows();
            expect(rows.length).toBe(3);

            let cell1 = this.page.getCell(0, 2);
            expect(cell1.textContent).toBe('file-1.png');

            let cell2 = this.page.getCell(0, 3);
            expect(cell2.textContent).toBe('png');

            let cell3 = this.page.getCell(0, 4);
            expect(cell3.textContent).toBe('1.21 kB');

            let cell4 = this.page.getCell(0, 5);
            expect(cell4.textContent).toBe('Mar 3, 2019 at 2:01 PM');
        });

        it('should show empty cell for files without file extension', function () {
            let cell1 = this.page.getCell(1, 2);
            expect(cell1.textContent).toBe('file-2');

            let cell2 = this.page.getCell(1, 3);
            expect(cell2.textContent).toBe('');
        });

        it('should show size in bytes', function () {
            this.element.data = {
                items: [ createFile('file-1.png', 15) ],
                totalCount: 1
            };

            let sizeCell = this.page.getCell(0, 4);
            expect(sizeCell.textContent).toBe('15 B');
        });

        it('should show size in kilobytes', function () {
            this.element.data = {
                items: [ createFile('file-1.png', 237649) ],
                totalCount: 1
            };

            let sizeCell = this.page.getCell(0, 4);
            expect(sizeCell.textContent).toBe('232.08 kB');
        });

        it('should show size in megabytes', function () {
            this.element.data = {
                items: [ createFile('file-1.png', 21237649) ],
                totalCount: 1
            };

            let sizeCell = this.page.getCell(0, 4);
            expect(sizeCell.textContent).toBe('20.25 MB');
        });

        it('should show size in gigabytes', function () {
            this.element.data = {
                items: [ createFile('file-1.png', 2112237649) ],
                totalCount: 1
            };

            let sizeCell = this.page.getCell(0, 4);
            expect(sizeCell.textContent).toBe('1.97 GB');
        });

        it('should display dialog on error', function () {
            this.element.showErrorDialog(this.element._i18n.errorDialog.header.fileData);

            expect(this.page.getDialogHeader().textContent).toBe('Could not load files!');
        });
    });

    describe('Upload', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-fileviewer></sl-fileviewer>`);
            this.element.i18n = FILEVIEWER_I18N;
            this.element.data = {
                items: [],
                totalCount: 0
            };
        });

        it('should show upload in progress while uploading file', function () {
            this.page.clickUpload();
            this.page.startUpload('helloworld', 'test.txt');

            let uploadText = this.page.getUploadText();
            expect(uploadText.textContent).toBe('Uploading...');
        });

        it('should fire event when uploading file', async function () {
            this.element.addEventListener('file-upload', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickUpload();
            this.page.startUpload('helloworld', 'test.txt');

            expect(this.eventDetail.data.name).toBe('test.txt');
            expect(this.eventDetail.data.size).toBe(10);
            expect(this.eventDetail.resolve).toBeDefined();
            expect(this.eventDetail.reject).toBeDefined();
        });

        it('should show upload successfully finished when resolving event', async function () {
            this.element.addEventListener('file-upload', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickUpload();
            this.page.startUpload('helloworld', 'test.txt');
            await this.eventDetail.resolve('Done!');

            expect(this.page.getUploadText().textContent).toBe('Success!');
        });

        it('should show error message when rejecting event', async function () {
            this.element.addEventListener('file-upload', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickUpload();
            this.page.startUpload('helloworld', 'test.txt');
            await this.eventDetail.reject('There was an error uploading');

            expect(this.page.getUploadText().textContent).toContain('Failed to upload!');
            expect(this.page.getUploadText().textContent).toContain('There was an error uploading');
        });
    });

    describe('Delete File', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-fileviewer></sl-fileviewer>`);
            this.element.i18n = FILEVIEWER_I18N;
            this.element.data = {
                items: [
                    createFile('file-1.png', 1234),
                    createFile('file-2.txt', 1234),
                    createFile('file-3.html', 1234)
                ],
                totalCount: 3
            };
        });

        it('should show dialog message when deleting single file', function () {
            this.page.clickCheckbox(0);
            this.page.clickDeleteFile();

            expect(this.page.getDialogHeader().textContent).toBe('Are you sure you want to delete "file-1.png"?');
        });

        it('should show dialog message when deleting multiple files', function () {
            this.page.clickCheckbox(0);
            this.page.clickCheckbox(2);
            this.page.clickDeleteFile();

            expect(this.page.getDialogHeader().textContent).toBe('Are you sure you want to delete 2 files?');
        });

        it('should fire event when deleting multiple files', function () {
            this.element.addEventListener('file-delete', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(2);
            this.page.clickDeleteFile();

            this.page.clickDialogOKButton();

            expect(this.eventDetail.files.length).toBe(2);
            expect(this.eventDetail.files[0].properties['Name']).toBe('file-1.png');
            expect(this.eventDetail.files[1].properties['Name']).toBe('file-3.html');
        });
    });

    describe('Filter', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-fileviewer></sl-fileviewer>`);
            this.element.i18n = FILEVIEWER_I18N;
        });

        it('should show filter builder when clicking on filter button', function () {
            this.page.clickFilter();

            expect(isVisible(this.page.getFilterBuilderFieldSelector(0))).toBeTruthy();
        });

        it('should fire data event when changing the filter', function () {
            this.element.addEventListener('file-data', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickFilter();
            selectOption(this.page.getFilterBuilderFieldSelector(0), 'name');
            enterValue(this.page.getFilterBuilderValueInput(0), 'file-a');

            expect(this.eventDetail).toEqual({
                page: 1,
                pageSize: 20,
                sortBy: undefined,
                sortOrder: undefined,
                searchTerm: undefined,
                filters: [
                    { name: 'name', operation: 'MATCHES', value: 'file-a' }
                ],
                trigger: 'filter'
            });
        });

        it('should fire data event when entering search term', function () {
            this.element.addEventListener('file-data', (e) => {
                this.eventDetail = e.detail;
            });

            enterValue(this.page.getSearchInput(), 'file-x');

            expect(this.eventDetail).toEqual({
                page: 1,
                pageSize: 20,
                sortBy: undefined,
                sortOrder: undefined,
                searchTerm: 'file-x',
                filters: undefined,
                trigger: 'search'
            });
        });
    });

    describe('Edit File', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-fileviewer preview-url="https://hosting-dev.systemlinkcloud.io/files/preview?id={id}&type={type}"></sl-fileviewer>`);
            this.element.i18n = FILEVIEWER_I18N;
            this.element.data = {
                items: [
                    createFile('file-1.png', 1234),
                    createFile('file-2', 1234),
                    createFile('file-3.html', 1234)
                ],
                totalCount: 3
            };
        });

        it('should show file details', function () {
            this.page.clickEdit(0);

            let detailsPage = this.page.getDetailsPage();
            expect(detailsPage.getNameInput().value).toBe('file-1.png');
            expect(detailsPage.getExtension().textContent).toBe('png');
            expect(detailsPage.getCreated().textContent).toBe('Mar 3, 2019 at 2:01 PM');
            expect(detailsPage.getSize().textContent).toBe('1.21 kB');
            expect(detailsPage.getPropertiesListEditorPage().getRows().length).toBe(2);
        });

        it('should update name', function () {
            this.element.addEventListener('file-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickEdit(0);
            enterValue(this.page.getDetailsPage().getNameInput(), 'new-name.txt');
            this.page.clickUpdateButton();

            expect(this.eventDetail.file.properties).toEqual({
                'key-a': 'value-a',
                'Name': 'new-name.txt'
            });
        });

        it('should add new property', function () {
            this.element.addEventListener('file-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickEdit(0);
            this.page.getDetailsPage().getPropertiesListEditorPage().enterListKeyValue(1, 'new-key', 'new-value');

            this.page.clickUpdateButton();

            expect(this.eventDetail.file.properties).toEqual({
                'key-a': 'value-a',
                'new-key': 'new-value',
                'Name': 'file-1.png'
            });
        });
    });
});
